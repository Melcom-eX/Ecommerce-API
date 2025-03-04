import { Request, Response } from "express";
import { orderService } from "./order.service";

class OrderController {
  async createOrder(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, cartItems, shippingAddress, totalAmount } = req.body;
      const order = await orderService.createOrder(
        userId,
        cartItems,
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

  async updateOrder(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { status, shippingAddress } = req.body;

      const order = await orderService.updateOrder(id, status, shippingAddress);

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
