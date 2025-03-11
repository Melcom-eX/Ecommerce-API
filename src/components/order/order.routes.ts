import { Router } from "express";
import { isAdmin, prod, protect } from "../../middleware/authorize";
import {
  validateParams,
  validateSchema,
} from "../../middleware/ValidationMiddleware";
import {
  createOrderSchema,
  orderIdSchema,
  updateOrderSchema,
} from "./order.validation";
import { orderController } from "./order.controller";
const orderRoutes = Router();

orderRoutes.post(
  "",
  protect,
  validateSchema(createOrderSchema),
  orderController.createOrder
);

orderRoutes.get(
  "/:orderId",
  protect,
  validateParams(orderIdSchema),
  orderController.getOrder
);
orderRoutes.get("", isAdmin, orderController.getOrders);

orderRoutes.put(
  "/:orderId",
  isAdmin,
  validateParams(orderIdSchema),
  validateSchema(updateOrderSchema),
  orderController.updateOrder
);
orderRoutes.delete(
  "/:orderId",
  protect,
  validateParams(orderIdSchema),
  orderController.deleteOrder
);
export default orderRoutes;
