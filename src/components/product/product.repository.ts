import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

class ProductRepository {
  // Create a new product
  async create({
    name,
    description,
    price,
    stock,
    images,
    categoryId,
    sellerId,
  }: {
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    categoryId: string;
    sellerId: string;
  }): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        images,
        categoryId,
        sellerId,
      },
    });
    return product as Product;
  }

  // Find all products
  async findAll(): Promise<Product[]> {
    const product = await prisma.product.findMany();
    return product as Product[];
  }

  // Find a product by id
  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product as Product | null;
  }

  // Update a product by id
  async update(id: string, productData: Partial<Product>): Promise<Product> {
    const product = await prisma.product.update({
      where: { id },
      data: productData,
    });
    return product as Product;
  }

  // Delete a product by id
  async delete(id: string): Promise<Product> {
    const product = await prisma.product.delete({
      where: { id },
    });
    return product as Product;
  }
}

export default new ProductRepository();
