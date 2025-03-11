import request from "supertest";
import app from "../../index"; // Assuming your Express app is exported from this file
import { Order } from "@prisma/client";
import httpStatus from "http-status";
import { orderService } from "../../components/order/order.service";
import { NextFunction, Request, Response } from "express";

jest.mock("../../components/order/order.service");
jest.mock(
  "../../middleware/authorize",
  () => (req: Request, res: Response, next: NextFunction) => next()
);

const token = "your-valid-jwt-token";
const mockOrder: Order = {
  id: "1",
  userId: "test-user-id",
  cartId: "test-cart-id",
  shippingAddress: "123 Test St",
  totalAmount: 100.0,
  transactionId: "test-transaction-id",
  status: "PENDING",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("Order API Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /orders", () => {
    it("should create a new order", async () => {
      (orderService.createOrder as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.CREATED,
        message: "Order created successfully",
        data: mockOrder,
      });

      const response = await request(app)
        .post("/api/v1/orders")
        .set("Authorization", `Bearer ${token}`)
        .send({
          userId: mockOrder.userId,
          cartId: mockOrder.cartId,
          shippingAddress: mockOrder.shippingAddress,
          totalAmount: mockOrder.totalAmount,
        });

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toEqual(mockOrder);
    });

    it("should return validation error for invalid input", async () => {
      const response = await request(app)
        .post("/api/v1/orders")
        .set("Authorization", `Bearer ${token}`)
        .send({
          userId: "invalid-uuid",
          cartId: mockOrder.cartId,
          shippingAddress: mockOrder.shippingAddress,
          totalAmount: mockOrder.totalAmount,
        });

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
      expect(response.body.status).toBe(false);
    });
  });

  describe("GET /api/v1/orders/:orderId", () => {
    it("should get an order by ID", async () => {
      (orderService.getOrder as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        message: "Order retrieved successfully",
        data: mockOrder,
      });

      const response = await request(app)
        .get(`/api/v1/orders/${mockOrder.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toEqual(mockOrder);
    });

    it("should return 404 if order not found", async () => {
      (orderService.getOrder as jest.Mock).mockResolvedValue({
        status: "error",
        statusCode: httpStatus.NOT_FOUND,
        message: "Order not found",
      });

      const response = await request(app)
        .get("/api/v1/orders/non-existing-id")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
      expect(response.body.status).toBe("error");
    });
  });

  describe("PUT /api/v1/orders/:orderId", () => {
    it("should update an order status", async () => {
      const updatedOrder = { ...mockOrder, status: "SHIPPED" };
      (orderService.updateOrder as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        message: "Order updated successfully",
        data: updatedOrder,
      });

      const response = await request(app)
        .put(`/api/v1/orders/${mockOrder.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ status: "SHIPPED" });

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toEqual(updatedOrder);
    });

    it("should return validation error for invalid status", async () => {
      const response = await request(app)
        .put(`/api/v1/orders/${mockOrder.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ status: "INVALID_STATUS" });

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
      expect(response.body.status).toBe(false);
    });
  });

  describe("DELETE /api/v1/orders/:orderId", () => {
    it("should delete an order", async () => {
      (orderService.deleteOrder as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        message: "Order deleted successfully",
      });

      const response = await request(app)
        .delete(`/api/v1/orders/${mockOrder.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body.status).toBe("success");
    });

    it("should return 404 if order not found", async () => {
      (orderService.deleteOrder as jest.Mock).mockResolvedValue({
        status: "error",
        statusCode: httpStatus.NOT_FOUND,
        message: "Order not found",
      });

      const response = await request(app)
        .delete("/api/v1/orders/non-existing-id")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
      expect(response.body.status).toBe("error");
    });
  });
});
