"use client"
import useCartStore from '@/stores/cartStore';
import { useEffect } from 'react';

const Home = () => {

    useEffect(() => {
        // Now we're sure this code runs on the client-side
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            console.log('Cart retrieved from localStorage:', JSON.parse(storedCart));
        } else {
            console.log('No cart found in localStorage');
        }
    }, []);  // Empty dependency array means it runs once after the initial render

    const { addItem, removeItem, items } = useCartStore();

    const handleRemoveFromCart = (id: string) => {
        removeItem(id);  // Removes product from the cart
    };

    return (
        <div>
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
