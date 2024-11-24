import courseRepository from "../repositories/course.repository";
import { Course } from "@prisma/client";
import {
  CreateCourseResponse,
  DeleteCourseResponse,
  GetCourseResponse,
} from "../types/ResponseTypes";
import {
  defaultError,
  doesNotExistError,
  noDuplicateError,
} from "../error/error";
import httpStatus from "http-status";
import { courseDocument, courseUpdateInput } from "../types/DBTypes";

class CourseService {
  async createCourse(
    courseName: string,
    courseDescription: string,
    credits: number,
    department: string
  ): Promise<CreateCourseResponse | typeof defaultError> {
    try {
      const course = await courseRepository.create({
        courseName,
        courseDescription,
        credits,
        department,
      });
      if (!course) return defaultError;

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.CREATED,
        message: "Course Creation successful",
        data: {
          id: course.id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          credits: course.credits,
          department: course.department,
        },
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }

  async getCourseById(
    id: string
  ): Promise<GetCourseResponse | typeof doesNotExistError> {
    try {
      const course = await courseRepository.findById(id);
      if (!course) return doesNotExistError;

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Course retrieved successfully",
        data: course,
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }

  async getAllCourses(): Promise<{
    status: string;
    error?: boolean;
    statusCode?: number;
    message: string;
    data?: courseDocument[];
  }> {
    try {
      const courses = await courseRepository.findAll();
      if (!courses || courses.length === 0) {
        return { status: "error", message: "No Courses found." };
      }

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "courses retrieved successfully",
        data: courses,
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }

  async updateCourse(
    id: string,
    courseData: Partial<courseUpdateInput>
  ): Promise<
    | {
        status: string;
        error: boolean;
        statusCode: number;
        message: string;
        data?: courseDocument;
      }
    | { status: string; message: string }
  > {
    try {
      const course = await courseRepository.findById(id);

      if (!course) {
        return {
          status: "error",
          statusCode: httpStatus.NOT_FOUND,
          message: "No course found.",
        };
      }

      const updatedcourse = await courseRepository.update(id, courseData);

      if (!updatedcourse) {
        return {
          status: "error",
          statusCode: httpStatus.BAD_REQUEST,
          message: "Failed to update course.",
        };
      }

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Course updated successfully",
        data: updatedcourse,
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }

  async deleteCourse(
    id: string
  ): Promise<DeleteCourseResponse | typeof doesNotExistError> {
    try {
      const course = await courseRepository.delete(id);
      if (!course) return doesNotExistError;

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Course deleted successfully",
      };
    } catch (error) {
      console.error(error);
      return defaultError;
    }
  }
}

export const courseService = new CourseService();
