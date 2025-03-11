import { Router } from "express";
import { isAdmin, protect } from "../../middleware/authorize";
import categoryController from "./category.controller";
import {
  validateSchema,
  validateParams,
} from "../../middleware/ValidationMiddleware";
import {
  categoryIdSchema,
  createCategoryValidation,
  deleteCategoryValidation,
  updateCategoryValidation,
} from "./category.validation";
const categoryRoutes = Router();

categoryRoutes.get("", protect, categoryController.getAllCategories);
categoryRoutes.get(
  "/:id",
  protect,
  validateParams(categoryIdSchema),
  categoryController.getCategory
);
categoryRoutes.post(
  "",
  isAdmin,
  validateSchema(createCategoryValidation),
  categoryController.createCategory
);
categoryRoutes.put(
  "/:id",
  isAdmin,
  validateParams(categoryIdSchema),
  validateSchema(updateCategoryValidation),
  categoryController.updateCategory
);
categoryRoutes.delete(
  "/:id",
  isAdmin,
  validateParams(categoryIdSchema),
  validateSchema(deleteCategoryValidation),
  categoryController.deleteCategory
);

export default categoryRoutes;
