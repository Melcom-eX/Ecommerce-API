import { Errors } from "../../error/error";
import httpStatus from "http-status";
import adminRepository from "./admin.repository";
import {
  ApproveProduct,
  BlockUser,
  DeleteUser,
  UnblockUser,
} from "./admin.response";
import userRepository from "../user/user.repository";
import productRepository from "../product/product.repository";
import { ProductServiceResponse } from "../product/product.response";
import { Product } from "@prisma/client";

/**
this is the service layer for the admin component. It contains the business logic for the admin component.
 
 */

class AdminService {
  async blockUser(id: string): Promise<BlockUser | typeof Errors.doesNotExist> {
    try {
      const user = await adminRepository.blockUser(id);
      if (!user) return Errors.doesNotExist;
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "User blocked successfully",
        data: {
          id: user.id,
          isBlocked: user.isBlocked,
        },
      };
    } catch (error) {
      console.error(error);
      return Errors.defaultError;
    }
  }
  async unblockUser(
    id: string
  ): Promise<UnblockUser | typeof Errors.doesNotExist> {
    try {
      const user = await adminRepository.unblockUser(id);
      if (!user) return Errors.doesNotExist;
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "User unblocked successfully",
        data: {
          id: user.id,
          isBlocked: user.isBlocked,
        },
      };
    } catch (error) {
      console.error(error);
      return Errors.defaultError;
    }
  }
  async deleteUser(
    id: string
  ): Promise<DeleteUser | typeof Errors.doesNotExist> {
    try {
      const user = await userRepository.delete(id);
      if (!user) return Errors.doesNotExist;
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "User deleted successfully",
      };
    } catch (error) {
      console.error(error);
      return Errors.defaultError;
    }
  }

  async approveProduct(
    id: string
  ): Promise<ApproveProduct | typeof Errors.doesNotExist> {
    try {
      const product = await adminRepository.approveProduct(id);
      if (!product) return Errors.doesNotExist;
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Product approved successfully",
        data: {
          id: product.id,
          isApproved: product.isApproved,
        },
      };
    } catch (error) {
      console.error(error);
      return Errors.defaultError;
    }
  }

  async getAllProducts(): Promise<ProductServiceResponse> {
    try {
      const products: Product[] = await productRepository.findAllAdmin();
      return {
        status: "success",
        statusCode: httpStatus.OK,
        message: "Products retrieved successfully",
        data: products,
      };
    } catch (error) {
      console.error(error);
      return Errors.defaultError;
    }
  }
}

export default new AdminService();
