'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const handleDelete = async (id: string) => {
        const confirmation = window.confirm('Are you sure you want to delete this product?');

        if (confirmation) {
            try {
                const response = await fetch(`/api/products/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Product deleted successfully');
                    setProducts(products.filter(product => product.id !== id)); // Remove product from UI
                } else {
                    const data = await response.json();
                    alert(data.error || 'Error deleting product');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error deleting product');
            }
        }
    };

    const router = useRouter();

    const navigateToCreateProduct = () => {
        router.push('/admin/products/create');
    };

    return (
        <div>
            <h1>Manage Products</h1>
            <ul>
                {products.map((product: any) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <a href={`/admin/products/${product.id}`}>Edit</a>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={navigateToCreateProduct}>Create New Product</button>
        </div>
    );
};

export default AdminProducts;
