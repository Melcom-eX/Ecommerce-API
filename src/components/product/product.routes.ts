import { Router } from "express";
import { isAdmin, prod, protect } from "../../middleware/authorize";
import productController from "./product.controller";
import {
  validateSchema,
  validateParams,
} from "../../middleware/ValidationMiddleware";
import {
  createProductValidation,
  productIdSchema,
  updateProductValidation,
} from "./product.validation";
import upload from "../../middleware/multer";
const productRoutes = Router();

productRoutes.get("", protect, productController.getAllProducts);
productRoutes.get("/range", protect, productController.filterProductsByPrice);
productRoutes.get(
  "/:id",
  protect,
  validateParams(productIdSchema),
  productController.getProduct
);

productRoutes.post(
  "",
  prod,
  validateSchema(createProductValidation),
  productController.createProduct
);
productRoutes.put(
  "/:id",
  prod,
  validateParams(productIdSchema),
  validateSchema(updateProductValidation),
  productController.updateProduct
);
productRoutes.delete(
  "/:id",
  prod,
  validateParams(productIdSchema),
  productController.deleteProduct
);
productRoutes.post(
  "/:id/image", // Add `userId` as a route parameter
  prod,
  validateParams(productIdSchema),
  upload.array("images", 10), // Use multer's array method to handle multiple images
  productController.uploadImages
);

export default productRoutes;
