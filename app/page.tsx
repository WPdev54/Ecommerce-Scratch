"use client"
// import { useEffect, useState } from 'react';
// import useCartStore from '../stores/cartStore';
import Hero from './components/HomePage/Hero';

const Home = () => {
    // const [products, setProducts] = useState<{ id: string; name: string; price: number }[]>([]);
    // const { addItem, removeItem, items } = useCartStore();

    // Fetch products on component mount
/*     useEffect(() => {
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
    }, []); */

/*     const handleAddToCart = (product: { id: string; name: string; price: number }) => {
        addItem(product);  // Adds product to the cart
    }; */

    return (
        <div>
            <Hero />
        </div>
    );
};

export default Home;
