import { EnrollmentStatus, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { EnrollmentDocument, EnrollmentUpdateInput } from "../types/DBTypes";
class EnrollmentRepository {
  // Find all enrollments
  async findAll(): Promise<EnrollmentDocument[]> {
    const enrollment = await prisma.enrollment.findMany({
      select: {
        id: true,
        studentId: true,
        courseId: true,
        enrollmentDate: true,
        status: true,
        grades: true,
        student: {
          select: {
            id: true,
            fullName: true,
            email: true,
            major: true,
          },
        },
        course: {
          select: {
            id: true,
            courseName: true,
            courseDescription: true,
            department: true,
            credits: true,
          },
        },
      },
    });
    return enrollment as EnrollmentDocument[];
  }

  // Find enrollment by ID
  async findById(id: string): Promise<EnrollmentDocument | null> {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      select: {
        id: true,
        studentId: true,
        courseId: true,
        enrollmentDate: true,
        status: true,
        grades: true,
        student: {
          select: {
            id: true,
            fullName: true,
            email: true,
            major: true,
          },
        },
        course: {
          select: {
            id: true,
            courseName: true,
            courseDescription: true,
            department: true,
            credits: true,
          },
        },
      },
    });
    return enrollment as EnrollmentDocument | null;
  }

  // Create a new enrollment
  async create({
    studentId,
    courseId,
    enrollmentDate,
    status,
  }: {
    studentId: string;
    courseId: string;
    enrollmentDate: Date;
    status: EnrollmentStatus;
  }): Promise<EnrollmentDocument> {
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId, // Foreign key to the User model
        courseId, // Foreign key to the Course model
        enrollmentDate,
        status,
        grades: {
          create: [],
        },
      },
      include: {
        student: true, // Include student data
        course: true, // Include course data
      },
    });

    return enrollment as EnrollmentDocument;
  }

  // Update an enrollment by ID
  async update(
    id: string,
    status: EnrollmentUpdateInput
  ): Promise<EnrollmentDocument | null> {
    const updatedEnrollment = await prisma.enrollment.update({
      where: { id },
      data: status,
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            courseName: true,
          },
        },
      },
    });
    return updatedEnrollment as EnrollmentDocument;
  }

  // async update(
  //   id: string,
  //   status: EnrollmentUpdateInput
  // ): Promise<EnrollmentDocument | null> {
  //   // Ensure `status` is an object with the correct property
  //   console.log("Updating enrollment status:", status);
  //   const updatedEnrollment = await prisma.enrollment.update({
  //     where: { id },
  //     data: { status.st }, // Access `status` property inside `status` object
  //     include: {
  //       student: {
  //         select: {
  //           id: true,
  //           fullName: true,
  //           email: true,
  //         },
  //       },
  //       course: {
  //         select: {
  //           id: true,
  //           courseName: true,
  //         },
  //       },
  //     },
  //   });
  //   return updatedEnrollment as EnrollmentDocument;
  // }

  // Delete an enrollment by ID
  async delete(id: string): Promise<EnrollmentDocument | null> {
    const enrollment = await prisma.enrollment.delete({
      where: { id },
    });
    return enrollment as EnrollmentDocument;
  }
}
export default new EnrollmentRepository();
