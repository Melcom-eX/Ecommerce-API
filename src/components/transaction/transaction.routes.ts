import express from "express";
import { transactionController } from "./transaction.controller";
import { protect, isAdmin } from "../../middleware/authorize";
import { validateSchema } from "../../middleware/ValidationMiddleware";
import { transactionValidationSchema } from "./transaction.validation";

const transactionRoutes = express.Router();

transactionRoutes.post(
  "",
  validateSchema(transactionValidationSchema),
  protect,
  transactionController.createTransaction
);

transactionRoutes.get("", isAdmin, transactionController.getAllTransactions);
transactionRoutes.get("/:id", protect, transactionController.getTransaction);

export default transactionRoutes;
