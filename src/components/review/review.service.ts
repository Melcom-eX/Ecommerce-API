import { ReviewServiceResponse } from "./review.response";
import reviewRepository from "./review.repository";
import { Review } from "@prisma/client";

/**
this is the service layer for the review component. It contains the business logic for the admin component.
 
 */

class ReviewService {
  // Create a new review
  async createReview({
    productId,
    userId,
    rating,
    comment,
  }: {
    productId: string;
    userId: string;
    rating: number;
    comment: string;
  }): Promise<ReviewServiceResponse> {
    try {
      const review: Review = await reviewRepository.create({
        productId,
        userId,
        rating,
        comment,
      });
      return {
        status: "success",
        statusCode: 201,
        message: "Review created successfully",
        data: review,
      };
    } catch (error) {
      console.error("Error creating a review", error);
      throw new Error("Error creating a review");
    }
  }

  // Find all reviews
  async findAll(): Promise<ReviewServiceResponse> {
    try {
      const review: Review[] = await reviewRepository.findAll();
      return {
        status: "success",
        statusCode: 200,
        message: "Reviews retrieved successfully",
        data: review,
      };
    } catch (error) {
      console.error("Error finding all reviews", error);
      throw new Error("Error finding all reviews");
    }
  }
}
export default new ReviewService();
