import { OrderStatus, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class OrderRepository {
  async createOrder(
    userId: string,
    cartId: string,
    shippingAddress: string,
    totalAmount: number
  ) {
    return await prisma.order.create({
      data: {
        userId,
        cartId,
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
        cart: true,
        transaction: true,
      },
    });
  }
  async getOrders() {
    return await prisma.order.findMany();
  }
  async updateOrder(orderId: string, status: OrderStatus) {
    return await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
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
