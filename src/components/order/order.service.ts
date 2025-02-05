import httpStatus from "http-status";
import { Errors } from "../../error/error";
import { orderRepository } from "./order.repository";
import { OrderDeleteResponse, OrderResponse } from "./order.response";
import { Order, OrderStatus } from "@prisma/client";

class OrderService {
  async createOrder(
    userId: string,
    cartItems: string[],
    shippingAddress: string,
    totalAmount: number
  ): Promise<OrderResponse | typeof Errors.defaultError> {
    try {
      const order = await orderRepository.createOrder(
        userId,
        cartItems,
        shippingAddress,
        totalAmount
      );
      return {
        statusCode: httpStatus.CREATED,
        error: false,
        status: "success",
        message: "Order created successfully",
        data: order,
      };
    } catch (error) {
      console.error("Create order error:", error);
      return Errors.defaultError;
    }
  }

  async getOrder(
    orderId: string
  ): Promise<OrderResponse | typeof Errors.doesNotExist> {
    try {
      const order = await orderRepository.findOrderById(orderId);
      if (!order) {
        return Errors.doesNotExist;
      }
      return {
        statusCode: httpStatus.OK,
        error: false,
        status: "success",
        message: "Order retrieved successfully",
        data: order,
      };
    } catch (error) {
      console.error("Get order error:", error);
      return Errors.defaultError;
    }
  }

  async getOrders(): Promise<{
    status: string;
    error: boolean;
    statusCode: number;
    message: string;
    data?: Order[];
  }> {
    try {
      const orders = await orderRepository.getOrders();
      return {
        statusCode: httpStatus.OK,
        error: false,
        status: "success",
        message: "Orders retrieved successfully",
        data: orders,
      };
    } catch (error) {
      console.error("Get orders error:", error);
      return Errors.defaultError;
    }
  }

  async updateOrder(
    orderId: string,
    status: OrderStatus,
    shippingAddress: string
  ): Promise<OrderResponse | typeof Errors.defaultError> {
    try {
      const order = await orderRepository.updateOrder(
        orderId,
        status,
        shippingAddress
      );
      return {
        statusCode: httpStatus.OK,
        error: false,
        status: "success",
        message: "Order updated successfully",
        data: order,
      };
    } catch (error) {
      console.error("Update order error:", error);
      return Errors.defaultError;
    }
  }

  async deleteOrder(orderId: string): Promise<OrderDeleteResponse> {
    try {
      await orderRepository.deleteOrder(orderId);
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Order deleted successfully",
      };
    } catch (error) {
      console.error("Delete order error:", error);
      return Errors.defaultError;
    }
  }
}

export const orderService = new OrderService();
