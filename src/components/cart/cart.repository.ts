import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class CartRepository {
  // Create a new cart or return the existing one for a user
  async createCart(userId: string) {
    // Create a new cart if it doesn't exist
    const cart = await prisma.cart.create({
      data: { userId },
      include: { cartItems: true },
    });

    return cart;
  }

  // Add a product to the cart
  async addCartItem(cartId: string, productId: string, quantity: number) {
    // Check if the product already exists in the cart
    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId, productId },
    });

    if (existingItem) {
      // Update quantity if product exists in the cart
      return prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    // Add a new product to the cart
    const cart = prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });
    return cart;
  }

  // Remove a product from the cart
  async removeCartItem(id: string) {
    return prisma.cartItem.delete({
      where: { id },
    });
  }

  // Clear all products in a cart
  async clearCart(cartId: string) {
    return prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }

  // Get a user's cart with products
  async getCartByUserId(userId: string) {
    return prisma.cart.findUnique({
      where: { userId },
      include: {
        cartItems: {
          include: { product: true }, // Include product details
        },
      },
    });
  }

  // Get all carts
  async getAllCarts() {
    return prisma.cart.findMany({
      include: {
        cartItems: {
          include: { product: true }, // Include product details
        },
      },
    });
  }

  // Update a cart's items
  async updateCartItems(
    cartId: string,
    items: { productId: string; quantity: number }[]
  ) {
    for (const item of items) {
      await prisma.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId,
            productId: item.productId,
          },
        },
        update: {
          quantity: item.quantity, // Update quantity if the item exists
        },
        create: {
          cartId,
          productId: item.productId,
          quantity: item.quantity, // Create a new item if it doesn't exist
        },
      });
    }

    const cart = await this.getCartById(cartId);
    return cart;
  }

  // Get a specific cart by id
  async getCartById(cartId: string) {
    return prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        cartItems: {
          include: { product: true }, // Include product details
        },
      },
    });
  }

  // Delete a cart and all its items
  async deleteCart(cartId: string) {
    // First, check if the cart exists
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
    });

    if (!cart) {
      return null; // Or throw an error if you prefer
    }
    // First, delete the cart items
    await prisma.cartItem.deleteMany({
      where: { cartId },
    });

    // Then, delete the cart
    const response = prisma.cart.delete({
      where: { id: cartId },
    });
    return response;
  }
}

export default new CartRepository();
