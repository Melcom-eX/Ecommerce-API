// src/routes/seller.routes.ts
import express from "express";
import { sellerController } from "./seller.controller";
import { protect } from "../../middleware/authorize";
import { validateSchema } from "../../middleware/ValidationMiddleware";
import { createSellerSchema } from "./seller.validation";

const sellerRoutes = express.Router();

sellerRoutes.post(
  "/create",
  validateSchema(createSellerSchema), // Validates request body
  protect, // Ensures user is authenticated and verified
  sellerController.createSeller
);

export default sellerRoutes;
