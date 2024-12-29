"use client"
import { useEffect, useState } from 'react';
import useCartStore from '../stores/cartStore';

const Home = () => {
    const [products, setProducts] = useState<{ id: string; name: string; price: number }[]>([]);
    const { addItem, removeItem, items } = useCartStore();

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/products');
                if (!res.ok) throw new Error('Failed to fetch products');
                const data = await res.json();
                setProducts(data);  // Store fetched products in state
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);  // Only run once when the component mounts

    const handleAddToCart = (product: { id: string; name: string; price: number }) => {
        addItem(product);  // Adds product to the cart
    };

    const handleRemoveFromCart = (id: string) => {
        removeItem(id);  // Removes product from the cart
    };

    return (
        <div>
            <h1>All Products : {products.length}</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>

            <h1>CART:</h1>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                {item.name} - ${item.price} x {item.quantity}
                                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${items.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
                </div>
            )}
        </div>
    );
};

export default Home;
