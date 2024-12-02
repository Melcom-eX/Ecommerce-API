import { Request, Response } from "express";
import { CategoryResponse, DeleteCategoryResponse } from "./category.response";

class CategoryController {
  async getAllCategories(req: Request, res: Response): Promise<Response> {
    try {
      const response: CategoryResponse = await userService.getAllUsers();
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get users error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async getCategory(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const response: CategoryResponse = await userService.getUser(id);

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get user error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async createCategory(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    try {
      const response: CategoryResponse = await userService.createCategory(
        name,
        description
      );

      return res.status(response.statusCode).send(response);
    } catch (error) {
      console.error("Signup error:", error);

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  //update category
  async updateCategory() {}

  //delete a category
  async deleteCategory(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const response: DeleteCategoryResponse = await userService.deleteUser(id);

      if (response.status === "success") {
        // Clear the JWT cookie
        res.cookie("jwt", "", { maxAge: 0 });
      }

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new CategoryController();
