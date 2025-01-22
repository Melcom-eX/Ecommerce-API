import { Transaction } from "@prisma/client";

export interface TransactionResponse {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
  data: Transaction;
}
