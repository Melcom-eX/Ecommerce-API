import { Review } from "@prisma/client";
import exp from "constants";

type ReviewServiceResponse = {
  status: string;
  statusCode: number;
  message: string;
  data?: Review | Review[] | null;
};

type ReviewData = {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};
export { ReviewServiceResponse, ReviewData };
