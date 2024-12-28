import { PrismaClient, Product, User } from "@prisma/client";

const prisma = new PrismaClient();

class AdminRepository {
  async blockUser(id: string): Promise<User | null> {
    const user = await prisma.user.update({
      where: { id },
      data: { isBlocked: true },
    });
    return user as User | null;
  }

  async unblockUser(id: string): Promise<User | null> {
    const user = await prisma.user.update({
      where: { id },
      data: { isBlocked: false },
    });
    return user as User | null;
  }

  async approveProduct(id: string): Promise<Product | null> {
    const product = await prisma.product.update({
      where: { id },
      data: { isApproved: true },
    });
    return product as Product | null;
  }
}

export default new AdminRepository();
