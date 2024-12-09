import categoryService from "../../components/category/category.service";
import { Category } from "@prisma/client";
import httpStatus from "http-status";
import { CategoryServiceResponse } from "../../components/category/category.response";

jest.mock("../../components/category/category.service", () => ({
  getAllCategories: jest.fn(),
  getCategory: jest.fn(),
  createCategory: jest.fn<Promise<CategoryServiceResponse>, [string, string]>(),
  updateCategory: jest.fn(),
  deleteCategory: jest.fn(),
}));

const mockCategories: Category[] = [
  {
    id: "1",
    name: "test-name-1",
    description: "test-description-1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "test-name-2",
    description: "test-description-2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const mockCategory = mockCategories[0];

describe("Category Service Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("createCategory", () => {
    it("should create a product", async () => {
      const newCategory = {
        name: "test-name-2",
        description: "test-description-2",
      };

      (categoryService.createCategory as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.CREATED,
        message: "Category created successfully",
        data: { ...mockCategories[0], ...newCategory },
      } as CategoryServiceResponse);

      const result: any = await categoryService.createCategory(
        newCategory.name,
        newCategory.description
      );
      expect(result.status).toBe("success");
      expect(result.statusCode).toBe(httpStatus.CREATED);
      expect(result.message).toBe("Category created successfully");
      expect(result.data).toEqual({ ...mockCategories[0], ...newCategory });
    });
  });
  describe("getAllCategories", () => {
    it("should get all categories", async () => {
      (categoryService.getAllCategories as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        data: mockCategories,
      });
      const result =
        (await categoryService.getAllCategories()) as CategoryServiceResponse;
      expect(result.status).toBe("success");
      expect(result.statusCode).toBe(httpStatus.OK);
      expect(result.data).toEqual(mockCategories);
    });
    it("should handle failure when getting all categories", async () => {
      (categoryService.getAllCategories as jest.Mock).mockResolvedValue({
        status: "error",
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
      });

      const result = await categoryService.getAllCategories();

      expect(result.status).toBe("error");
      expect(result.statusCode).toBe(httpStatus.INTERNAL_SERVER_ERROR);
      expect(result.message).toBe("Internal Server Error");
    });
  });
  describe("getCategory", () => {
    it("should get a single category", async () => {
      (categoryService.getCategory as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        data: mockCategory,
      });
      const result = (await categoryService.getCategory(
        "1"
      )) as CategoryServiceResponse;

      expect(result.status).toBe("success");
      expect(result.statusCode).toBe(httpStatus.OK);
      expect(result.data).toEqual(mockCategory);
    });
  });
  describe("updateCategory", () => {
    it("should update the category", async () => {
      const updatedData = { name: "Updated category" };
      (categoryService.updateCategory as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        data: { ...mockCategories[0], ...updatedData },
      });
      const updatedCategory = (await categoryService.updateCategory(
        "1",
        updatedData
      )) as CategoryServiceResponse;
      expect(updatedCategory.status).toBe("success");
      expect(updatedCategory.statusCode).toEqual(httpStatus.OK);
      expect(updatedCategory.data).toEqual({
        ...mockCategories[0],
        ...updatedData,
      });
    });
  });
  describe("deleteCategory", () => {
    it("should delete a category", async () => {
      (categoryService.deleteCategory as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        message: "Category deleted successfully",
      });
      const result = (await categoryService.deleteCategory(
        "1"
      )) as CategoryServiceResponse;
      expect(result.status).toBe("success");
      expect(result.statusCode).toBe(httpStatus.OK);
      expect(result.message).toEqual("Category deleted successfully");
    });
  });
});
