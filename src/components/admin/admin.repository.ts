import {
  PrismaClient,
  Product,
  Seller,
  SellerStatus,
  User,
} from "@prisma/client";

const prisma = new PrismaClient();

class AdminRepository {
  async blockUser(id: string): Promise<User | null> {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: { isBlocked: true },
      });
      return user as User | null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async unblockUser(id: string): Promise<User | null> {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: { isBlocked: false },
      });
      return user as User | null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async approveProduct(id: string): Promise<Product | null> {
    try {
      const product = await prisma.product.update({
        where: { id },
        data: { isApproved: true },
      });
      return product as Product | null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async approveSeller(
    id: string,
    status: SellerStatus
  ): Promise<Seller | null> {
    try {
      const seller = await prisma.seller.update({
        where: { id },
        data: { status: status },
      });
      return seller as Seller | null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new AdminRepository();
