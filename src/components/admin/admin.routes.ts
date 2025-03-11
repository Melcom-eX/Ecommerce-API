import { Router } from "express";
import adminController from "./admin.controller";
import { isAdmin } from "../../middleware/authorize";
import { validateParams } from "../../middleware/ValidationMiddleware";
import { adminIdSchema } from "./admin.validation";
const adminRoutes = Router();

adminRoutes.post(
  "/block-user/:id",
  isAdmin,
  validateParams(adminIdSchema),
  adminController.blockUser
);
adminRoutes.post(
  "/unblock-user/:id",
  isAdmin,
  validateParams(adminIdSchema),
  adminController.unblockUser
);
adminRoutes.delete(
  "/delete-user/:id",
  isAdmin,
  validateParams(adminIdSchema),
  adminController.deleteUser
);
adminRoutes.post(
  "/approve-product/:id",
  isAdmin,
  validateParams(adminIdSchema),
  adminController.approveProduct
);
adminRoutes.post(
  "/approve-seller/:id",
  isAdmin,
  validateParams(adminIdSchema),
  adminController.approveSeller
);
adminRoutes.get("/products", isAdmin, adminController.getAllProducts);

export default adminRoutes;
