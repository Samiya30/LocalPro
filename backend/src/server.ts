import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { prisma } from "./lib/prisma.js";
import authRouter from "./routes/auth.js";
import categoryRouter from "./routes/category.js";
import providerRouter from "./routes/provider.js";
import {
  authenticate,
  authorize,
  type AuthenticatedRequest,
} from "./middleware/auth.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/categories", categoryRouter);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/providers", providerRouter);

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: "LocalPro API and database are running",
      database: "connected",
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(500).json({
      success: false,
      message: "LocalPro API is running, but database connection failed",
      database: "disconnected",
    });
  }
});

app.get(
  "/api/auth/me",
  authenticate,
  async (req: AuthenticatedRequest, res) => {  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user!.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Fetch current user error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch current user",
    });
  }
});

app.get(
  "/api/test/customer",
  authenticate,
  authorize("CUSTOMER"),
  (req: AuthenticatedRequest, res) => {
    res.json({
      success: true,
      message: "Customer-only route accessed successfully",
      userId: req.user!.id,
      role: req.user!.role,
    });
  }
);

app.get(
  "/api/test/provider",
  authenticate,
  authorize("PROVIDER"),
  (req: AuthenticatedRequest, res) => {
    res.json({
      success: true,
      message: "Provider-only route accessed successfully",
      userId: req.user!.id,
      role: req.user!.role,
    });
  }
);

app.get(
  "/api/test/admin",
  authenticate,
  authorize("ADMIN"),
  (req: AuthenticatedRequest, res) => {
    res.json({
      success: true,
      message: "Admin-only route accessed successfully",
      userId: req.user!.id,
      role: req.user!.role,
    });
  }
);

app.listen(PORT, () => {
  console.log(`LocalPro API running on http://localhost:${PORT}`);
});