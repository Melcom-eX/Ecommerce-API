import { PrismaClient } from "@prisma/client";
import httpStatus from "http-status";
import {
  CategoryServiceResponse,
  CategoryUpdateInput,
} from "./category.response";
import { createErrorResponse, Errors } from "../../error/error";

const prisma = new PrismaClient();

class CategoryService {
  // Get all categories
  async getAllCategories(): Promise<
    CategoryServiceResponse | typeof Errors.defaultError
  > {
    try {
      const categories = await prisma.category.findMany();
      return {
        status: "success",
        statusCode: httpStatus.OK,
        data: categories,
      };
    } catch (error) {
      console.error(error);
      return Errors.defaultError;
    }
  }

  // Get single category by id
  async getCategory(
    id: string
  ): Promise<CategoryServiceResponse | typeof createErrorResponse> {
    try {
      const category = await prisma.category.findUnique({
        where: { id },
      });

      if (!category)
        return createErrorResponse("Category not found", httpStatus.NOT_FOUND);

      return {
        status: "success",
        statusCode: httpStatus.OK,
        data: category,
      };
    } catch (error) {
      console.error(error);
      return Errors.defaultError;
    }
  }

  // Create new category
  async createCategory(
    name: string,
    description?: string
  ): Promise<CategoryServiceResponse | typeof createErrorResponse> {
    try {
      const category = await prisma.category.create({
        data: {
          name,
          description,
        },
      });

      return {
        status: "success",
        statusCode: httpStatus.CREATED,
        data: category,
      };
    } catch (error) {
      console.error(error);
      return Errors.defaultError;
    }
  }

  // Update category
  async updateCategory(
    id: string,
    updateData: CategoryUpdateInput
  ): Promise<CategoryServiceResponse | typeof createErrorResponse> {
    try {
      const category = await prisma.category.update({
        where: { id },
        data: updateData,
      });

      return {
        status: "success",
        statusCode: httpStatus.OK,
        data: category,
      };
    } catch (error) {
      return createErrorResponse(
        "Error updating category",
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Delete category
  async deleteCategory(
    id: string
  ): Promise<CategoryServiceResponse | typeof createErrorResponse> {
    try {
      await prisma.category.delete({
        where: { id },
      });

      return {
        status: "success",
        statusCode: httpStatus.OK,
        message: "Category deleted successfully",
      };
    } catch (error) {
      return createErrorResponse(
        "Error deleting category",
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default new CategoryService();
