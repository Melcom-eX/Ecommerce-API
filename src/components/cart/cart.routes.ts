import { Router } from "express";
import { isAdmin, protect } from "../../middleware/authorize";
import cartController from "./cart.controller";
import {
  validateSchema,
  validateParams,
} from "../../middleware/ValidationMiddleware";
import {
  createCartValidation,
  deleteCartValidation,
  addCartItem,
  removeCartItem,
  clearCart,
  updateCartItemsValidation,
  cartIdSchema,
} from "./cart.validation";

const cartRoutes = Router();

cartRoutes.get("", isAdmin, cartController.getAllCarts);
cartRoutes.get(
  "/:id",
  protect,
  validateParams(cartIdSchema),
  cartController.getCartByUserId
);
cartRoutes.post(
  "",
  protect,
  validateParams(cartIdSchema),
  validateSchema(createCartValidation),
  cartController.createCart
);
cartRoutes.post(
  "/item",
  protect,
  validateParams(cartIdSchema),
  validateSchema(addCartItem),
  cartController.addCartItem
);
cartRoutes.put(
  "/:id",
  protect,
  validateParams(cartIdSchema),
  validateSchema(updateCartItemsValidation),
  cartController.updateCartItems
);
cartRoutes.delete(
  "/:id",
  protect,
  validateParams(cartIdSchema),
  cartController.deleteCart
);
cartRoutes.delete(
  "/item/:id",
  protect,
  validateParams(cartIdSchema),
  cartController.removeCartItem
);
cartRoutes.delete(
  "",
  validateSchema(clearCart),
  protect,
  cartController.clearCart
);
export default cartRoutes;
