import { User as PrismaUser, Role } from "@prisma/client";
interface UserDocument extends PrismaUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  phoneNumber: string;
  enrollmentDate: Date;
  major: string;
  isVerified: boolean;
  role: Role;
}

interface UserUpdateInput {
  fullName?: string;
  email?: string;
  password?: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
  enrollmentDate?: Date;
  otp?: string | null;
  otpExpiration?: Date | null;
  major?: string;
  isVerified?: boolean;
  role?: Role;
}
type LoginResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  data: { username: string; id: string };
  token?: string;
};
type User = {
  username: string;
  email: string;
};
type CreateUserResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  data: {
    id: string;
    fullName: string;
    email: string;
    major: string;
    role: string;
  };
};

type DeleteUserResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
};

type GetUserResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
  data?: UserDocument | null;
};

type UserServiceResponse = {
  status: string;
  statusCode: number;
  message?: string;
  data?: any;
  error?: boolean;
};

export {
  UserDocument,
  UserUpdateInput,
  UserServiceResponse,
  GetUserResponse,
  DeleteUserResponse,
  CreateUserResponse,
  LoginResponse,
  User,
};
