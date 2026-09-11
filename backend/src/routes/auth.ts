import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { prisma } from "../lib/prisma.js";

const router = Router();

const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(100),
  phone: z.string().trim().min(7).max(20).optional(),
  role: z.enum(["CUSTOMER", "PROVIDER"]).default("CUSTOMER"),
});

const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(100),
});

function createToken(userId: string, role: "CUSTOMER" | "PROVIDER" | "ADMIN") {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    {
      userId,
      role,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );
}

/**
 * POST /api/auth/register
 */
router.post("/register", async (req, res) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration data",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { name, email, password, phone, role } = result.data;

    const normalizedEmail = email.toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        phone,
        role,
        ...(role === "CUSTOMER"
          ? {
              customerProfile: {
                create: {},
              },
            }
          : {
              providerProfile: {
                create: {
                  businessName: name,
                },
              },
            }),
      },
      include: {
        customerProfile: true,
        providerProfile: true,
      },
    });

    const token = createToken(user.id, user.role);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          customerProfile: user.customerProfile,
          providerProfile: user.providerProfile,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create account",
    });
  }
});

/**
 * POST /api/auth/login
 */
router.post("/login", async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid login data",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { email, password } = result.data;

    const normalizedEmail = email.toLowerCase();

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
      include: {
        customerProfile: true,
        providerProfile: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = createToken(user.id, user.role);

    return res.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          customerProfile: user.customerProfile,
          providerProfile: user.providerProfile,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to login",
    });
  }
});

export default router;