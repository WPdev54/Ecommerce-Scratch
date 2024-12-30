import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET || Get all products, filtered by keyword
export async function GET(req: Request) {
    const url = new URL(req.url);
    const keyword = url.searchParams.get('keyword');  // Get the keyword from query params

    let productsQuery = {};

    // Filter products by keyword (search in name and description)
    if (keyword) {
        productsQuery = {
            OR: [
                { name: { contains: keyword, mode: 'insensitive' } },
                { description: { contains: keyword, mode: 'insensitive' } },
            ],
        };
    }

    // Fetch products based on the search query
    const products = await prisma.product.findMany({
        where: productsQuery,
    });

    return new Response(JSON.stringify(products), { status: 200 });
}

// POST || Create A Product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, categoryId } = body;

    // Validate input
    if (!name || !description || !price || !categoryId) {
      return new Response(
        JSON.stringify({
          error: "All fields (name, description, price, categoryId) are required",
        }),
        { status: 400 }
      );
    }

    // Create new product
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price), // Ensure price is a float
        categoryId,
      },
    });

    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while creating the product" }),
      { status: 500 }
    );
  }
}
