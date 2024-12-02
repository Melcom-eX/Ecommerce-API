import { Router } from "express";
import { isAdmin, protect } from "../../middleware/authorize";
import categoryController from "./category.controller";
import { validateSchema } from "../../middleware/ValidationMiddleware";
import {
  createCategoryValidation,
  deleteCategoryValidation,
  updateCategoryValidation,
} from "./category.validation";
const productRoutes = Router();
productRoutes.get("/products", protect, categoryController.getAllCategories);
productRoutes.get("/product/:id", protect, categoryController.getCategory);
productRoutes.post(
  "/create-category",
  validateSchema(createCategoryValidation),
  isAdmin,
  categoryController.createCategory
);
productRoutes.put(
  "/update-product/:id",
  validateSchema(updateCategoryValidation),
  isAdmin,
  categoryController.updateCategory
);
productRoutes.delete(
  "/delete-product/:id",
  validateSchema(deleteCategoryValidation),
  isAdmin,
  categoryController.deleteCategory
);

export default productRoutes;
