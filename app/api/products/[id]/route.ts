import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET || Get all products by ID
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
    const { name, description, price, categoryId } = body;

    try {
        // Update the product, including the categoryId
        const updatedProduct = await prisma.product.update({
            where: { id: params.id },
            data: {
                name,
                description,
                price,
                categoryId,  // This is where we update the categoryId
            },
        });

        return new Response(JSON.stringify(updatedProduct), { status: 200 });
    } catch (error) {
        console.error('Error updating product:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to update product' }),
            { status: 500 }
        );
    }
}

// DELETE || Delete a product
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.product.delete({
            where: { id: params.id },
        });

        return new Response('Product deleted', { status: 200 });
    } catch (error) {
        console.error('Error deleting product:', error);
        return new Response('Failed to delete product', { status: 500 });
    }
}
