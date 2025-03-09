import { PrismaClient, Review } from "@prisma/client";

const prisma = new PrismaClient();

class ReviewRepository {
  // Create a new review
  async create({
    productId,
    userId,
    rating,
    comment,
  }: {
    productId: string;
    userId: string;
    rating: number;
    comment: string;
  }): Promise<Review> {
    try {
      const review = await prisma.review.create({
        data: {
          productId,
          userId,
          rating,
          comment,
        },
      });
      return review as Review;
    } catch (error) {
      console.error("Error creating a review", error);
      throw new Error("Error creating a review");
    }
  }

  // Find all reviews
  async findAll(productId: string): Promise<Review[]> {
    try {
      const reviews = await prisma.review.findMany({
        where: { productId },
        select: {
          id: true,
          productId: true,
          userId: true,
          rating: true,
          comment: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return reviews as Review[];
    } catch (error) {
      console.error("Error finding all reviews", error);
      throw new Error("Error finding all reviews");
    }
  }
}

export default new ReviewRepository();
