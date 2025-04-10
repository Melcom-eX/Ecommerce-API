import { User as PrismaUser, Role } from "@prisma/client";
interface UserDocument extends PrismaUser {
  id: string;
  fullName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  wallet: number;
  dateOfBirth: Date;
  address: string;
  profile: string;
  balance: number;
  active: boolean;
  isBlocked: boolean;
  isVerified: boolean;
  role: Role;
  createdAt: Date;
  cart: string;
}

interface UserUpdateInput {
  fullName?: string;
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
  wallet?: number;
  dateOfBirth?: Date;
  address?: string;
  profile?: string;
  balance?: number;
  active?: boolean;
  isBlocked?: boolean;
  isVerified?: boolean;
  role?: Role;
  cartId?: string;
}

type LoginResponse = {
  status: string;
  error: boolean;
  statusCode: number;
  data: { email: string; id: string };
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
    username: string;
    email: string;
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
