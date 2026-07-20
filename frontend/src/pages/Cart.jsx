import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const Cart = () => {
    const usrId = localStorage.getItem("userId"); 
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true); // Loading bug fix karne ke liye

    const loadCart = async () => {
        if (!usrId) {
            setCart(null);
            setLoading(false);
            return;
        }
        try {
            const response = await api.get(`/cart/${usrId}`);
            // Backend res structure ke hisab se data set karein
            setCart(response.data.cart || response.data);
            window.dispatchEvent(new Event("cartUpdated")); 
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    loadCart();

    const updateCart = () => {
        loadCart();
    };

    window.addEventListener("cartUpdated", updateCart);

    return () => {
        window.removeEventListener("cartUpdated", updateCart);
    };

}, [usrId]);

    // Navbar cart badge update logic
    const updateNavbarBadge = (cartData) => {
        const items = cartData?.items || [];
        const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem("cartCount", totalQty);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const removeItem = async (productId) => {
        const res = await api.post('/cart/remove', { userId: usrId, productId });
        const updatedCart = res.data.cart || res.data;
        setCart(updatedCart);
        updateNavbarBadge(updatedCart);
    };

    const updateQty = async (productId, quantity) => {
        if (quantity <= 0) {
            await removeItem(productId);
            return;
        }
        const res = await api.post('/cart/update', { userId: usrId, productId, quantity });
        const updatedCart = res.data.cart || res.data;
        setCart(updatedCart);
        updateNavbarBadge(updatedCart);
    };

    if (loading) {
        return <div className="text-center p-10 text-xl">Loading your cart...</div>;
    }

    if (!usrId) {
        return <div className="text-center p-10 text-xl text-red-500">Please login to view your cart.</div>;
    }

    const items = cart?.items || [];
    const total = items.reduce((sum, item) => sum + item.quantity * (item.productId?.price || 0), 0);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            {items.length === 0 ? (
                <p className="text-gray-500 text-lg">Your cart is empty.</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.productId?._id || item._id} className="flex items-center justify-between border p-4 rounded shadow-sm">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.productId?.image}
                                        alt={item.productId?.title}
                                        className="w-16 h-16 object-contain rounded"
                                    />
                                    <div>
                                        <h2 className="font-semibold">{item.productId?.title}</h2>
                                        <p>₹{item.productId?.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 border rounded p-1">
                                    <button className="px-2 font-bold" onClick={() => updateQty(item.productId?._id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button className="px-2 font-bold" onClick={() => updateQty(item.productId?._id, item.quantity + 1)}>+</button>
                                </div>

                                <p className="font-semibold">₹{item.quantity * (item.productId?.price || 0)}</p>

                                <button
                                    onClick={() => removeItem(item.productId?._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-between text-xl font-bold border-t pt-4">
                        <span>Total</span>
                        <span className="text-green-600">₹{total}</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
