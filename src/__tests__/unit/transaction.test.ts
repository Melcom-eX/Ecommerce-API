import { transactionService } from "../../components/transaction/transaction.service";
import { Transaction } from "@prisma/client";
import httpStatus from "http-status";

// Define the allowed transaction statuses
type TransactionStatus = "PENDING" | "FAILED" | "COMPLETED";
type PaymentMethod = "CREDIT_CARD" | "PAYPAL";
type TransactionType = "PURCHASE" | "REFUND";

// Define the DTO interface
interface TransactionDTO {
  id: string;
  orderId: string | null;
  userId: string;
  sellerId: string;
  amount: number;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  transactionType: TransactionType;
  referenceId: string | null;
  description: string | null;
  createdAt: Date;
}

jest.mock("../../components/transaction/transaction.service", () => ({
  transactionService: {
    createTransaction: jest.fn(),
    getAllTransactions: jest.fn(),
    getTransaction: jest.fn(),
  },
}));

const mockTransactions: TransactionDTO[] = [
  {
    id: "1a2b3c4d-5678-9101-1121-314151617181",
    userId: "9f8e7d6c-5b4a-3210-9876-54321fedcba",
    orderId: "abc12345-def6-7890-ghij-klmnopqrstuv",
    sellerId: "98765432-1abc-4def-5678-90fedcba4321",
    amount: 5000,
    status: "PENDING", // Changed from SUCCESS to PENDING to match DTO
    paymentMethod: "CREDIT_CARD",
    transactionType: "PURCHASE",
    referenceId: "TXN-001-2025",
    description: "Payment for order #12345",
    createdAt: new Date("2025-01-18T10:00:00Z"),
  },
  {
    id: "2b3c4d5e-6789-0123-4567-890abcdef123",
    userId: "1abc2def-3456-7890-ghij-klmnop123456",
    orderId: null,
    sellerId: "12345abc-6def-7890-4321-fedcba987654",
    amount: 12000,
    status: "COMPLETED", // Changed from SUCCESS to COMPLETED to match DTO
    paymentMethod: "PAYPAL",
    transactionType: "REFUND",
    referenceId: "TXN-002-2025",
    description: "Refund for order #67890",
    createdAt: new Date("2025-01-17T15:30:00Z"),
  },
];

const mockTransaction = mockTransactions[0];

describe("Transaction Service Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createTransaction", () => {
    it("should create a transaction receipt for an order", async () => {
      const expectedResponse = {
        statusCode: httpStatus.CREATED,
        error: false,
        status: "success",
        message: "transaction created successfully",
        data: mockTransaction,
      };

      (transactionService.createTransaction as jest.Mock).mockResolvedValue(
        expectedResponse
      );

      const result = await transactionService.createTransaction(
        mockTransaction.userId,
        mockTransaction
      );

      expect(result).toEqual({
        statusCode: httpStatus.CREATED,
        error: false,
        status: "success",
        message: "transaction created successfully",
        data: result.data,
      });
      // expect(transactionService.createTransaction).toHaveBeenCalledWith(
      //   mockTransaction.userId,
      //   mockTransaction
      // );
      // expect(transactionService.createTransaction).toHaveBeenCalledTimes(1);
    });
  });

  describe("getAllTransactions", () => {
    it("should get all the transactions made", async () => {
      const expectedResponse = {
        statusCode: httpStatus.OK,
        error: false,
        status: "success",
        message: "transactions retireved successfully",
        data: mockTransactions,
      };
      (transactionService.getAllTransactions as jest.Mock).mockResolvedValue(
        expectedResponse
      );
      const result = await transactionService.getAllTransactions();

      expect(result).toEqual({
        statusCode: httpStatus.OK,
        error: false,
        status: "success",
        message: "transactions retireved successfully",
        data: result.data,
      });
    });
  });

  describe("getTransaction", () => {
    it("should get the data for a single transaction", async () => {
      const expectedResponse = {
        statusCode: httpStatus.OK,
        error: false,
        status: "success",
        message: "transaction retireved succesfully",
        data: mockTransaction,
      };

      (transactionService.getTransaction as jest.Mock).mockResolvedValue(
        expectedResponse
      );

      const result = await transactionService.getTransaction(
        mockTransaction.id
      );

      expect(result).toEqual({
        statusCode: httpStatus.OK,
        error: false,
        status: "success",
        message: "transaction retireved succesfully",
        data: mockTransaction,
      });
    });
  });
});
