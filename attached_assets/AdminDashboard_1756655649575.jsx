import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async () => {
            try { const p = await API.get("/admin/products"); setProducts(p.data.products || []); } catch { setProducts([]); }
            try { const o = await API.get("/admin/orders"); setOrders(o.data.orders || []); } catch { setOrders([]); }
        })();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="font-display text-3xl">Admin Dashboard</h1>

            <div className="mt-6">
                <h2 className="font-semibold mb-3">Products</h2>
                <div className="card p-4 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b"><th>Title</th><th>Price</th><th>Featured</th></tr></thead>
                        <tbody>
                            {products.map(p => (<tr key={p._id} className="border-b"><td className="py-2">{p.title}</td><td>₹{p.price}</td><td>{p.featured ? "Yes" : "No"}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="font-semibold mb-3">Orders</h2>
                <div className="card p-4 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead><tr className="border-b"><th>Order</th><th>User</th><th>Amount</th><th>Status</th></tr></thead>
                        <tbody>
                            {orders.map(o => (<tr key={o._id} className="border-b"><td className="py-2">#{o._id.slice(-6)}</td><td>{o.email}</td><td>₹{o.amount}</td><td>{o.paymentStatus}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
