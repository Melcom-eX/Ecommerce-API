import { Router } from "express";
import { isAdmin, prod, protect } from "../../middleware/authorize";
import productController from "./product.controller";
import { validateSchema } from "../../middleware/ValidationMiddleware";
import {
  createProductValidation,
  updateProductValidation,
} from "./product.validation";
import upload from "../../middleware/multer";
const productRoutes = Router();

productRoutes.get("", protect, productController.getAllProducts);
productRoutes.get("/range", protect, productController.filterProductsByPrice);
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
productRoutes.post(
  "/:id/image", // Add `userId` as a route parameter
  prod,
  upload.array("images", 10), // Use multer's array method to handle multiple images
  productController.uploadImages
);

export default productRoutes;
