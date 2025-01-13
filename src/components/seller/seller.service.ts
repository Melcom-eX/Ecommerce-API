// src/services/seller.service.ts
import { PrismaClient } from "@prisma/client";
import { CreateSellerDto } from "./seller.validation";
import createError from "http-errors";
import { SellerResponse } from "./seller.response";

const prisma = new PrismaClient();

class SellerService {
  async createSeller(
    userId: string,
    dto: CreateSellerDto
  ): Promise<SellerResponse> {
    try {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        console.log(`User with ID ${userId} not found`);
        throw createError(404, "User not found");
      }

      if (user.role === "SELLER") {
        throw createError(400, "User is already a seller");
      }

      // Use transaction to ensure both operations succeed or fail together
      const seller = await prisma.$transaction(async (tx) => {
        // Create new seller profile
        const newSeller = await tx.seller.create({
          data: {
            businessName: dto.businessName,
            description: dto.description,
            businessAddress: dto.businessAddress,
            sellerType: dto.sellerType,
            taxId: dto.taxId,
            bankAccount: dto.bankAccount,
            businessPhone: dto.businessPhone,
            businessEmail: dto.businessEmail,
            logo: dto.logo,
            user: {
              connect: { id: userId },
            },
          },
        });

        // Update user role to SELLER
        await tx.user.update({
          where: { id: userId },
          data: { role: "SELLER" },
        });

        return newSeller;
      });

      return {
        id: seller.id,
        businessName: seller.businessName,
        description: seller.description,
        businessAddress: seller.businessAddress,
        sellerType: seller.sellerType,
        businessPhone: seller.businessPhone,
        businessEmail: seller.businessEmail,
        logo: seller.logo,
        rating: seller.rating,
        totalSales: seller.totalSales,
        isVerified: seller.isVerified,
        createdAt: seller.createdAt,
      };
    } catch (error) {
      console.error("Error creating seller:", error);
      throw error;
    }
  }
}

export const sellerService = new SellerService();
