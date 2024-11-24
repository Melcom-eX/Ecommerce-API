import { Router } from "express";
import authController from "../controllers/auth.controller";
import {
  confirmResetPassword,
  login,
  register,
  ResetPassword,
  validateOTP,
} from "../validation/auth.validation";
import { validateSchema } from "../middleware/ValidationMiddleware";
import { authorizeChange, protect } from "../middleware/authorize";
const authRoutes = Router();

authRoutes.post(
  "/signup",
  validateSchema(register), // Use the named import
  authController.signup
);

authRoutes.post(
  "/login",
  validateSchema(login), // Use the named import
  authController.login
);
authRoutes.post(
  "/validate-otp/:id",
  validateSchema(validateOTP),
  authController.validateOTP
);
authRoutes.post(
  "/reset-password/:id",
  validateSchema(ResetPassword),
  authorizeChange,
  authController.ResetPassword
);
authRoutes.post(
  "/confirm-reset-password/:id",
  validateSchema(confirmResetPassword),
  authorizeChange,
  authController.confirmResetPassword
);
export default authRoutes;
