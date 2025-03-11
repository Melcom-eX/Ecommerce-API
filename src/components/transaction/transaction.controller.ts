import { Request, Response } from "express";
// import { sellerService } from './seller.service';
import { TransactionDTO } from "./transaction.validation";
import { transactionService } from "./transaction.service";

class TransactionController {
  async createTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          status: false,
          message: "User not authenticated",
          data: null,
        });
      }
      const {
        orderId,
        sellerId,
        amount,
        status,
        paymentMethod,
        transactionType,
        referenceId,
        description,
      } = req.body;
      const transaction = await transactionService.createTransaction(
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

      return res.status(transaction.statusCode).send(transaction);
    } catch (error) {
      console.error("Create transaction error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllTransactions(req: Request, res: Response): Promise<Response> {
    try {
      const transactions = await transactionService.getAllTransactions();
      return res.status(transactions.statusCode).send(transactions);
    } catch (error) {
      console.error("Delete user error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const { transactionId } = req.params;
      const transaction = await transactionService.getTransaction(
        transactionId
      );
      return res.status(transaction.statusCode).send(transaction);
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  }
}

export const transactionController = new TransactionController();
