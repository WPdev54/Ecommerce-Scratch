'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';  // Import use hook

const EditProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const [product, setProduct] = useState<any>(null); // State to hold product data
    const [categories, setCategories] = useState<any[]>([]); // State to hold categories
    const router = useRouter();

    // Unwrap params using React.use
    const { id } = use(params);

    useEffect(() => {
        if (!id) return;  // Ensure there's a valid product ID before fetching
        // Fetch the product details by id
        const fetchProduct = async () => {
            const response = await fetch(`/api/products/${id}`);
            const data = await response.json();
            setProduct(data);
        };

        // Fetch all categories for the dropdown
        const fetchCategories = async () => {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(data);
        };

        fetchProduct();
        fetchCategories();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Make the API request to update the product
        const response = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...product,
                categoryId: product.categoryId,  // Ensure category is updated
            }), // Send the updated product data
        });

        if (response.ok) {
            router.push('/admin/products');  // Redirect after successful update
        } else {
            alert('Failed to update product');
        }
    };

    if (!product || !categories.length) return <div>Loading...</div>;

    return (
        <div>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                    />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={product.categoryId}
                        onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category: any) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProductPage;
