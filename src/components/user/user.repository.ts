import { PrismaClient, User as PrismaUser, Role } from "@prisma/client";
const prisma = new PrismaClient();
import { UserDocument, UserUpdateInput } from "./user.response";

// Define the interface for the user data

class UserRepository {
  // Find all users
  async findAll(): Promise<UserDocument[]> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        phone: true,
        wallet: true,
        dateOfBirth: true,
        profile: true,
        balance: true,
        createdAt: true,
        address: true,
        active: true,
        isBlocked: true,
        isVerified: true,
        role: true,
        cartId: true,
        // Exclude password
      },
    });
    return users as UserDocument[];
  }

  // Find user by ID
  async findById(id: string): Promise<UserDocument | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        phone: true,
        wallet: true,
        dateOfBirth: true,
        profile: true,
        balance: true,
        createdAt: true,
        address: true,
        active: true,
        isBlocked: true,
        isVerified: true,
        role: true,
        cartId: true,
        // Exclude password
      },
    });
    return user as UserDocument | null;
  }

  // Create a new user
  async createUser({
    username,
    password,
    email,
    role,
    wallet,
  }: {
    username: string;
    password: string;
    email: string;
    role: Role;
    wallet: number;
  }): Promise<UserDocument> {
    const user = await prisma.user.create({
      data: {
        username,
        password,
        email,
        role,
        wallet,
      },
    });

    return user as UserDocument;
  }

  // Update a user by ID, including nested enrollments
  async update(
    id: string,
    updatedUser: Partial<UserUpdateInput>
  ): Promise<UserDocument | null> {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...updatedUser,
      },
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        phone: true,
        wallet: true,
        dateOfBirth: true,
        profile: true,
        balance: true,
        createdAt: true,
        address: true,
        active: true,
        isBlocked: true,
        isVerified: true,
        role: true,
      },
    });
    return updated as UserDocument;
  }

  // Delete a user by ID
  async delete(id: string): Promise<UserDocument | null> {
    const user = await prisma.user.delete({
      where: { id },
    });
    return user as UserDocument;
  }

  // Find user by email
  async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user as UserDocument | null;
  }
  async findByUsername(username: string): Promise<UserDocument | null> {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user as UserDocument | null;
  }
  async findOTP(userId: string): Promise<UserDocument | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { otp: true, otpExpiration: true },
    });
    return user as UserDocument | null;
  }

  async newsLetter(email: string): Promise<any> {
    const user = await prisma.email.create({
      data: {
        email,
      },
    });
    return user;
  }
}

export default new UserRepository();
