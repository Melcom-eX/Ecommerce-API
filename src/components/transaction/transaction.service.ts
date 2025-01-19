import httpStatus from "http-status";
import { transactionRepository } from "./transaction.repository";
import { TransactionResponse } from "./transaction.response";
import { TransactionDTO } from "./transaction.validation";

class TransactionService {
  async createTransaction(
    userId: string,
    dto: TransactionDTO
  ): Promise<TransactionResponse> {
    try {
      const transactionData = {
        user: userId,
        orderId: dto.orderId,
        sellerId: dto.sellerId,
        amount: dto.amount,
        status: dto.status,
        paymentMethod: dto.paymentMethod,
        transactionType: dto.transactionType,
        referenceId: dto.referenceId,
        description: dto.description,
      };

      const data = await transactionRepository.createTransaction(
        transactionData
      );
      return {
        statusCode: httpStatus.OK,
        error: false,
        status: "success",
        message: "transaction created succesfully",
        data: data,
      };
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  }
}
export const transactionService = new TransactionService();
