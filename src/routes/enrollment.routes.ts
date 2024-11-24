import express from "express";
import { enrollmentController } from "../controllers/enrollment.controller";
import { authorizeChange, isAdmin, protect } from "../middleware/authorize";
import { validateSchema } from "../middleware/ValidationMiddleware";
import {
  createEnrollmentValidation,
  deleteEnrollmentValidation,
  getEnrollmentValidation,
  updateEnrollmentValidation,
} from "../validation/enrollment.validation";
const enrollmentRoutes = express.Router();

enrollmentRoutes.get(
  "/enrollments",
  protect,
  enrollmentController.getAllEnrollments
);
enrollmentRoutes.get(
  "/enrollment/:id",
  validateSchema(getEnrollmentValidation),
  protect,
  enrollmentController.getEnrollment
);
enrollmentRoutes.post(
  "/create-enrollment",
  validateSchema(createEnrollmentValidation),
  isAdmin,
  enrollmentController.createEnrollment
);
enrollmentRoutes.put(
  "/update-enrollment/:id",
  isAdmin,
  enrollmentController.updateEnrollment
);
enrollmentRoutes.delete(
  "/delete-enrollment/:id",
  isAdmin,
  enrollmentController.deleteEnrollment
);

export default enrollmentRoutes;
