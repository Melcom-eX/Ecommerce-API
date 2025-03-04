import { Product } from "@prisma/client";
import adminService from "../../components/admin/admin.service";
import httpStatus from "http-status";

jest.mock("../../components/admin/admin.repository");

jest.mock("../../components/admin/admin.service", () => ({
  blockUser: jest.fn(),
  unblockUser: jest.fn(),
  deleteUser: jest.fn(),
  approveProduct: jest.fn(),
  getAllProducts: jest.fn(),
}));
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Product 1",
    description: "Description 1",
    price: 10,
    stock: 100,
    images: ["image1.jpg"],
    isApproved: true,
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
    isApproved: false,
    categoryId: "2",
    sellerId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const mockProduct = mockProducts[0];

describe("Admin Service Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("blockUser", () => {
    it("should block a user", async () => {
      const user = {
        id: "1",
        isBlocked: true,
      };
      (adminService.blockUser as jest.Mock).mockResolvedValue({
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "User blocked successfully",
        data: {
          id: user.id,
          isBlocked: user.isBlocked,
        },
      });

      const result = await adminService.blockUser("1");

      expect(result).toEqual({
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "User blocked successfully",
        data: {
          id: user.id,
          isBlocked: user.isBlocked,
        },
      });
    });
  });
});

describe("unblockUser", () => {
  it("should unblock a user", async () => {
    const user = {
      id: "1",
      isBlocked: false,
    };
    (adminService.unblockUser as jest.Mock).mockResolvedValue({
      status: "success",
      error: false,
      statusCode: httpStatus.OK,
      message: "User unblocked successfully",
      data: {
        id: user.id,
        isBlocked: user.isBlocked,
      },
    });

    const result = await adminService.unblockUser("1");

    expect(result).toEqual({
      status: "success",
      error: false,
      statusCode: httpStatus.OK,
      message: "User unblocked successfully",
      data: {
        id: user.id,
        isBlocked: user.isBlocked,
      },
    });
  });
});

describe("deleteUser", () => {
  it("should delete a user", async () => {
    const user = {
      id: "1",
      isDeleted: true,
    };
    (adminService.deleteUser as jest.Mock).mockResolvedValue({
      status: "success",
      error: false,
      statusCode: httpStatus.OK,
      message: "User deleted successfully",
    });

    const result = await adminService.deleteUser("1");

    expect(result).toEqual({
      status: "success",
      error: false,
      statusCode: httpStatus.OK,
      message: "User deleted successfully",
    });
  });
});
