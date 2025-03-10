import { Request, Response } from "express";
import { orderService } from "./order.service";

class OrderController {
  async createOrder(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, cartId, shippingAddress, totalAmount } = req.body;
      const order = await orderService.createOrder(
        userId,
        cartId,
        shippingAddress,
        totalAmount
      );
      return res.status(order.statusCode).json(order);
    } catch (error) {
      console.error("Create order error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getOrder(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const order = await orderService.getOrder(id);

      return res.status(order.statusCode).json(order);
    } catch (error) {
      console.error("Get order error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async getOrders(req: Request, res: Response): Promise<Response> {
    try {
      const orders = await orderService.getOrders();
      return res.status(orders.statusCode).json(orders);
    } catch (error) {
      console.error("Get orders error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateOrder(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const order = await orderService.updateOrder(id, status);

      return res.status(order.statusCode).json(order);
    } catch (error) {
      console.error("Update order error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const order = await orderService.deleteOrder(id);

      return res.status(order.statusCode).json(order);
    } catch (error) {
      console.error("Delete order error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export const orderController = new OrderController();
