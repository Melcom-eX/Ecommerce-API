import gradeRepository from "../repositories/grade.repository";
import { Prisma, Grade } from "@prisma/client";

export class GradeService {
  async createGrade(data: Prisma.GradeCreateInput): Promise<Grade> {
    return gradeRepository.createGrade(data);
  }

  async getGradeById(id: string): Promise<Grade | null> {
    return gradeRepository.getGradeById(id);
  }

  async getAllGrades(): Promise<Grade[]> {
    return gradeRepository.getAllGrades();
  }

  async updateGrade(id: string, data: Prisma.GradeUpdateInput): Promise<Grade> {
    return gradeRepository.updateGrade(id, data);
  }

  async deleteGrade(id: string): Promise<Grade> {
    return gradeRepository.deleteGrade(id);
  }
}
