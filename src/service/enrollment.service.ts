import { EnrollmentStatus } from "@prisma/client";
import enrollmentRepository from "../repositories/enrollment.repository";
import {
  CreateEnrollmentResponse,
  DeleteEnrollmentResponse,
  GetEnrollmentResponse,
} from "../types/ResponseTypes";
import {
  defaultError,
  doesNotExistError,
  noDuplicateError,
} from "../error/error";
import httpStatus from "http-status";
import { EnrollmentDocument, EnrollmentUpdateInput } from "../types/DBTypes";

class EnrollmentService {
  // Fetch all enrollments
  async getAllEnrollments(): Promise<{
    status: string;
    error?: boolean;
    statusCode?: number;
    message: string;
    data?: EnrollmentDocument[];
  }> {
    try {
      const enrollments = await enrollmentRepository.findAll();
      if (!enrollments || enrollments.length === 0) {
        return { status: "error", message: "No enrollments found." };
      }

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Enrollments retrieved successfully",
        data: enrollments,
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }

  // Fetch a single enrollment by ID
  async getEnrollment(
    id: string
  ): Promise<GetEnrollmentResponse | typeof doesNotExistError> {
    try {
      const enrollment = await enrollmentRepository.findById(id);
      if (!enrollment) return doesNotExistError;

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "User retrieved successfully",
        data: enrollment,
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }

  // Create a new enrollment
  async createEnrollment(
    studentId: string,
    courseId: string,
    enrollmentDate: Date,
    status: EnrollmentStatus
  ): Promise<
    CreateEnrollmentResponse | typeof noDuplicateError | typeof defaultError
  > {
    try {
      const enrollment = await enrollmentRepository.create({
        studentId,
        courseId,
        enrollmentDate,
        status,
      });
      if (!enrollment) return defaultError;

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.CREATED,
        message: "Enrollment successful",
        data: {
          id: enrollment.id,
          enrollmentDate: enrollment.enrollmentDate,
          status: enrollment.status,
          student: enrollment.student
            ? {
                id: enrollment.student.id,
                fullName: enrollment.student.fullName,
                major: enrollment.student.major,
              }
            : null,
          course: enrollment.course
            ? {
                id: enrollment.course.id,
                courseName: enrollment.course.courseName,
                courseDescription: enrollment.course.courseDescription,
              }
            : null,
        },
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }

  // Update an existing enrollment
  async updateEnrollment(
    id: string,
    status: EnrollmentUpdateInput
  ): Promise<
    | {
        status: string;
        error: boolean;
        statusCode: number;
        message: string;
        data?: EnrollmentDocument;
      }
    | { status: string; message: string }
  > {
    try {
      const enrollment = await enrollmentRepository.findById(id);

      if (!enrollment) {
        return {
          status: "error",
          statusCode: httpStatus.NOT_FOUND,
          message: "No enrollment found.",
        };
      }
      const updatedEnrollment = await enrollmentRepository.update(id, status);

      if (!updatedEnrollment) {
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
        message: "Enrollment updated successfully",
        data: updatedEnrollment,
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }

  // Delete an enrollment by ID
  async deleteEnrollment(
    id: string
  ): Promise<DeleteEnrollmentResponse | typeof doesNotExistError> {
    try {
      const enrollment = await enrollmentRepository.delete(id);
      if (!enrollment) return doesNotExistError;

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Enrollment deleted successfully",
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }
}
export default new EnrollmentService();
