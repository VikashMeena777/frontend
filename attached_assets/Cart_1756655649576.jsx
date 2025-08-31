import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Cart() {
    const { items, inc, dec, remove, totals } = useContext(CartContext);
    const nav = useNavigate();

    if (!items.length) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h1 className="font-display text-3xl">Your cart is empty</h1>
                <Link to="/products" className="btn-primary mt-5 inline-block">Browse Products</Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="font-display text-3xl">Your Cart</h1>

            <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="md:col-span-2 space-y-4">
                    {items.map(it => (
                        <div key={it._id} className="card p-4 flex gap-4 items-center">
                            <img src={it.thumb} className="w-24 h-20 object-cover rounded-xl" alt={it.title} />
                            <div className="flex-1">
                                <div className="font-semibold">{it.title}</div>
                                <div className="text-sm text-gray-600">₹{it.price}</div>
                                <div className="flex items-center gap-3 mt-2">
                                    <button onClick={() => dec(it._id)} className="border rounded-lg px-2">-</button>
                                    <span>{it.qty}</span>
                                    <button onClick={() => inc(it._id)} className="border rounded-lg px-2">+</button>
                                </div>
                            </div>
                            <button onClick={() => remove(it._id)} className="text-red-600 hover:underline">Remove</button>
                        </div>
                    ))}
                </div>

                <div className="card p-5 h-fit">
                    <h3 className="font-semibold text-lg">Order Summary</h3>
                    <div className="flex items-center justify-between mt-3">
                        <span>Subtotal</span><span>₹{totals.subtotal}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>GST (included)</span><span>₹{totals.gst}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 font-semibold">
                        <span>Total</span><span>₹{totals.total}</span>
                    </div>
                    <button onClick={() => nav("/checkout")} className="btn-primary w-full mt-4">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
}
