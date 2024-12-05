import { Cart, CartItem } from "@prisma/client";

type CartServiceResponse = {
  status: string;
  statusCode: number;
  message: string;
  data?: Cart | Cart[] | null;
};

type CartItemServiceResponse = {
  status: string;
  statusCode: number;
  message: string;
  data?: CartItem | CartItem[] | null;
};

type CartData = {
  id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
};

type DeleteCartResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
};
type CartItemData = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export {
  CartServiceResponse,
  CartData,
  DeleteCartResponse,
  CartItemData,
  CartItemServiceResponse,
};
