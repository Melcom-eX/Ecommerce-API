import express from "express";
import { transactionController } from "./transaction.controller";
import { protect, isAdmin } from "../../middleware/authorize";
import {
  validateSchema,
  validateParams,
} from "../../middleware/ValidationMiddleware";
import {
  transactionIdSchema,
  transactionValidationSchema,
} from "./transaction.validation";

const transactionRoutes = express.Router();

transactionRoutes.post(
  "",
  protect,
  validateSchema(transactionValidationSchema),
  transactionController.createTransaction
);

transactionRoutes.get("", isAdmin, transactionController.getAllTransactions);
transactionRoutes.get(
  "/:transactionId",
  protect,
  validateParams(transactionIdSchema),
  transactionController.getTransaction
);

export default transactionRoutes;
