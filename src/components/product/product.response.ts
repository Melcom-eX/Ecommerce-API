import { Product } from "@prisma/client";
type ProductServiceResponse = {
  status: string;
  statusCode: number;
  message: string;
  data?: Product | Product[] | null;
};

type ProductData = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: string;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
};
type DeleteProductResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
};
export { ProductServiceResponse, ProductData, DeleteProductResponse };
