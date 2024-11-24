import { Request, Response } from "express";
import { courseService } from "../service/course.service";
import { CourseServiceResponse } from "../types/ResponseTypes";

class CourseController {
  async createCourse(req: Request, res: Response): Promise<Response> {
    const { courseName, courseDescription, credits, department } = req.body;
    try {
      const response: CourseServiceResponse | any =
        await courseService.createCourse(
          courseName,
          courseDescription,
          credits,
          department
        );
      return res.status(response.statusCode).send(response);
    } catch (error) {
      console.error("Create course error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getCourseById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const response: CourseServiceResponse | any =
        await courseService.getCourseById(id);
      return res.status(response.statusCode).send(response);
    } catch (error) {
      console.error("Get course error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllCourses(req: Request, res: Response): Promise<Response> {
    try {
      const response: CourseServiceResponse | any =
        await courseService.getAllCourses();
      return res.status(response.statusCode).send(response);
    } catch (error) {
      console.error("Get courses error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateCourse(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const courseData = req.body;
    try {
      const response: CourseServiceResponse | any =
        await courseService.updateCourse(id, courseData);
      return res.status(response.statusCode).send(response);
    } catch (error) {
      console.error("Update course error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteCourse(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const response: CourseServiceResponse | any =
        await courseService.deleteCourse(id);

      return res.status(response.statusCode).send(response);
    } catch (error) {
      console.error("Delete error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export const courseController = new CourseController();
