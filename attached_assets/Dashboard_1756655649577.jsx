import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await API.get("/orders/my");
                setOrders(data.orders || data);
            } catch { setOrders([]); }
        })();
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="font-display text-3xl">Your Dashboard</h1>
            <p className="text-gray-600 mt-2">Access your purchases and downloads.</p>

            {!orders ? <div className="mt-6">Loading...</div> : (
                <div className="grid gap-4 mt-6">
                    {!orders.length ? <div className="card p-6">No orders yet.</div> : orders.map(o => (
                        <div key={o._id} className="card p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold">Order #{o._id.slice(-6)}</div>
                                    <div className="text-sm text-gray-600">Amount: ₹{o.amount} • Status: {o.paymentStatus}</div>
                                </div>
                                <div className="text-sm text-gray-500">{new Date(o.createdAt).toLocaleString()}</div>
                            </div>
                            {o.downloads?.length > 0 && (
                                <div className="mt-3">
                                    <div className="font-semibold mb-2">Downloads</div>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {o.downloads.map((d, i) => (<li key={i}><a href={d.url} target="_blank" rel="noreferrer" className="text-brand-700 hover:underline">Download #{i + 1}</a> <span className="text-xs text-gray-500">(expires {new Date(d.expiresAt).toLocaleString()})</span></li>))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
