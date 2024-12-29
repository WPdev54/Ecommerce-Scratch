// app/admin/products/create/page.tsx

'use client'; // This is a client-side component

import React, { useState } from 'react';

const CreateProductPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate the form fields
        if (!name || !description || !price) {
            setMessage('All fields are required!');
            return;
        }

        try {
            // Make API call to create a new product
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description, price: parseFloat(price) }), // Convert price to float
            });

            if (!response.ok) {
                throw new Error('Failed to create product');
            }

            const data = await response.json();
            setMessage(`Product "${data.name}" created successfully!`);

            // Clear the form fields
            setName('');
            setDescription('');
            setPrice('');
        } catch (error) {
            setMessage('Error creating product. Please try again.');
        }
    };

    return (
        <div>
            <h1>Create New Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        step="0.01"
                    />
                </div>

                <button type="submit">Create Product</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateProductPage;
