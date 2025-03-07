import { Router } from "express";
import userController from "./user.controller";
import { protect, isAdmin } from "../../middleware/authorize";
import { validateSchema } from "../../middleware/ValidationMiddleware";
import {
  deleteUserValidation,
  getUserValidation,
  updateUserValidation,
  uploadProfile,
} from "./user.validation";
import upload from "../../middleware/multer";
const userRoutes = Router();

userRoutes.get("", protect, isAdmin, userController.getAllUsers);
userRoutes.get(
  "/:id",
  // validateSchema(getUserValidation),
  protect,
  userController.getUser
);
userRoutes.post(
  "/profile/:userId", // Add `userId` as a route parameter
  protect,
  upload.single("profile"), // Use the named import
  userController.uploadProfile
);
userRoutes.put(
  "/:id",
  validateSchema(updateUserValidation),
  protect,
  userController.updateUser
);
userRoutes.delete(
  "",
  validateSchema(deleteUserValidation),
  isAdmin,
  userController.deleteUser
);

export default userRoutes;
