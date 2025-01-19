import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TransactionRepository {
  // Find transactions
  async findAll() {
    return await prisma.transaction.findMany();
  }
  // Find transaction by ID
  async findById(transactionId: string) {
    return await prisma.transaction.findUnique({
      where: { id: transactionId },
    });
  }
  // Create a new transaction profile
  async createTransaction(transactionData: any) {
    return await prisma.transaction.create({
      data: transactionData,
    });
  }
}

export const transactionRepository = new TransactionRepository();
