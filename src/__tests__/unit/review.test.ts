import { Review } from "@prisma/client";
import reviewService from "../../components/review/review.service";
import httpStatus from "http-status";

jest.mock("../../components/review/review.repository");

jest.mock("../../components/review/review.service", () => ({
  createReview: jest.fn(),
  findAll: jest.fn(),
}));

const mockReviews: Review[] = [
  {
    id: "1",
    rating: 5,
    comment: "Great product",
    productId: "1",
    userId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    rating: 3,
    comment: "Good product",
    productId: "2",
    userId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const mockReview = mockReviews[0];

describe("Review Service Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createReview", () => {
    it("should create a review", async () => {
      const review = {
        productId: "1",
        userId: "1",
        rating: 5,
        comment: "Great product",
      };
      (reviewService.createReview as jest.Mock).mockResolvedValue({
        status: "success",
        error: false,
        statusCode: httpStatus.CREATED,
        message: "Review created successfully",
        data: mockReview,
      });
      const response = await reviewService.createReview(review);
      expect(response).toEqual({
        status: "success",
        error: false,
        statusCode: httpStatus.CREATED,
        message: "Review created successfully",
        data: mockReview,
      });
    });

    it("should return an error if review creation fails", async () => {
      const review = {
        productId: "1",
        userId: "1",
        rating: 5,
        comment: "Great product",
      };
      (reviewService.createReview as jest.Mock).mockRejectedValue(new Error());
      try {
        await reviewService.createReview(review);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe("getReviews", () => {
    it("should get all reviews", async () => {
      const review = {
        productId: "1",
        userId: "1",
        rating: 5,
        comment: "Great product",
      };
      (reviewService.findAll as jest.Mock).mockResolvedValue({
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Reviews retrieved successfully",
        data: mockReviews,
      });
      const response = await reviewService.findAll(review.productId);
      expect(response).toEqual({
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Reviews retrieved successfully",
        data: mockReviews,
      });
    });
  });
});
