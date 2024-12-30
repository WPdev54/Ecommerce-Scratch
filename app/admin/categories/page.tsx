"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";

interface CategoriesProps {
    name: string;
    id: any;
}

const CategoriesPage: FC<CategoriesProps> = () => {
    const [categories, setCategories] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                setError("Failed to fetch categories");
            }
        };

        fetchCategories();
    }, []);

    const deleteCategory = async (id: string) => {
        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setCategories(categories.filter((cat: any) => cat.id !== id));
            } else {
                const data = await res.json();
                setError(data.error || "Failed to delete category");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        }
    };

    return (
        <div>
            <h1>Categories</h1>
            <Link href="/admin/categories/create">
                <button>Create Category</button>
            </Link>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {categories?.map((category: any) => (
                    <li key={category.id}>
                        {category.name}
                        <button onClick={() => deleteCategory(category.id)}>Delete</button>
                        <Link href={`/admin/categories/edit/${category.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoriesPage
