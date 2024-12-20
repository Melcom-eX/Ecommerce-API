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

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve all users
 *     description: Returns a list of users.
 *     responses:
 *       200:
 *         description: A list of users.
 */

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
  "/:id",
  validateSchema(deleteUserValidation),
  isAdmin,
  userController.deleteUser
);

export default userRoutes;
