jest.mock("../../components/order/order.service");
jest.mock("../../components/order/order.repository");

import { Order, OrderStatus } from "@prisma/client";
import { orderService } from "../../components/order/order.service";
import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";

jest.mock("../../middleware/authorize", () => ({
  isAdmin: jest.fn((req: Request, res: Response, next: NextFunction) => next()),
  protect: jest.fn((req: Request, res: Response, next: NextFunction) => next()),
}));

jest.mock("../../middleware/multer", () => ({
  single: jest.fn(
    () => (req: Request, res: Response, next: NextFunction) => next()
  ),
}));

describe("Order Service Tests", () => {
  let orderId: string;
  let mockOrder: Order;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    orderId = "test-order-id";
    mockOrder = {
      id: orderId,
      userId: "test-user-id",
      cartId: "test-cart-id",
      shippingAddress: "123 Test St",
      totalAmount: 100.0,
      transactionId: "test-transaction-id",
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  describe("createOrder", () => {
    it("should create a new order", async () => {
      (orderService.createOrder as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.CREATED,
        message: "Order created successfully",
        data: mockOrder,
      });

      const result = await orderService.createOrder(
        mockOrder.userId as string,
        mockOrder.cartId as string,
        mockOrder.shippingAddress as string,
        mockOrder.totalAmount as number
      );

      expect(result.status).toBe("success");
      expect(result.statusCode).toBe(httpStatus.CREATED);
      if ("data" in result) {
        expect(result.data).toEqual(mockOrder);
      }
    });
  });

  describe("getOrder", () => {
    it("should get an order by ID", async () => {
      (orderService.getOrder as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        message: "Order retrieved successfully",
        data: mockOrder,
      });

      const result = await orderService.getOrder(orderId);

      expect(result.status).toBe("success");
      if ("data" in result) {
        expect(result.data).toEqual(mockOrder);
      }
    });
  });

  describe("updateOrder", () => {
    it("should update an order status", async () => {
      const updatedOrder = { ...mockOrder, status: "SHIPPED" };
      (orderService.updateOrder as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        message: "Order updated successfully",
        data: updatedOrder,
      });

      const result = await orderService.updateOrder(orderId, mockOrder.status);

      expect(result.status).toBe("success");
      if ("data" in result && result.data) {
        expect(result.data.status).toBe("SHIPPED");
      }
    });
  });

  describe("deleteOrder", () => {
    it("should delete an order", async () => {
      (orderService.deleteOrder as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        message: "Order deleted successfully",
      });

      const result = await orderService.deleteOrder(orderId);

      expect(result.status).toBe("success");
      expect(result.message).toBe("Order deleted successfully");
    });
  });

  describe("getAllOrders", () => {
    it("should get all orders", async () => {
      (orderService.getOrders as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        message: "Orders retrieved successfully",
        data: [mockOrder],
      });

      const result = await orderService.getOrders();

      expect(result.status).toBe("success");
      if ("data" in result) {
        expect(result.data).toEqual([mockOrder]);
      }
    });
  });
});
