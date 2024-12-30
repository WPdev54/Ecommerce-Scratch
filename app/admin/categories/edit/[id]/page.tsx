"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function EditCategory() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await fetch(`/api/categories/${id}`);
            const data = await res.json();
            setName(data.name);
        };

        fetchCategory();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });

            if (res.ok) {
                router.push("/admin/categories");
            } else {
                const data = await res.json();
                setError(data.error || "Failed to update category");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        }
    };

    return (
        <div>
            <h1>Edit Category</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
