import {create} from 'zustand';

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
};

// Create the Zustand store
const useCartStore = create<CartState>((set) => ({
    items: [],
    addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
            // If the item already exists in the cart, increase its quantity
            return {
                items: state.items.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
            };
        } else {
            // Otherwise, add the item to the cart
            return { items: [...state.items, { ...item, quantity: 1 }] };
        }
    }),
    removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
    })),
}));

export default useCartStore;
