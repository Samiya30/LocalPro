import { Router } from "express";

import { prisma } from "../lib/prisma.js";
import {
  authenticate,
  authorize,
  type AuthenticatedRequest,
} from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return res.json({
      success: true,
      data: {
        categories,
      },
    });
  } catch (error) {
    console.error("Fetch categories error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch categories",
    });
  }
});

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { name, slug, description, imageUrl } = req.body;

      if (!name || !slug) {
        return res.status(400).json({
          success: false,
          message: "Name and slug are required",
        });
      }

      const existingCategory = await prisma.category.findFirst({
        where: {
          OR: [
            {
              name,
            },
            {
              slug,
            },
          ],
        },
      });

      if (existingCategory) {
        return res.status(409).json({
          success: false,
          message: "A category with this name or slug already exists",
        });
      }

      const category = await prisma.category.create({
        data: {
          name,
          slug,
          description,
          imageUrl,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: {
          category,
        },
      });
    } catch (error) {
      console.error("Create category error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to create category",
      });
    }
  }
);

export default router;