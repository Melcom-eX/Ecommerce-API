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
    try {
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
    } catch (error) {
      console.error("Error creating a product", error);
      throw new Error("Error creating a product");
    }
  }

  // Find all products
  async findAll(): Promise<Product[]> {
    try {
      const product = await prisma.product.findMany({
        where: { isApproved: true },
      });
      return product as Product[];
    } catch (error) {
      console.error("Error finding all products", error);
      throw new Error("Error finding all products");
    }
  }

  async findAllAdmin(): Promise<Product[]> {
    try {
      const product = await prisma.product.findMany();
      return product as Product[];
    } catch (error) {
      console.error("Error finding all products", error);
      throw new Error("Error finding all products");
    }
  }

  // Find a product by id
  async findById(id: string): Promise<Product | null> {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
      });
      return product as Product | null;
    } catch (error) {
      console.error("Error finding a product by id", error);
      throw new Error("Error finding a product by id");
    }
  }

  // Update a product by id
  async update(id: string, productData: Partial<Product>): Promise<Product> {
    try {
      const product = await prisma.product.update({
        where: { id },
        data: productData,
      });
      return product as Product;
    } catch (error) {
      console.error("Error updating a product", error);
      throw new Error("Error updating a product");
    }
  }

  // Delete a product by id
  async delete(id: string): Promise<Product> {
    try {
      const product = await prisma.product.delete({
        where: { id },
      });
      return product as Product;
    } catch (error) {
      console.error("Error deleting a product", error);
      throw new Error("Error deleting a product");
    }
  }
  // Find products by category
  async findByCategory(categoryId: string): Promise<Product[]> {
    try {
      return prisma.product.findMany({
        where: {
          categoryId,
          isApproved: true,
        },
      });
    } catch (error) {
      console.error("Error finding products by category", error);
      throw new Error("Error finding products by category");
    }
  }

  // Filter products by price range
  async filterProductsByPrice(
    minPrice: number,
    maxPrice: number
  ): Promise<Product[]> {
    try {
      const result = await prisma.product.findMany({
        where: {
          price: {
            gte: minPrice, // Greater than or equal to
            lte: maxPrice, // Less than or equal to
          },
        },
      });
      return result;
    } catch (error) {
      console.error("Error finding products by price range", error);
      throw new Error("Error finding products by price range");
    }
  }
}

export default new ProductRepository();
