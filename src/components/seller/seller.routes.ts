// src/routes/seller.routes.ts
import express from "express";
import { sellerController } from "./seller.controller";
import { isAdmin, protect } from "../../middleware/authorize";
import { validateSchema } from "../../middleware/ValidationMiddleware";
import { createSellerSchema } from "./seller.validation";

const sellerRoutes = express.Router();

sellerRoutes.post(
  "/create",
  validateSchema(createSellerSchema), // Validates request body
  protect, // Ensures user is authenticated and verified
  sellerController.createSeller
);
sellerRoutes.get("/:id", isAdmin, sellerController.getSellerById);
sellerRoutes.get("", isAdmin, sellerController.getAllSellers);

export default sellerRoutes;
