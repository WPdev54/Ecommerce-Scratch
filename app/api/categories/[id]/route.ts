import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PUT || Update a Category
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Validate `id` parameter
    if (!id || typeof id !== "string") {
      return new Response(
        JSON.stringify({ error: "Valid category ID is required" }),
        { status: 400 }
      );
    }

    const body = await req.json();
    const { name } = body;

    // Validate `name`
    if (!name || typeof name !== "string") {
      return new Response(
        JSON.stringify({ error: "Valid category name is required" }),
        { status: 400 }
      );
    }

    // Check if the category exists
    const existingCategory = await prisma.category.findUnique({ where: { id } });
    if (!existingCategory) {
      return new Response(
        JSON.stringify({ error: "Category not found" }),
        { status: 404 }
      );
    }

    // Update the category
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });

    return new Response(JSON.stringify(updatedCategory), { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update category" }),
      { status: 500 }
    );
  }
}

// DELETE || Delete a Category
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate `id` parameter
    if (!id || typeof id !== "string") {
      return new Response(
        JSON.stringify({ error: "Valid category ID is required" }),
        { status: 400 }
      );
    }

    // Check if the category exists
    const existingCategory = await prisma.category.findUnique({ where: { id } });
    if (!existingCategory) {
      return new Response(
        JSON.stringify({ error: "Category not found" }),
        { status: 404 }
      );
    }

    // Delete the category
    await prisma.category.delete({ where: { id } });

    return new Response(JSON.stringify({ message: "Category deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete category" }),
      { status: 500 }
    );
  }
}
