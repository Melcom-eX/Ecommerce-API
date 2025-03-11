import {
  PrismaClient,
  TransactionStatus,
  PaymentMethod,
  TransactionType,
} from "@prisma/client";

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
  async createTransaction(
    userId: string,
    orderId: string,
    sellerId: string,
    amount: number,
    status: TransactionStatus,
    paymentMethod: PaymentMethod,
    transactionType: TransactionType,
    referenceId: string,
    description: string
  ) {
    return await prisma.transaction.create({
      data: {
        userId,
        orderId,
        sellerId,
        amount,
        status,
        paymentMethod,
        transactionType,
        referenceId,
        description,
      },
    });
  }
}

export const transactionRepository = new TransactionRepository();
