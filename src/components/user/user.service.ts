import jwt from "jsonwebtoken";
import { comparePassword, encrypt } from "../../utils/encryption";
import { Errors } from "../../error/error";
import httpStatus from "http-status";
import userRepository from "./user.repository";
import {
  LoginResponse,
  CreateUserResponse,
  DeleteUserResponse,
  GetUserResponse,
  User,
} from "./user.response";
import { Role } from "@prisma/client";
import { UserDocument, UserUpdateInput } from "./user.response";
import { logger } from "../../utils/logger";
import { generateWalletId } from "../../utils/wallet";
import cloudinary from "../../utils/cloudinary";

/**
this is the service layer for the user component. It contains the business logic for the admin component.
 
 */

class UserService {
  async loginUser(
    email: string,
    password: string
  ): Promise<
    | LoginResponse
    | typeof Errors.doesNotExist
    | typeof Errors.passwordMismatch
    | typeof Errors.defaultError
  > {
    try {
      const user = (await userRepository.findByEmail(email)) as UserDocument;
      if (!user) return Errors.doesNotExist;
      // const hashedPassword = await encrypt(password);
      const trimmedPassword = password.trim().toLowerCase();

      const isPasswordCorrect = await comparePassword(
        trimmedPassword,
        user.password
      );

      if (!isPasswordCorrect) return Errors.passwordMismatch;

      let { password: userPassword, ...userWithoutPassword } = user;
      const payload = {
        ...userWithoutPassword, // Spread the rest of the user properties
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_LIFETIME,
      });

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        data: { email: user.email, id: user.id }, // Ensure _id is a string
        token,
      };
    } catch (error) {
      console.error(error);
      return Errors.defaultError;
    }
  }

  async createUser(
    username: string,
    password: string,
    email: string
  ): Promise<
    CreateUserResponse | typeof Errors.noDuplicate | typeof Errors.defaultError
  > {
    try {
      const existingUser = await userRepository.findByEmail(email);
      if (existingUser) return Errors.noDuplicate;
      const trimmedPassword = password.trim().toLowerCase();
      const wallet = generateWalletId();

      const hashedPassword = await encrypt(trimmedPassword);

      const user = await userRepository.createUser({
        username,
        password: hashedPassword,
        email,
        wallet,
      });

      if (!user) return Errors.defaultError;

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.CREATED,
        message: "Signup successful, OTP sent to your email",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      console.error(error);

      return Errors.defaultError;
    }
  }

  async deleteUser(
    id: string
  ): Promise<DeleteUserResponse | typeof Errors.doesNotExist> {
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

  async getAllUsers(): Promise<{
    status: string;
    error?: boolean;
    statusCode?: number;
    message: string;
    data?: UserDocument[];
  }> {
    try {
      const users = await userRepository.findAll();
      if (!users || users.length === 0) {
        return { status: "error", message: "No users found." };
      }

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Users retrieved successfully",
        data: users,
      };
    } catch (error) {
      console.error(error);
      return Errors.defaultError;
    }
  }

  async getUser(
    id: string
  ): Promise<GetUserResponse | typeof Errors.doesNotExist> {
    try {
      const user = await userRepository.findById(id);
      if (!user) return Errors.doesNotExist;

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "User retrieved successfully",
        data: user,
      };
    } catch (error) {
      console.error(error);
      return Errors.defaultError;
    }
  }

  async updateUser(
    id: string,
    updateData: Partial<UserUpdateInput>
  ): Promise<
    | {
        status: string;
        error: boolean;
        statusCode: number;
        message: string;
        data?: UserDocument;
      }
    | { status: string; message: string }
  > {
    try {
      const user = await userRepository.findById(id);

      if (!user) {
        return {
          status: "error",
          statusCode: httpStatus.NOT_FOUND,
          message: "No user found.",
        };
      }

      const updatedUser = await userRepository.update(id, updateData);

      if (!updatedUser) {
        return {
          status: "error",
          statusCode: httpStatus.BAD_REQUEST,
          message: "Failed to update user.",
        };
      }

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "User updated successfully",
        data: updatedUser,
      };
    } catch (error) {
      console.error(error);
      return Errors.defaultError;
    }
  }

  async validateOTP(
    userId: string,
    inputOTP: string
  ): Promise<
    | {
        status: string;
        error: boolean;
        statusCode: number;
        message: string;
        data?: UserDocument;
      }
    | { status: string; message: string }
  > {
    try {
      const user = await userRepository.findOTP(userId);

      if (!user) {
        throw new Error("OTP not found");
      }

      const isOTPValid =
        user.otp === inputOTP &&
        user.otpExpiration !== null &&
        new Date() < new Date(user.otpExpiration);

      if (!isOTPValid) {
        return {
          status: "error",
          statusCode: httpStatus.BAD_REQUEST,
          message: "Failed to validate OTP.",
        };
      }

      let data = { otp: null, otpExpiration: null, isVerified: true };
      // Clear the OTP after successful validation
      await userRepository.update(userId, data);
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "OTP Validted successfully",
      };
    } catch (error) {
      console.error(`Error validating OTP for user ${userId}:`, error);
      return Errors.defaultError;
    }
  }

  async updatePassword(
    id: string,
    newPassword: string
  ): Promise<
    | {
        status: string;
        error: boolean;
        statusCode: number;
        message: string;
        data?: UserDocument;
      }
    | { status: string; message: string }
  > {
    try {
      const user = await userRepository.findById(id);

      if (!user) {
        return {
          status: "error",
          statusCode: httpStatus.NOT_FOUND,
          message: "No user found.",
        };
      }

      // Hash the new password
      const trimmedPassword = newPassword.trim().toLowerCase();
      const hashedPassword = await encrypt(trimmedPassword);

      const data = { password: hashedPassword };

      const updatedUser = await userRepository.update(id, data);

      if (!updatedUser) {
        return {
          status: "error",
          statusCode: httpStatus.BAD_REQUEST,
          message: "Failed to update user.",
        };
      }

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "User updated successfully",
        data: updatedUser,
      };
    } catch (error) {
      console.error(error);
      return Errors.defaultError;
    }
  }
  async uploadProfile(
    userId: string,
    file: Express.Multer.File
  ): Promise<{
    status: string;
    error: boolean;
    statusCode: number;
    message: string;
    data?: { url: string };
  }> {
    try {
      if (!file) {
        return {
          status: "error",
          error: true,
          statusCode: httpStatus.BAD_REQUEST,
          message: "No file uploaded",
        };
      }

      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "profiles",
        width: 150,
        height: 150,
        crop: "fill",
      });

      // Store the URL in the database and associate it with the user
      const updatedUser = await userRepository.update(userId, {
        profile: result.secure_url, // Save the Cloudinary URL to the 'profile' field
      });

      if (!updatedUser) {
        return {
          status: "error",
          error: true,
          statusCode: httpStatus.BAD_REQUEST,
          message: "Failed to update user profile",
        };
      }

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Profile image uploaded and saved successfully",
        data: {
          url: result.secure_url,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        error: true,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Error uploading profile image",
      };
    }
  }
}

export default new UserService();
