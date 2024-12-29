import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

// GET || Get all products
export async function GET () {
    const products = await prisma.product.findMany();
    return new Response(JSON.stringify(products), {status: 200});
}

// POST || Create A Product
export async function POST(req: Request) {
    const body = await req.json();
    const { name, description, price } = body;

    const newProduct = await prisma.product.create({
      data: { name, description, price },
    });

    return new Response(JSON.stringify(newProduct), { status: 201 });
  }
