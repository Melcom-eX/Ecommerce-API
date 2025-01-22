import Joi from "joi";

// Joi validation schema for Transaction
export const transactionValidationSchema = Joi.object({
  id: Joi.string().uuid().required(), // UUID format for id
  userId: Joi.string().uuid().required(), // UUID format for userId
  orderId: Joi.string().uuid().optional().allow(null), // Nullable UUID format for orderId
  sellerId: Joi.string().uuid().required(), // UUID format for sellerId
  amount: Joi.number().positive().required(), // Positive decimal value
  status: Joi.string()
    .valid("PENDING", "COMPLETED", "FAILED") // Enum for TransactionStatus
    .default("PENDING"),
  paymentMethod: Joi.string()
    .valid("CREDIT_CARD", "DEBIT_CARD", "PAYPAL") // Enum for PaymentMethod
    .default("CREDIT_CARD"),
  transactionType: Joi.string()
    .valid("PURCHASE", "REFUND") // Enum for TransactionType
    .default("PURCHASE"),
  referenceId: Joi.string().optional().allow(null), // Nullable unique string
  description: Joi.string().max(255).optional().allow(null), // Optional description with max length
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});

// Transaction DTO (Data Transfer Object)
export type TransactionDTO = {
  orderId?: string | null; // Nullable Order ID
  sellerId: string; // Seller ID
  amount: number; // Transaction amount
  status: "PENDING" | "COMPLETED" | "FAILED"; // Transaction status
  paymentMethod: "CREDIT_CARD" | "DEBIT_CARD" | "PAYPAL"; // Payment method used
  transactionType: "PURCHASE" | "REFUND"; // Type of transaction
  referenceId?: string | null; // Optional unique reference ID
  description?: string | null; // Optional description
};
