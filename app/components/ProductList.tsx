import useCartStore from '@/stores/cartStore';
import { FC } from 'react';

interface Product {
    id: string;
    name: string;
    price: number;
}

const ProductList: FC<{ products: Product[] }> = ({ products }) => {
    const { addItem } = useCartStore();

    const handleAddToCart = (product: Product) => {
        addItem(product); // Adds the selected product to the cart
    };

    return (
        <div>
            <h2>Product List</h2>
            {products.map((product) => (
                <div key={product.id} style={{ marginBottom: '10px' }}>
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
