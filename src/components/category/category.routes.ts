import { Router } from "express";
import { isAdmin, protect } from "../../middleware/authorize";
import categoryController from "./category.controller";
import { validateSchema } from "../../middleware/ValidationMiddleware";
import {
  deleteCategoryValidation,
  updateCategoryValidation,
} from "./category.validation";
const categoryRoutes = Router();
categoryRoutes.get("/categories", protect, categoryController.getAllCategories);
categoryRoutes.get("/category/:id", protect, categoryController.getCategory);
categoryRoutes.post(
  "/create-category",
  // validateSchema(uploadProfile),
  isAdmin,
  categoryController.createCategory
);
categoryRoutes.put(
  "/update-category/:id",
  validateSchema(updateCategoryValidation),
  isAdmin,
  categoryController.updateCategory
);
categoryRoutes.delete(
  "/delete-category/:id",
  validateSchema(deleteCategoryValidation),
  isAdmin,
  categoryController.deleteCategory
);

export default categoryRoutes;
