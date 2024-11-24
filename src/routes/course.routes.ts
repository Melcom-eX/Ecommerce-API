import { Router } from "express";
import { courseController } from "../controllers/course.controller";
import { validateSchema } from "../middleware/ValidationMiddleware";
import { isAdmin, protect } from "../middleware/authorize";
import {
  createCourseValidation,
  deleteCourseValidation,
  getCourseValidation,
  updateCourseValidation,
} from "../validation/course.validation";
const courseRoutes = Router();

courseRoutes.post(
  "/create-course",
  validateSchema(createCourseValidation),
  isAdmin,
  courseController.createCourse
);
courseRoutes.get("/course/:id", protect, courseController.getCourseById);
courseRoutes.get("/courses", protect, courseController.getAllCourses);
courseRoutes.put(
  "/update-course/:id",
  validateSchema(updateCourseValidation),
  isAdmin,
  courseController.updateCourse
);
courseRoutes.delete(
  "/delete-courses/:id",
  isAdmin,
  courseController.deleteCourse
);

export default courseRoutes;
