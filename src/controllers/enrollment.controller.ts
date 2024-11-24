import { Request, Response } from "express";
import enrollmentService from "../service/enrollment.service";
import { EnrollmentServiceResponse } from "../types/ResponseTypes";

export const enrollmentController = {
  // Get all enrollments
  async getAllEnrollments(req: Request, res: Response): Promise<Response> {
    try {
      const response: EnrollmentServiceResponse | any =
        await enrollmentService.getAllEnrollments();
      return res.status(response.statusCode).send(response);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      return res.status(500).json({ status: "error", message: "Server error" });
    }
  },

  // Get a single enrollment by ID
  async getEnrollment(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const response: EnrollmentServiceResponse | any =
        await enrollmentService.getEnrollment(id);
      return res.status(response.statusCode).send(response);
    } catch (error) {
      console.error("Error fetching enrollment:", error);
      return res.status(500).json({ status: "error", message: "Server error" });
    }
  },

  // Create a new enrollment
  async createEnrollment(req: Request, res: Response): Promise<Response> {
    try {
      const { studentId, courseId, enrollmentDate, status } = req.body;
      const response: EnrollmentServiceResponse | any =
        await enrollmentService.createEnrollment(
          studentId,
          courseId,
          new Date(enrollmentDate),
          status
        );
      return res.status(response.statusCode).send(response);
    } catch (error) {
      console.error("Error creating enrollment:", error);
      return res.status(500).json({ status: "error", message: "Server error" });
    }
  },

  // Update an enrollment by ID
  async updateEnrollment(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const response: EnrollmentServiceResponse | any =
        await enrollmentService.updateEnrollment(id, status);
      return res.status(response.statusCode).send(response);
    } catch (error) {
      console.error("Error updating enrollment:", error);
      return res.status(500).json({ status: "error", message: "Server error" });
    }
  },

  // Delete an enrollment by ID
  async deleteEnrollment(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const response: EnrollmentServiceResponse | any =
        await enrollmentService.deleteEnrollment(id);

      return res.status(response.statusCode).send(response);
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      return res.status(500).json({ status: "error", message: "Server error" });
    }
  },
};
