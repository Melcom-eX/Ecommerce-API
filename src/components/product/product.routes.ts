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
productRoutes.get("", protect, productController.getAllProducts);
productRoutes.get("/:id", protect, productController.getProduct);

productRoutes.post(
  "",
  validateSchema(createProductValidation),
  prod,
  productController.createProduct
);
productRoutes.put(
  "/:id",
  validateSchema(updateProductValidation),
  prod,
  productController.updateProduct
);
productRoutes.delete(
  "/:id",
  //   validateSchema(deleteProductValidation),
  prod,
  productController.deleteProduct
);

export default productRoutes;
