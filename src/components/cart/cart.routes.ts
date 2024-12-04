import { Router } from "express";
import { protect } from "../../middleware/authorize";
import cartController from "./cart.controller";
import { validateSchema } from "../../middleware/ValidationMiddleware";
import {
  createCartValidation,
  updateCartValidation,
  deleteCartValidation,
} from "./cart.validation";

const cartRoutes = Router();

cartRoutes.get("", protect, cartController.getAllCarts);
cartRoutes.get("/:id", protect, cartController.getCart);
cartRoutes.post(
  "/create-cart",
  validateSchema(createCartValidation),
  protect,
  cartController.createCart
);
cartRoutes.put(
  "/:id",
  validateSchema(updateCartValidation),
  protect,
  cartController.updateCart
);
cartRoutes.delete(
  "/:id",
  validateSchema(deleteCartValidation),
  protect,
  cartController.deleteCart
);

export default cartRoutes;
