import { OrderStatus, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class OrderRepository {
  async createOrder(
    userId: string,
    cartItems: string[],
    shippingAddress: string,
    totalAmount: number
  ) {
    return await prisma.order.create({
      data: {
        userId,
        cartItems: {
          connect: cartItems.map((itemId: string) => ({ id: itemId })),
        },
        shippingAddress,
        totalAmount,
      },
    });
  }
  async findOrderById(orderId: string) {
    return await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        cartItems: true,
        transaction: true,
      },
    });
  }
  async getOrders() {
    return await prisma.order.findMany();
  }
  async updateOrder(
    orderId: string,
    status: OrderStatus,
    shippingAddress: string
  ) {
    return await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        shippingAddress,
      },
    });
  }
  async deleteOrder(orderId: string) {
    return await prisma.order.delete({
      where: { id: orderId },
    });
  }
}
export const orderRepository = new OrderRepository();
