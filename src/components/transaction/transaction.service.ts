import httpStatus from "http-status";
import { transactionRepository } from "./transaction.repository";
import { TransactionResponse } from "./transaction.response";
import { TransactionDTO } from "./transaction.validation";
import {
  PaymentMethod,
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@prisma/client";
import { Errors } from "../../error/error";

class TransactionService {
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
  ): Promise<TransactionResponse> {
    try {
      const data = await transactionRepository.createTransaction(
        userId,
        orderId,
        sellerId,
        amount,
        status,
        paymentMethod,
        transactionType,
        referenceId,
        description
      );
      return {
        statusCode: httpStatus.CREATED,
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
  async getAllTransactions(): Promise<{
    status: string;
    error: boolean;
    statusCode: number;
    message: string;
    data?: Transaction[];
  }> {
    try {
      const data = await transactionRepository.findAll();
      return {
        statusCode: httpStatus.OK,
        error: false,
        status: "success",
        message: "transactions retireved successfully",
        data: data,
      };
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  }

  async getTransaction(
    id: string
  ): Promise<TransactionResponse | typeof Errors.doesNotExist> {
    try {
      const transaction = await transactionRepository.findById(id);
      if (!transaction) return Errors.doesNotExist;
      return {
        statusCode: httpStatus.OK,
        error: false,
        status: "success",
        message: "transaction retireved succesfully",
        data: transaction,
      };
    } catch (error) {
      console.error(error);
      return Errors.defaultError;
    }
  }
}
export const transactionService = new TransactionService();
