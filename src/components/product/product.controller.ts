import { Request, Response } from "express";
import productService from "./product.service";
import { ProductServiceResponse } from "./product.response";
import { createErrorResponse } from "../../error/error";

class ProductController {
  // Create a new product
  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description, price, stock, images, categoryId, sellerId } =
        req.body;
      const response: ProductServiceResponse =
        await productService.createProduct(
          name,
          description,
          price,
          stock,
          images,
          categoryId,
          sellerId
        );

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Create product error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Get all products
  async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const categoryId = req.query.categoryId as string;
      if (categoryId) {
        const response: ProductServiceResponse =
          await productService.findProductsByCategory(categoryId);

        return res.status(response.statusCode).send(response);
      }
      const response: ProductServiceResponse | any =
        await productService.getAllProducts();
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get products error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Get a specific product by id
  async getProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const response: ProductServiceResponse | any =
        await productService.getProduct(id);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get product error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Update a product by id
  async updateProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const productData = req.body;

    try {
      const response: ProductServiceResponse =
        await productService.updateProduct(id, productData);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Update product error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Delete a product by id
  async deleteProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const response: ProductServiceResponse =
        await productService.deleteProduct(id);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Delete product error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  //upload user profile
  async uploadImages(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params; // Extract the product ID from the request parameters
      const files = req.files as Express.Multer.File[]; // Files uploaded via Multer middleware

      if (!files || files.length === 0) {
        return res.status(400).json({
          status: "error",
          message: "No files uploaded",
        });
      }

      const response = await productService.uploadImages(id, files);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Upload images error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ProductController();
