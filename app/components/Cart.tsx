import useCartStore from '@/stores/cartStore';
import { useState, useEffect } from 'react';

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Get the total from the store
    const calculatedTotal = getTotal();
    setTotal(calculatedTotal);
  }, [items, getTotal]);

  return (
    <div>
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.id} style={{ marginBottom: '10px' }}>
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
              <p>
                Quantity:
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                {item.quantity}
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </p>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
