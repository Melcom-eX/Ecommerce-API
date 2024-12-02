import { Category as CategoryModel } from "@prisma/client";

interface CategoryUpdateInput {
  name?: string;
  description?: string;
}

type CategoryResponse = {
  status: string;
  error: boolean;
  statusCode: number;
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

type CategoryServiceResponse = {
  status: string;
  error?: boolean;
  statusCode: number;
  message?: string;
  data?: CategoryModel | CategoryModel[] | null;
};

export {
  CategoryUpdateInput,
  CategoryResponse,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  CategoryServiceResponse,
};
