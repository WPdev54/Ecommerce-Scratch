import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET || Get all products By ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const product = await prisma.product.findUnique({
        where: { id: params.id },
    });
    if (!product) return new Response('Product not found', { status: 404 });
    return new Response(JSON.stringify(product), { status: 200 });
}

// PUT || Update a product

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();
    const { name, description, price } = body;

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: { name, description, price },
    });

    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  }

// DELETE || Delete a product   
  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return new Response('Product deleted', { status: 200 });
  }
