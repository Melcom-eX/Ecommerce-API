import { Request, Response } from "express";
import adminService from "./admin.service";

class AdminController {
  async blockUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const response = await adminService.blockUser(id);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Block user error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async unblockUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const response = await adminService.unblockUser(id);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Unblock user error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const response = await adminService.deleteUser(id);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Delete user error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async approveProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const response = await adminService.approveProduct(id);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Approve product error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async approveSeller(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const response = await adminService.approveSeller(id, status);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Approve seller error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const response = await adminService.getAllProducts();
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get products error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new AdminController();
