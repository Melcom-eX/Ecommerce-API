import { PrismaClient, Category as CategoryModel } from "@prisma/client";
import { CategoryUpdateInput } from "./category.response";
const prisma = new PrismaClient();
class CategoryRepository {
  async findAll(): Promise<CategoryModel[]> {
    const category = await prisma.category.findMany();
    return category as CategoryModel[];
  }

  async findById(id: string): Promise<CategoryModel | null> {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    return category as CategoryModel | null;
  }

  async create({
    name,
    description,
  }: {
    name: string;
    description: string;
  }): Promise<CategoryModel> {
    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    return category as CategoryModel;
  }

  async update(
    id: string,
    updateData: Partial<CategoryUpdateInput>
  ): Promise<CategoryModel | null> {
    const category = await prisma.category.update({
      where: { id },
      data: updateData,
    });
    return category as CategoryModel | null;
  }

  async delete(id: string): Promise<CategoryModel | null> {
    const category = await prisma.category.delete({
      where: { id },
    });
    return category as CategoryModel | null;
  }
}

export default new CategoryRepository();
