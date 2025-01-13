import { Router } from "express";
import { isAdmin, prod, protect } from "../../middleware/authorize";
import reviewController from "./review.controller";
import { validateSchema } from "../../middleware/ValidationMiddleware";
import { reviewSchema } from "./review.validation";
const reviewRoutes = Router();

reviewRoutes.get("", protect, reviewController.getAllReviews);
reviewRoutes.post(
  "",
  validateSchema(reviewSchema),
  protect,
  reviewController.createReview
);

export default reviewRoutes;
