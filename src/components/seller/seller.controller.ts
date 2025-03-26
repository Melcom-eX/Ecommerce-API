// src/controllers/seller.controller.ts
import { Request, Response } from "express";
import { sellerService } from "./seller.service";
import { CreateSellerDto } from "./seller.validation";

class SellerController {
  async createSeller(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          status: false,
          message: "User not authenticated",
          data: null,
        });
      }

      const seller = await sellerService.createSeller(
        userId,
        req.body as CreateSellerDto
      );

      return res.status(201).json({
        status: true,
        message: "Seller account created successfully",
        data: seller,
      });
    } catch (error: any) {
      return res.status(error.status || 500).json({
        status: false,
        message: error.message || "Internal server error",
        data: null,
      });
    }
  }
  async getSellerById(req: Request, res: Response) {
    try {
      const sellerId = req.params.id;

      const seller = await sellerService.findById(sellerId);

      if (!seller) {
        return res.status(404).json({
          status: false,
          message: "Seller not found",
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Seller retrieved successfully",
        data: seller,
      });
    } catch (error: any) {
      return res.status(error.status || 500).json({
        status: false,
        message: error.message || "Internal server error",
        data: null,
      });
    }
  }
  async getAllSellers(req: Request, res: Response) {
    try {
      const sellers = await sellerService.findAll();

      return res.status(200).json({
        status: true,
        message: "Sellers retrieved successfully",
        data: sellers,
      });
    } catch (error: any) {
      return res.status(error.status || 500).json({
        status: false,
        message: error.message || "Internal server error",
        data: null,
      });
    }
  }
}

export const sellerController = new SellerController();
