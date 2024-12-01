import { Category as CategoryModel, Product } from "@prisma/client";

interface CategoryUpdateInput {
  name?: string;
  description?: string;
}

type CategoryResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
  data?: CategoryModel | null;
};

type CreateCategoryResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  data: {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

type DeleteCategoryResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
};

type GetCategoryResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
  data?: CategoryModel | null;
};

type CategoryServiceResponse = {
  status: string;
  statusCode: number;
  message?: string;
  data?: any;
  error?: boolean;
};

export {
  CategoryUpdateInput,
  CategoryResponse,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  GetCategoryResponse,
  CategoryServiceResponse,
};
