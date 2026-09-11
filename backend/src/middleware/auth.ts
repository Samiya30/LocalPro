import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { Role } from "../generated/prisma/client";

interface JwtPayload {
  userId: string;
  role: Role;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET is not configured");

      return res.status(500).json({
        success: false,
        message: "Server authentication configuration error",
      });
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("Authentication failed:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
}

export function authorize(...allowedRoles: Role[]) {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource",
      });
    }

    next();
  };
}