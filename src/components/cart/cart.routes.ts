import { Router } from "express";
import { protect } from "../../middleware/authorize";
import cartController from "./cart.controller";
import { validateSchema } from "../../middleware/ValidationMiddleware";
import {
  createCartValidation,
  updateCartValidation,
  deleteCartValidation,
  addCartItem,
  removeCartItem,
  clearCart,
} from "./cart.validation";

const cartRoutes = Router();

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Retrieve all users
 *     description: Returns a list of users.
 *     responses:
 *       200:
 *         description: A list of users.
 */

cartRoutes.get("", protect, cartController.getAllCarts);
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
  validateSchema(updateCartValidation),
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
