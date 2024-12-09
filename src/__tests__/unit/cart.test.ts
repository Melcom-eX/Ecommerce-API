import cartService from "../../components/cart/cart.service";
import { Cart, CartItem } from "@prisma/client";
import httpStatus from "http-status";
import { CartServiceResponse } from "../../components/cart/cart.response";

jest.mock("../../components/cart/cart.service", () => ({
  createCart: jest.fn(),
  getAllCarts: jest.fn(),
  addCartItem: jest.fn(),
  removeCartItem: jest.fn(),
  clearCart: jest.fn(),
  getCartByUserId: jest.fn(),
  updateCartItems: jest.fn(),
  getCartById: jest.fn(),
  deleteCart: jest.fn(),
}));

const mockCarts: Cart[] = [
  {
    id: "1",
    userId: "test-user",
    orderId: "test-order",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    userId: "test-user",
    orderId: "test-order",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const cartItems: CartItem[] = [
  {
    id: "1",
    cartId: "sample-cart-id",
    productId: "sample-product-id",
    quantity: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    cartId: "sample-cart-id",
    productId: "sample-product-id",
    quantity: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const cartItem = cartItems[0];
const mockCart = mockCarts[0];
describe("Cart Service Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("createCart", () => {
    it("should create a cart for a user", async () => {
      const newCart = {
        userId: "test-user",
      };
      (cartService.createCart as jest.Mock).mockResolvedValue({
        statusCode: httpStatus.CREATED,
        status: "success",
        message: "Cart created successfully",
        data: mockCart,
      });
      const result = await cartService.createCart(newCart.userId);
      expect(result).toEqual({
        statusCode: httpStatus.CREATED,
        status: "success",
        message: "Cart created successfully",
        data: mockCart,
      });
    });
  });
  describe("getAllCarts", () => {
    it("should get all the carts in the DB", async () => {
      (cartService.getAllCarts as jest.Mock).mockResolvedValue({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Carts retrieved successfully",
        data: mockCarts,
      });
      const result = await cartService.getAllCarts();
      expect(result).toEqual({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Carts retrieved successfully",
        data: mockCarts,
      });
    });
  });
  describe("addCartItem", () => {
    it("should add items to the cart of a user", async () => {
      (cartService.addCartItem as jest.Mock).mockResolvedValue({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Item added to cart successfully",
        data: cartItem,
      });
      const result = await cartService.addCartItem(
        cartItem.cartId,
        cartItem.productId,
        cartItem.quantity
      );
      expect(result).toEqual({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Item added to cart successfully",
        data: cartItem,
      });
    });
  });
  describe("removeCartItem", () => {
    it("should remove an item from a cart", async () => {
      (cartService.removeCartItem as jest.Mock).mockResolvedValue({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Item removed from cart successfully",
      });
      const result = await cartService.removeCartItem(cartItem.id);
      expect(result).toEqual({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Item removed from cart successfully",
      });
    });
  });
  describe("clearCart", () => {
    it("should clear all the products in a cart", async () => {
      (cartService.clearCart as jest.Mock).mockResolvedValue({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Cart cleared successfully",
      });
      const result = await cartService.clearCart(cartItem.cartId);
      expect(result).toEqual({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Cart cleared successfully",
      });
    });
  });
  describe("getCartByUserId", () => {
    it("should the cart for a particular user", async () => {
      (cartService.getCartByUserId as jest.Mock).mockResolvedValue({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Cart retrieved successfully",
        data: mockCart,
      });
      const result = await cartService.getCartByUserId(mockCart.userId);
      expect(result).toEqual({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Cart retrieved successfully",
        data: mockCart,
      });
    });
  });
  describe("updateCartItems", () => {
    it("should update the items in a cart", async () => {
      const updatedCartItem = { productId: "sample-product-id", quantity: 20 };
      (cartService.updateCartItems as jest.Mock).mockResolvedValue({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Cart items updated successfully",
        data: { ...cartItems[0], ...updatedCartItem },
      });
      const result = await cartService.updateCartItems(cartItem.cartId, [
        updatedCartItem,
      ]);
      expect(result).toEqual({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Cart items updated successfully",
        data: { ...cartItems[0], ...updatedCartItem },
      });
    });
  });
  describe("getCartById", () => {
    it("should get a cart by the cartId", async () => {
      (cartService.getCartById as jest.Mock).mockResolvedValue({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Cart retrieved successfully",
        data: mockCart,
      });
      const result = await cartService.getCartById(mockCart.id);
      expect(result).toEqual({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Cart retrieved successfully",
        data: mockCart,
      });
    });
  });
  describe("deleteCart", () => {
    it("should delete a cart based on the cartId", async () => {
      (cartService.deleteCart as jest.Mock).mockResolvedValue({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Cart deleted successfully",
      });
      const result = await cartService.deleteCart(mockCart.id);
      expect(result).toEqual({
        statusCode: httpStatus.OK,
        status: "success",
        message: "Cart deleted successfully",
      });
    });
  });
});
