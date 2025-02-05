import { Order } from "@prisma/client";

export interface OrderResponse {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
  data: Order;
}

export interface OrderDeleteResponse {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
}
