import { Request, Response } from "express";
// import { sellerService } from './seller.service';
import { TransactionDTO } from "./transaction.validation";
import { transactionService } from "./transaction.service";

class TransactionController {
  async createTransaction(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          status: false,
          message: "User not authenticated",
          data: null,
        });
      }
      const transaction = await transactionService.createTransaction(
        userId,
        req.body as TransactionDTO
      );

      return res.status(201).json({
        status: true,
        message: "transaction succesful",
        data: transaction,
      });
    } catch (error) {
      console.error("Delete user error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export const transactionController = new TransactionController();
