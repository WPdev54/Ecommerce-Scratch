'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const EditProductPage = ({ params }: { params: { id: string } }) => {
    const [product, setProduct] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Fetch the product details by id
        const fetchProduct = async () => {
            const response = await fetch(`/api/products/${params.id}`);
            const data = await response.json();
            setProduct(data);
        };

        fetchProduct();
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Make the API request to update the product
        const response = await fetch(`/api/products/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),  // Send the updated product data
        });

        if (response.ok) {
            router.push('/admin/products');  // Redirect after successful update
        } else {
            alert('Failed to update product');
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />
                <input
                    type="number"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                />
                <textarea
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProductPage;
