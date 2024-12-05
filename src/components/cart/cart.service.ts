import httpStatus from "http-status";
import cartRepository from "./cart.repository";
import { CartItemServiceResponse, CartServiceResponse } from "./cart.response";
import { Errors } from "../../error/error";

class CartService {
  // Create a new cart
  async createCart(userId: string): Promise<CartServiceResponse> {
    try {
      const cart = await cartRepository.getCartByUserId(userId);
      if (cart) {
        return {
          statusCode: httpStatus.OK,
          status: "success",
          message: "Cart already exists",
          data: cart,
        };
      }

      const newCart = await cartRepository.createCart(userId);
      return {
        statusCode: httpStatus.CREATED,
        status: "success",
        message: "Cart created successfully",
        data: newCart,
      };
    } catch (error) {
      console.error("Create or get cart error:", error);
      return Errors.defaultError;
    }
  }
  //get all cart items
  async getAllCarts(): Promise<CartServiceResponse> {
    try {
      const carts = await cartRepository.getAllCarts();

      return {
        statusCode: httpStatus.OK,
        status: "success",
        message: "Carts retrieved successfully",
        data: carts,
      };
    } catch (error) {
      console.error("Get all carts error:", error);
      return Errors.defaultError;
    }
  }

  async addCartItem(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<CartItemServiceResponse> {
    try {
      const cartItem = await cartRepository.addCartItem(
        cartId,
        productId,
        quantity
      );

      return {
        statusCode: httpStatus.OK,
        status: "success",
        message: "Item added to cart successfully",
        data: cartItem,
      };
    } catch (error) {
      console.error("Add cart item error:", error);
      return Errors.defaultError;
    }
  }

  async removeCartItem(id: string): Promise<CartServiceResponse> {
    try {
      await cartRepository.removeCartItem(id);

      return {
        statusCode: httpStatus.OK,
        status: "success",
        message: "Item removed from cart successfully",
      };
    } catch (error) {
      console.error("Remove cart item error:", error);
      return Errors.defaultError;
    }
  }

  async clearCart(cartId: string): Promise<CartServiceResponse> {
    try {
      await cartRepository.clearCart(cartId);

      return {
        statusCode: httpStatus.OK,
        status: "success",
        message: "Cart cleared successfully",
      };
    } catch (error) {
      console.error("Clear cart error:", error);
      return Errors.defaultError;
    }
  }

  async getCartByUserId(userId: string): Promise<CartServiceResponse> {
    try {
      const cart = await cartRepository.getCartByUserId(userId);

      if (!cart) {
        return Errors.doesNotExist;
      }

      return {
        statusCode: httpStatus.OK,
        status: "success",
        message: "Cart retrieved successfully",
        data: cart,
      };
    } catch (error) {
      console.error("Get cart by user ID error:", error);
      return Errors.defaultError;
    }
  }

  async updateCartItems(
    cartId: string,
    items: { productId: string; quantity: number }[]
  ): Promise<CartServiceResponse> {
    try {
      const updatedCart = await cartRepository.updateCartItems(cartId, items);

      return {
        statusCode: httpStatus.OK,
        status: "success",
        message: "Cart items updated successfully",
        data: updatedCart,
      };
    } catch (error) {
      console.error("Update cart items error:", error);
      return Errors.defaultError;
    }
  }

  async getCartById(cartId: string): Promise<CartServiceResponse> {
    try {
      const cart = await cartRepository.getCartById(cartId);

      if (!cart) {
        return Errors.doesNotExist;
      }

      return {
        statusCode: httpStatus.OK,
        status: "success",
        message: "Cart retrieved successfully",
        data: cart,
      };
    } catch (error) {
      console.error("Get cart by ID error:", error);
      return Errors.defaultError;
    }
  }

  async deleteCart(cartId: string): Promise<CartServiceResponse> {
    try {
      await cartRepository.deleteCart(cartId);

      return {
        statusCode: httpStatus.OK,
        status: "success",
        message: "Cart deleted successfully",
      };
    } catch (error) {
      console.error("Delete cart error:", error);
      return Errors.defaultError;
    }
  }
}

export default new CartService();
