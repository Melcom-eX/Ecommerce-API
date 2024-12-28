import { PrismaClient } from "@prisma/client";
import httpStatus from "http-status";
import {
  CategoryServiceResponse,
  CategoryUpdateInput,
} from "./category.response";
import { createErrorResponse, Errors } from "../../error/error";
import categoryRepository from "./category.repository";
const prisma = new PrismaClient();

/**
this is the service layer for the category component. It contains the business logic for the admin component.
 
 */

class CategoryService {
  // Get all categories
  async getAllCategories(): Promise<
    CategoryServiceResponse | typeof Errors.defaultError
  > {
    try {
      const categories = await categoryRepository.findAll();
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
      const category = await categoryRepository.findById(id);

      if (!category) {
        return createErrorResponse("Category not found", httpStatus.NOT_FOUND);
      }

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
    description: string
  ): Promise<CategoryServiceResponse | typeof createErrorResponse> {
    try {
      const category = await categoryRepository.create({
        name,
        description,
      });

      return {
        status: "success",
        statusCode: httpStatus.CREATED,
        message: "Category created successfully",
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
      const category = await categoryRepository.findById(id);
      if (!category) {
        return createErrorResponse("category not found", httpStatus.NOT_FOUND);
      }
      const updatedCategory = await categoryRepository.update(id, updateData);

      return {
        status: "success",
        statusCode: httpStatus.OK,
        data: updatedCategory,
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
      const category = await categoryRepository.delete(id);

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
