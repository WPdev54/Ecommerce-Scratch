import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET || Fetch All Categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true, // Include related products to make the API response more comprehensive
      },
    });
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch categories" }),
      { status: 500 }
    );
  }
}

// POST || Create a New Category
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    // Validation
    if (!name || typeof name !== "string") {
      return new Response(
        JSON.stringify({ error: "Valid category name is required" }),
        { status: 400 }
      );
    }

    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return new Response(
        JSON.stringify({ error: "Category name must be unique" }),
        { status: 400 }
      );
    }

    const newCategory = await prisma.category.create({
      data: { name },
    });

    return new Response(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create category" }),
      { status: 500 }
    );
  }
}
