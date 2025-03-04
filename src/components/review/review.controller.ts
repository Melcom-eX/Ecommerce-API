import { Request, Response } from "express";
import reviewService from "./review.service";
import { ReviewServiceResponse } from "./review.response";
class ReviewController {
  // Create a new review
  async createReview(req: Request, res: Response): Promise<Response> {
    try {
      const { productId, userId, rating, comment } = req.body;
      const response: ReviewServiceResponse = await reviewService.createReview({
        productId,
        userId,
        rating,
        comment,
      });

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Create review error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Get all reviews
  async getAllReviews(req: Request, res: Response): Promise<Response> {
    try {
      const response: ReviewServiceResponse = await reviewService.findAll();

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get reviews error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ReviewController();
