import { Router } from "express";
import userController from "./user.controller";
import { protect, isAdmin } from "../../middleware/authorize";
import {
  validateSchema,
  validateParams,
} from "../../middleware/ValidationMiddleware";
import {
  deleteUserValidation,
  updateUserValidation,
  userIdSchema,
} from "./user.validation";
import upload from "../../middleware/multer";
const userRoutes = Router();

userRoutes.get("", isAdmin, userController.getAllUsers);
userRoutes.get(
  "/:id",
  protect,
  validateParams(userIdSchema),
  userController.getUser
);
userRoutes.post(
  "/profile/:id", // Add `userId` as a route parameter
  protect,
  validateParams(userIdSchema),
  upload.single("profile"), // Use the named import
  userController.uploadProfile
);
userRoutes.put(
  "/:id",
  protect,
  validateParams(userIdSchema),
  validateSchema(updateUserValidation),
  userController.updateUser
);
userRoutes.delete(
  "",
  isAdmin,
  validateSchema(deleteUserValidation),
  userController.deleteUser
);

export default userRoutes;
