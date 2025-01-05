// src/routes/seller.routes.ts
import express from 'express';
import { sellerController } from './seller.controller';
import { protect } from '../../middleware/authorize';
import { validateSchema } from '../../middleware/ValidationMiddleware';
import { createSellerSchema } from './seller.validation';

const router = express.Router();

router.post(
  '/seller',
  protect, // Ensures user is authenticated and verified
  validateSchema(createSellerSchema), // Validates request body
  sellerController.createSeller
);

export default router;