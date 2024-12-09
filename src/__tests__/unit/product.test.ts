import productService from "../../components/product/product.service";
import { Product } from "@prisma/client";
import httpStatus from "http-status";
import { ProductServiceResponse } from "../../components/product/product.response";

jest.mock("../../components/product/product.repository");
jest.mock("../../utils/cloudinary");

// Mock the productService methods
jest.mock("../../components/product/product.service", () => ({
  createProduct: jest.fn(),
  getAllProducts: jest.fn(),
  getProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
  findProductsByCategory: jest.fn(),
  uploadImages: jest.fn(),
}));

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Product 1",
    description: "Description 1",
    price: 10,
    stock: 100,
    images: ["image1.jpg"],
    categoryId: "1",
    sellerId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Product 2",
    description: "Description 2",
    price: 10,
    stock: 100,
    images: ["image1.jpg"],
    categoryId: "2",
    sellerId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const mockProduct = mockProducts[0];

describe("Product Service Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createProduct", () => {
    it("should create a product", async () => {
      const newProduct: Partial<Product> = {
        name: "Test Product",
        description: "Test Description",
        price: 100,
        stock: 50,
        images: ["image1.jpg", "image2.jpg"],
        categoryId: "1",
        sellerId: "1",
      };

      (productService.createProduct as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.CREATED,
        message: "Product created successfully",
        data: { ...mockProducts[0], ...newProduct },
      });

      const result = await productService.createProduct(
        newProduct.name!,
        newProduct.description!,
        newProduct.price!,
        newProduct.stock!,
        newProduct.images!,
        newProduct.categoryId!,
        newProduct.sellerId!
      );

      expect(result.status).toBe("success");
      expect(result.statusCode).toBe(httpStatus.CREATED);
      expect(result.message).toBe("Product created successfully");
      expect(result.data).toEqual({ ...mockProducts[0], ...newProduct });
    });
  });

  describe("getAllProducts", () => {
    it("should get all products", async () => {
      (productService.getAllProducts as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        message: "Products retrieved successfully",
        data: mockProducts,
      });

      const result = await productService.getAllProducts();

      expect(result.status).toBe("success");
      expect(result.data).toEqual(mockProducts);
    });
  });

  describe("getProduct", () => {
    it("should get a product by id", async () => {
      (productService.getProduct as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        message: "Product retrieved successfully",
        data: mockProducts[0],
      });

      const product = await productService.getProduct("1");

      expect(product.status).toBe("success");
      expect(product.data).toEqual(mockProducts[0]);
    });
  });

  describe("updateProduct", () => {
    it("should update a product", async () => {
      const updateData = { name: "Updated Product" };
      (productService.updateProduct as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        message: "Product updated successfully",
        data: { ...mockProducts[0], ...updateData },
      });

      const updatedProduct = await productService.updateProduct(
        "1",
        updateData
      );

      expect(updatedProduct.status).toBe("success");
      expect(updatedProduct.data).toEqual({
        ...mockProducts[0],
        ...updateData,
      });
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product", async () => {
      (productService.deleteProduct as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        message: "Product deleted successfully",
      });

      const deletedProduct = await productService.deleteProduct("1");

      expect(deletedProduct.status).toBe("success");
      expect(deletedProduct.message).toBe("Product deleted successfully");
    });
  });

  describe("findProductsByCategory", () => {
    it("should find products by category", async () => {
      (productService.findProductsByCategory as jest.Mock).mockResolvedValue({
        status: "success",
        statusCode: httpStatus.OK,
        message: "Products retrieved successfully",
        data: mockProducts,
      });

      const products = await productService.findProductsByCategory("1");

      expect(products.status).toBe("success");
      expect(products.data).toEqual(mockProducts);
    });
  });

  describe("uploadImages", () => {
    it("should upload images successfully", async () => {
      const files = [
        {
          path: "test-image1.jpg",
        } as Express.Multer.File,
      ];
      (productService.uploadImages as jest.Mock).mockResolvedValue({
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Product images uploaded and saved successfully",
        data: { urls: ["test-url"] },
      });

      const result = await productService.uploadImages("1", files);

      expect(result.status).toBe("success");
      expect(result.data?.urls).toEqual(["test-url"]);
    });
  });
});
describe("updateProduct", () => {
  it("should update a product successfully", async () => {
    const updatedProductData = {
      name: "Updated Product Name",
      description: "Updated Product Description",
      category: "1",
      price: 99.99,
    };

    (productService.updateProduct as jest.Mock).mockResolvedValue({
      status: "success",
      statusCode: httpStatus.OK,
      message: "Product updated successfully",
      data: { ...mockProduct, ...updatedProductData },
    });

    const updatedProduct = await productService.updateProduct(
      "1",
      updatedProductData
    );

    expect(updatedProduct.status).toBe("success");
    expect(updatedProduct.data).toEqual({
      ...mockProduct,
      ...updatedProductData,
    });
  });
});

describe("getProduct", () => {
  it("should get a product by ID", async () => {
    (productService.getProduct as jest.Mock).mockResolvedValue({
      status: "success",
      statusCode: httpStatus.OK,
      message: "Product retrieved successfully",
      data: mockProduct,
    });

    const product = await productService.getProduct("1");

    expect(product.status).toBe("success");
    expect(product.data).toEqual(mockProduct);
  });
});
describe("getAllProducts", () => {
  it("should get all products", async () => {
    (productService.getAllProducts as jest.Mock).mockResolvedValue({
      status: "success",
      statusCode: httpStatus.OK,
      message: "Products retrieved successfully",
      data: [mockProduct],
    });

    const products = await productService.getAllProducts();

    expect(products.status).toBe("success");
    expect(products.data).toEqual([mockProduct]);
  });
});
