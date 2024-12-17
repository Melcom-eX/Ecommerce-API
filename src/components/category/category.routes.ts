import { Router } from "express";
import { isAdmin, protect } from "../../middleware/authorize";
import categoryController from "./category.controller";
import { validateSchema } from "../../middleware/ValidationMiddleware";
import {
  createCategoryValidation,
  deleteCategoryValidation,
  updateCategoryValidation,
} from "./category.validation";
const categoryRoutes = Router();

/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Retrieve all users
 *     description: Returns a list of users.
 *     responses:
 *       200:
 *         description: A list of users.
 */

categoryRoutes.get("", protect, categoryController.getAllCategories);
categoryRoutes.get("/:id", protect, categoryController.getCategory);
categoryRoutes.post(
  "",
  validateSchema(createCategoryValidation),
  isAdmin,
  categoryController.createCategory
);
categoryRoutes.put(
  "/:id",
  validateSchema(updateCategoryValidation),
  isAdmin,
  categoryController.updateCategory
);
categoryRoutes.delete(
  "/:id",
  validateSchema(deleteCategoryValidation),
  isAdmin,
  categoryController.deleteCategory
);

export default categoryRoutes;
