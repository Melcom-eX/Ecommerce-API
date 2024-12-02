import { PrismaClient, Product } from "@prisma/client";
import { ProductData, ProductServiceResponse } from "./product.response";
import httpStatus from "http-status";
import { createErrorResponse, Errors } from "../../error/error";

const prisma = new PrismaClient();

class ProductService {
  // Create a new product
  async createProduct(
    name: string,
    description: string,
    price: number,
    stock: number,
    images: string[],
    categoryId: string,
    sellerId: string
  ): Promise<ProductServiceResponse> {
    try {
      const product: Product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          stock,
          images,
          categoryId,
          sellerId,
        },
      });

      return {
        status: "success",
        statusCode: httpStatus.CREATED,
        message: "Product created successfully",
        data: product,
      };
    } catch (error) {
      console.error("Create product error:", error);
      return Errors.defaultError;
    }
  }

  // Get all products
  async getAllProducts(): Promise<ProductServiceResponse> {
    try {
      const products: Product[] = await prisma.product.findMany();

      return {
        status: "success",
        statusCode: httpStatus.OK,
        message: "Products retrieved successfully",
        data: products,
      };
    } catch (error) {
      console.error("Get products error:", error);
      return Errors.defaultError;
    }
  }

  // Get a specific product by id
  async getProduct(
    id: string
  ): Promise<ProductServiceResponse | typeof createErrorResponse> {
    try {
      const product: Product | null = await prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        return createErrorResponse("Product not found", httpStatus.NOT_FOUND);
      }

      return {
        status: "success",
        statusCode: httpStatus.OK,
        message: "Product retrieved successfully",
        data: product,
      };
    } catch (error) {
      console.error("Get product error:", error);
      return Errors.defaultError;
    }
  }

  // Update a product by id
  async updateProduct(
    id: string,
    productData: Partial<ProductData>
  ): Promise<ProductServiceResponse> {
    try {
      const product: Product | null = await prisma.product.update({
        where: { id },
        data: productData,
      });

      return {
        status: "success",
        statusCode: httpStatus.OK,
        message: "Product updated successfully",
        data: product,
      };
    } catch (error) {
      console.error("Update product error:", error);
      return Errors.defaultError;
    }
  }

  // Delete a product by id
  async deleteProduct(id: string): Promise<ProductServiceResponse> {
    try {
      await prisma.product.delete({
        where: { id },
      });

      return {
        status: "success",
        statusCode: httpStatus.OK,
        message: "Product deleted successfully",
      };
    } catch (error) {
      console.error("Delete product error:", error);
      return Errors.defaultError;
    }
  }
}

export default new ProductService();
