import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id, // Ensure this matches the token payload
        },
        select: {
          id: true,
          fullName: true,
          username: true,
          email: true,
          phone: true,
          wallet: true,
          dateOfBirth: true,
          profile: true,
          balance: true,
          createdAt: true,
          address: true,
          active: true,
          isBlocked: true,
          isVerified: true,
          role: true, // Ensure this field is true
          cartId: true,
        },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = {
        ...user,
        profile: user.profile ?? undefined,
        address: user.address ?? undefined,
      };

      // Check if the user is verified
      if (!req.user.isVerified) {
        return res
          .status(403)
          .json({ message: "Access denied. User not verified." });
      }

      // Check if the user is blocked
      if (req.user.isBlocked) {
        return res
          .status(403)
          .json({ message: "Access denied. User blocked." });
      }

      // Proceed to the next middleware
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Token verification failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify the token and decode its payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        id: string;
      };

      // Fetch the user from the database
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          fullName: true,
          username: true,
          email: true,
          phone: true,
          wallet: true,
          dateOfBirth: true,
          profile: true,
          balance: true,
          createdAt: true,
          address: true,
          active: true,
          isBlocked: true,
          isVerified: true,
          role: true,
        },
      });

      // If no user is found, return unauthorized
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Check if the user is verified
      if (!user.isVerified) {
        return res
          .status(403)
          .json({ message: "Access denied. User not verified." });
      }

      // Check if the user is an admin
      if (user.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }

      // If all checks pass, proceed to the next middleware
      req.user = {
        ...user,
        profile: user.profile ?? undefined,
        address: user.address ?? undefined,
      };

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};
const prod = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify the token and decode its payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        id: string;
      };

      // Fetch the user from the database
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          fullName: true,
          username: true,
          email: true,
          phone: true,
          wallet: true,
          dateOfBirth: true,
          profile: true,
          balance: true,
          createdAt: true,
          address: true,
          active: true,
          isBlocked: true,
          isVerified: true,
          role: true,
        },
      });

      // If no user is found, return unauthorized
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Check if the user is verified
      if (!user.isVerified) {
        return res
          .status(403)
          .json({ message: "Access denied. User not verified." });
      }

      // Check if the user is blocked
      if (user.isBlocked) {
        return res
          .status(403)
          .json({ message: "Access denied. User blocked." });
      }

      // Check if the user is an admin or seller
      if (user.role !== "ADMIN" && user.role !== "SELLER") {
        return res
          .status(403)
          .json({ message: "Access denied. Admin or Seller only." });
      }

      // If all checks pass, proceed to the next middleware
      req.user = {
        ...user,
        profile: user.profile ?? undefined,
        address: user.address ?? undefined,
      };

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const authorizeChange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  // Check for authorization header and extract token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify the token and decode its payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        id: string;
      };

      // Fetch the user from the database based on decoded token id
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          fullName: true,
          username: true,
          email: true,
          phone: true,
          wallet: true,
          dateOfBirth: true,
          profile: true,
          balance: true,
          createdAt: true,
          address: true,
          active: true,
          isBlocked: true,
          isVerified: true,
          role: true,
        },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Attach user to the request
      req.user = {
        ...user,
        profile: user.profile ?? undefined,
        address: user.address ?? undefined,
      };

      const { id } = req.params; // Assuming the user ID to check is in the params

      // Check if the logged-in user's ID matches the ID in the request
      if (req.user.id !== id) {
        return res.status(403).json({
          message: "Access denied. You can only update your own account.",
        });
      }

      // If all checks pass, proceed to the next middleware
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

export { protect, isAdmin, authorizeChange, prod };
