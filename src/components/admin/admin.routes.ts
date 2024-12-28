import { Router } from "express";
import adminController from "./admin.controller";
import { isAdmin } from "../../middleware/authorize";
const adminRoutes = Router();

adminRoutes.post("/block-user/:id", isAdmin, adminController.blockUser);
adminRoutes.post("/unblock-user/:id", isAdmin, adminController.unblockUser);
adminRoutes.delete("/delete-user/:id", isAdmin, adminController.deleteUser);
adminRoutes.post(
  "/approve-product/:id",
  isAdmin,
  adminController.approveProduct
);
adminRoutes.get("/products", isAdmin, adminController.getAllProducts);

export default adminRoutes;
