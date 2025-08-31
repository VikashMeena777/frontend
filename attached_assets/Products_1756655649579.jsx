import React, { useContext, useState, useEffect } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { CartContext } from "../context/CartContext";

export default function Products() {
    const { add } = useContext(CartContext);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const { data } = await API.get("/products");
                setList(data.products || data);
            } catch {
                setList([]);
            } finally { setLoading(false); }
        })();
    }, []);

    const filtered = list.filter(p => !q || p.title.toLowerCase().includes(q.toLowerCase()));

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between">
                <h1 className="font-display text-3xl">Products</h1>
                <input className="border rounded-xl px-3 py-2" placeholder="Search products" value={q} onChange={e => setQ(e.target.value)} />
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                {loading ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />) : filtered.map(p => <ProductCard key={p._id} item={p} onAdd={add} />)}
            </div>
        </div>
    );
}
