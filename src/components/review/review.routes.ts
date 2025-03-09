import { Router } from "express";
import { isAdmin, prod, protect } from "../../middleware/authorize";
import reviewController from "./review.controller";
import {
  validateParams,
  validateSchema,
} from "../../middleware/ValidationMiddleware";
import { productIdSchema, reviewSchema } from "./review.validation";
const reviewRoutes = Router();

reviewRoutes.get(
  "/:productId",
  validateParams(productIdSchema),
  protect,
  reviewController.getAllProductsReviews
);
reviewRoutes.post(
  "",
  validateSchema(reviewSchema),
  protect,
  reviewController.createReview
);

export default reviewRoutes;
