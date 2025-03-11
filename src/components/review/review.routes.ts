import { Router } from "express";
import { protect } from "../../middleware/authorize";
import reviewController from "./review.controller";
import {
  validateParams,
  validateSchema,
} from "../../middleware/ValidationMiddleware";
import { productIdSchema, reviewSchema } from "./review.validation";
const reviewRoutes = Router();

reviewRoutes.get(
  "/:productId",
  protect,
  validateParams(productIdSchema),
  reviewController.getAllProductsReviews
);
reviewRoutes.post(
  "",
  protect,
  validateSchema(reviewSchema),
  reviewController.createReview
);

export default reviewRoutes;
