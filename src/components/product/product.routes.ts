import { Router } from "express";
import { isAdmin, prod, protect } from "../../middleware/authorize";
import productController from "./product.controller";
import { validateSchema } from "../../middleware/ValidationMiddleware";
import {
  createProductValidation,
  deleteProductValidation,
  updateProductValidation,
} from "./product.validation";
const productRoutes = Router();
productRoutes.get("/products", protect, productController.getAllProducts);
productRoutes.get("/product/:id", protect, productController.getProduct);
productRoutes.post(
  "/create-product",
  validateSchema(createProductValidation),
  prod,
  productController.createProduct
);
productRoutes.put(
  "/update-product/:id",
  validateSchema(updateProductValidation),
  prod,
  productController.updateProduct
);
productRoutes.delete(
  "/delete-product/:id",
  validateSchema(deleteProductValidation),
  prod,
  productController.deleteProduct
);

export default productRoutes;
