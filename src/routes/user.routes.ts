import { Router } from "express";
import userController from "../controllers/user.controller";
import { protect, isAdmin } from "../middleware/authorize";
import { validateSchema } from "../middleware/ValidationMiddleware";
import {
  deleteUserValidation,
  getUserValidation,
  updateUserValidation,
} from "../validation/user.validation";
const userRoutes = Router();

userRoutes.get("/users", protect, isAdmin, userController.getAllUsers);
userRoutes.get(
  "/user/:id",
  validateSchema(getUserValidation),
  protect,
  userController.getUser
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
