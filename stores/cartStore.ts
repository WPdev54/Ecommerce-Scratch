import { create } from 'zustand';

// Define the structure of a CartItem
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[]; // List of cart items
  addItem: (item: CartItem) => void; // Function to add an item to the cart
  removeItem: (id: string) => void; // Function to remove an item by id
  clearCart: () => void; // Function to clear the cart
  getTotalPrice: () => number; // Function to calculate the total price of all items
};

// Create the Zustand store
const useCartStore = create<CartState>((set) => {
  // Load the cart items from localStorage if available
  const loadedItems = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [];

  return {
    items: loadedItems, // Initialize with items from localStorage
    addItem: (item) => set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      let updatedItems;
      if (existingItem) {
        // If the item already exists in the cart, increase its quantity
        updatedItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Otherwise, add the item to the cart
        updatedItems = [...state.items, { ...item, quantity: 1 }];
      }

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedItems));

      return { items: updatedItems };
    }),
    removeItem: (id) => set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== id);
      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),
    clearCart: () => set(() => {
      // Clear cart in both state and localStorage
      localStorage.setItem('cart', JSON.stringify([]));
      return { items: [] };
    }),
    getTotalPrice: () => {
      return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  };
});

export default useCartStore;
