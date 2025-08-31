import React, { useContext, useState } from "react";
import API from "../api/axios";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const { items, totals, clear } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const loadScript = (src) => new Promise((res, rej) => {
        if (document.querySelector(`script[src="${src}"]`)) return res();
        const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.body.appendChild(s);
    });

    const pay = async () => {
        try {
            if (!user) { alert("Please login to checkout."); return; }
            if (!items.length) { alert("Cart empty."); return; }
            setLoading(true);

            // create order on backend => expected: { orderId, razorOrder, amount }
            const createRes = await API.post("/orders/create", { items: items.map(i => ({ productId: i._id, qty: i.qty, price: i.price })) });
            const { orderId, razorOrder } = createRes.data;
            if (!razorOrder || !razorOrder.id) throw new Error("Order create failed");

            // get public key
            let key = "";
            try {
                const cfg = await API.get("/config/razorpay-key");
                key = cfg.data.key || cfg.data.publicKey || "";
            } catch {
                key = import.meta.env.VITE_RAZORPAY_KEY || "";
            }
            if (!key) { alert("Razorpay key missing."); setLoading(false); return; }

            await loadScript("https://checkout.razorpay.com/v1/checkout.js");

            const options = {
                key,
                amount: razorOrder.amount,
                currency: razorOrder.currency || "INR",
                order_id: razorOrder.id,
                name: "XPR Media Agency",
                description: "Digital products",
                prefill: { email: user.email || "" },
                theme: { color: "#3777ff" },
                handler: async function (resp) {
                    try {
                        await API.post("/orders/confirm", {
                            orderId,
                            razorpay_payment_id: resp.razorpay_payment_id,
                            razorpay_order_id: resp.razorpay_order_id,
                            razorpay_signature: resp.razorpay_signature
                        });
                        alert("Payment successful. You'll get download links by email.");
                        clear();
                        nav("/dashboard");
                    } catch (err) {
                        console.error(err);
                        alert("Payment succeeded but verification failed. Contact support.");
                        nav("/dashboard");
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || err.message || "Checkout failed");
        } finally { setLoading(false); }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="font-display text-3xl">Checkout</h1>
            <div className="card p-6 mt-6">
                <div className="flex items-center justify-between"><span>Total Amount</span><span className="font-semibold">₹{totals.total}</span></div>
                <button className="btn-primary mt-5" onClick={pay} disabled={loading}>{loading ? "Processing..." : "Pay with Razorpay"}</button>
            </div>
        </div>
    );
}
