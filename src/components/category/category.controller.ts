import { Request, Response } from "express";
import {
  CategoryResponse,
  CategoryServiceResponse,
  DeleteCategoryResponse,
} from "./category.response";
import categoryService from "./category.service";
import { createErrorResponse } from "../../error/error";
class CategoryController {
  async getAllCategories(req: Request, res: Response): Promise<Response> {
    try {
      const response: CategoryServiceResponse =
        await categoryService.getAllCategories();
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get users error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async getCategory(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const response: CategoryServiceResponse | any =
        await categoryService.getCategory(id);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get user error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async createCategory(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    try {
      const response: CategoryResponse | any =
        await categoryService.createCategory(name, description);

      return res.status(response.statusCode).send(response);
    } catch (error) {
      console.error("Signup error:", error);

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  //update category
  async updateCategory(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const response: CategoryResponse | any =
        await categoryService.updateCategory(id, updateData);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Update user error:", err);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  //delete a category
  async deleteCategory(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const response: DeleteCategoryResponse | any =
        await categoryService.deleteCategory(id);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new CategoryController();
