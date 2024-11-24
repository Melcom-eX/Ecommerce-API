import { PrismaClient, Prisma, Grade } from "@prisma/client";
import { gradeDocument } from "../types/DBTypes";

const prisma = new PrismaClient();

export class GradeRepository {
  async createGrade(data: Prisma.GradeCreateInput): Promise<Grade> {
    return prisma.grade.create({ data });
  }

  async getGradeById(id: string): Promise<gradeDocument | null> {
    const grade = await prisma.grade.findUnique({
      where: { id },
      select: {
        id: true,
        enrollment: true,
        enrollmentId: true,
        grade: true,
        gradeDate: true,
      },
    });
    return grade as gradeDocument | null;
  }

  async getAllGrades(): Promise<Grade[]> {
    return prisma.grade.findMany();
  }

  async updateGrade(id: string, data: Prisma.GradeUpdateInput): Promise<Grade> {
    return prisma.grade.update({
      where: { id },
      data,
    });
  }

  async deleteGrade(id: string): Promise<Grade> {
    return prisma.grade.delete({
      where: { id },
    });
  }
}

export default new GradeRepository();
