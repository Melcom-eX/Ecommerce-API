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

userRoutes.get("/users", protect, isAdmin, userController.getAllUsers);
userRoutes.get(
  "/user/:id",
  // validateSchema(getUserValidation),
  protect,
  userController.getUser
);
userRoutes.post(
  "/upload-profile/:userId", // Add `userId` as a route parameter
  // validateSchema(uploadProfile),
  protect,
  upload.single("profile"), // Use the named import
  userController.uploadProfile
);
userRoutes.put(
  "/update-user/:id",
  validateSchema(updateUserValidation),
  protect,
  userController.updateUser
);
userRoutes.delete(
  "/delete-user/:id",
  validateSchema(deleteUserValidation),
  isAdmin,
  userController.deleteUser
);

export default userRoutes;
