import { Router } from "express";
import { isAdmin, protect } from "../../middleware/authorize";
import cartController from "./cart.controller";
import { validateSchema } from "../../middleware/ValidationMiddleware";
import {
  createCartValidation,
  deleteCartValidation,
  addCartItem,
  removeCartItem,
  clearCart,
  updateCartItemsValidation,
} from "./cart.validation";

const cartRoutes = Router();

cartRoutes.get("", isAdmin, cartController.getAllCarts);
cartRoutes.get("/:userId", protect, cartController.getCartByUserId);
cartRoutes.post(
  "",
  validateSchema(createCartValidation),
  protect,
  cartController.createCart
);
cartRoutes.post(
  "/item",
  validateSchema(addCartItem),
  protect,
  cartController.addCartItem
);
cartRoutes.put(
  "/:cartId",
  validateSchema(updateCartItemsValidation),
  protect,
  cartController.updateCartItems
);
cartRoutes.delete(
  "/:cartId",
  // validateSchema(deleteCartValidation),
  protect,
  cartController.deleteCart
);
cartRoutes.delete(
  "/item/:id",
  // validateSchema(removeCartItem),
  protect,
  cartController.removeCartItem
);
cartRoutes.delete(
  "",
  validateSchema(clearCart),
  protect,
  cartController.clearCart
);
export default cartRoutes;
