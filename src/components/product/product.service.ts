import { PrismaClient, Product } from "@prisma/client";
import { ProductData, ProductServiceResponse } from "./product.response";
import httpStatus from "http-status";
import { createErrorResponse, Errors } from "../../error/error";
import productRepository from "./product.repository";
import cloudinary from "../../utils/cloudinary";

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
      const product: Product = await productRepository.create({
        name,
        description,
        price,
        stock,
        images,
        categoryId,
        sellerId,
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
  async getProduct(id: string): Promise<ProductServiceResponse> {
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
  // Find products by category
  async findProductsByCategory(
    categoryId: string
  ): Promise<ProductServiceResponse> {
    try {
      console.log(`category: ${categoryId}`);
      const products: Product[] = await productRepository.findByCategory(
        categoryId
      );

      if (!products) {
        return createErrorResponse("Products not found", httpStatus.NOT_FOUND);
      }

      return {
        status: "success",
        statusCode: httpStatus.OK,
        message: "Products retrieved successfully",
        data: products,
      };
    } catch (error) {
      console.error("Find products by category error:", error);
      return Errors.defaultError;
    }
  }
  async uploadImages(
    id: string,
    files: Express.Multer.File[]
  ): Promise<{
    status: string;
    error: boolean;
    statusCode: number;
    message: string;
    data?: { urls: string[] };
  }> {
    try {
      // Upload all files to Cloudinary
      const uploadPromises = files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: "images",
          width: 500,
          height: 500,
          crop: "fill",
        })
      );

      const results = await Promise.all(uploadPromises);
      const imageUrls = results.map((result) => result.secure_url);

      // Store the URLs in the database
      const updatedUser = await productRepository.update(id, {
        images: imageUrls,
      });

      if (!updatedUser) {
        return {
          status: "error",
          error: true,
          statusCode: httpStatus.BAD_REQUEST,
          message: "Failed to update product images",
        };
      }

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Product images uploaded and saved successfully",
        data: {
          urls: imageUrls,
        },
      };
    } catch (error) {
      console.error(error);
      return createErrorResponse(
        "Error uploading image",
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default new ProductService();
