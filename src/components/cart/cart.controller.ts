import { Request, Response } from "express";
import cartService from "./cart.service";
import { CartItemServiceResponse, CartServiceResponse } from "./cart.response";
import { createErrorResponse } from "../../error/error";

class CartController {
  // Create or get a cart for a user
  async createCart(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;

    try {
      const response: CartServiceResponse = await cartService.createCart(
        userId
      );

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Create or get cart error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Add a product to the cart
  async addCartItem(req: Request, res: Response): Promise<Response> {
    const { cartId, productId, quantity } = req.body;

    try {
      const response: CartItemServiceResponse = await cartService.addCartItem(
        cartId,
        productId,
        quantity
      );

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Add cart item error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Remove a product from the cart
  async removeCartItem(req: Request, res: Response): Promise<Response> {
    const { cartId, productId } = req.body;

    try {
      const response: CartServiceResponse = await cartService.removeCartItem(
        cartId,
        productId
      );

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Remove cart item error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Clear all products in a cart
  async clearCart(req: Request, res: Response): Promise<Response> {
    const { cartId } = req.body;

    try {
      const response: CartServiceResponse = await cartService.clearCart(cartId);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Clear cart error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Get a user's cart with products
  async getCartByUserId(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;

    try {
      const response: CartServiceResponse = await cartService.getCartByUserId(
        userId
      );

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get cart by user ID error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Update a cart's items by overwriting all existing items
  async updateCartItems(req: Request, res: Response): Promise<Response> {
    const { cartId, items } = req.body;

    try {
      const response: CartServiceResponse = await cartService.updateCartItems(
        cartId,
        items
      );

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Update cart items error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new CartController();
