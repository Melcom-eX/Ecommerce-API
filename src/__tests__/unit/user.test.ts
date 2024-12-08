jest.mock("../../components/user/user.service");
jest.mock("../../components/user/user.repository");

import userService from "../../components/user/user.service";
import { UserDocument } from "../../components/user/user.response";

describe("User Service Tests", () => {
  let userId: string;
  let user: UserDocument;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    userId = "test-user-id";
    user = {
      id: userId,
      fullName: "Test User",
      username: "testuser",
      email: "testuser@example.com",
      phone: "1234567890",
      wallet: 100,
      dateOfBirth: new Date(),
      profile: "test-profile-url",
      address: "123 Test St",
      role: "USER",
      active: true,
      isBlocked: false,
      isVerified: true,
      createdAt: new Date(),
      balance: 0,
      password: "test-password",
      otp: null,
      otpExpiration: null,
    };
  });

  describe("getUser", () => {
    it("should get a user by id", async () => {
      (userService.getUser as jest.Mock).mockResolvedValue({
        status: "success",
        error: false,
        statusCode: 200,
        message: "User retrieved successfully",
        data: user,
      });

      const result = await userService.getUser(userId);

      expect(result.status).toBe("success");
      if ("data" in result) {
        expect(result.data).toEqual(user);
      }
    });
  });

  describe("uploadProfile", () => {
    it("should upload a user profile", async () => {
      const file = {
        fieldname: "profile",
        originalname: "test.jpg",
        encoding: "7bit",
        mimetype: "image/jpeg",
        buffer: Buffer.from("test file content"),
        size: 123,
      } as Express.Multer.File;

      (userService.uploadProfile as jest.Mock).mockResolvedValue({
        status: "success",
        error: false,
        statusCode: 200,
        message: "Profile image uploaded and saved successfully",
        data: { url: "test-profile-url" },
      });

      const result = await userService.uploadProfile(userId, file);

      expect(result.status).toBe("success");
      expect(result.data?.url).toBe("test-profile-url");
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      const updateData = { fullName: "Updated User" };
      (userService.updateUser as jest.Mock).mockResolvedValue({
        status: "success",
        error: false,
        statusCode: 200,
        message: "User updated successfully",
        data: { ...user, ...updateData },
      });

      const result = await userService.updateUser(userId, updateData);

      expect(result.status).toBe("success");
      if ("data" in result && result.data) {
        expect(result.data.fullName).toBe("Updated User");
      }
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      (userService.deleteUser as jest.Mock).mockResolvedValue({
        status: "success",
        error: false,
        statusCode: 200,
        message: "User deleted successfully",
      });

      const result = await userService.deleteUser(userId);

      expect(result.status).toBe("success");
    });
  });

  describe("getAllUsers", () => {
    it("should get all users", async () => {
      (userService.getAllUsers as jest.Mock).mockResolvedValue({
        status: "success",
        error: false,
        statusCode: 200,
        message: "Users retrieved successfully",
        data: [user],
      });

      const result = await userService.getAllUsers();

      expect(result.status).toBe("success");
      expect(result.data).toEqual([user]);
    });
  });
});
