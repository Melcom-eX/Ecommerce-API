import { PrismaClient, Course } from "@prisma/client";
import { courseDocument, courseUpdateInput } from "../types/DBTypes";

const prisma = new PrismaClient();

class CourseRepository {
  async create({
    courseName,
    courseDescription,
    credits,
    department,
  }: {
    courseName: string;
    courseDescription: string;
    credits: number;
    department: string;
  }): Promise<courseDocument> {
    const course = await prisma.course.create({
      data: {
        courseName,
        courseDescription,
        credits,
        department,
      },
    });
    return course as courseDocument;
  }

  async findById(id: string): Promise<courseDocument | null> {
    const course = await prisma.course.findUnique({
      where: { id },
      select: {
        id: true,
        courseName: true,
        courseDescription: true,
        credits: true,
        department: true,
        enrollments: true,
      },
    });
    return course as courseDocument | null;
  }

  async findAll(): Promise<courseDocument[]> {
    const course = await prisma.course.findMany({
      select: {
        id: true,
        courseName: true,
        courseDescription: true,
        credits: true,
        department: true,
        enrollments: true,
      },
    });
    return course as courseDocument[];
  }

  async update(
    id: string,
    courseData: Partial<courseUpdateInput>
  ): Promise<courseDocument | null> {
    const updated = await prisma.course.update({
      where: { id },
      data: {
        ...courseData,
      },
    });
    return updated as courseDocument;
  }

  async delete(id: string): Promise<courseDocument | null> {
    const course = await prisma.course.delete({
      where: { id },
    });
    return course as courseDocument;
  }
}

export default new CourseRepository();
