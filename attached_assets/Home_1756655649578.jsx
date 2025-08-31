import React, { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Home() {
    const { add } = useContext(CartContext);
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await API.get("/products");
                const list = data.products || data;
                const top = list.filter(p => p.featured).slice(0, 3);
                setFeatured(top.length ? top : list.slice(0, 3));
            } catch {
                setFeatured([
                    { _id: "f1", title: "Premium Mega Reels Bundle", price: 149, description: "Massive collection", thumb: "https://placehold.co/800x600/png?text=Premium+Mega" },
                    { _id: "f2", title: "Instagram Growth Product", price: 299, description: "Course", thumb: "https://placehold.co/800x600/png?text=IG+Growth" },
                    { _id: "f3", title: "Reels Bundle 50+", price: 99, description: "Reels pack", thumb: "https://placehold.co/800x600/png?text=Reels+99" }
                ]);
            } finally { setLoading(false); }
        })();
    }, []);

    return (
        <>
            <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 to-white">
                <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h1 className="font-display text-4xl md:text-5xl leading-tight reveal">Your Complete Path to <span className="text-brand-700">Online Success</span></h1>
                        <p className="mt-4 text-gray-700">Premium services & digital products to grow your brand — promotions, video editing, UGC, reels bundles, thumbnails, and more.</p>
                        <div className="mt-6 flex items-center gap-3">
                            <Link to="/products" className="btn-primary">Explore Products</Link>
                            <Link to="/services" className="btn-outline">View Services</Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="card p-6">
                            <img src="https://placehold.co/900x600/png?text=XPR+Media+Hero" className="rounded-xl" alt="hero" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 pb-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-3xl">Featured Products</h2>
                    <Link to="/products" className="text-brand-700 font-semibold">View all</Link>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {loading ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />) : featured.map(p => <ProductCard key={p._id} item={p} onAdd={add} />)}
                </div>
            </section>
        </>
    );
}
