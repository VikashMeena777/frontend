"use client";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import SkeletonLoader from "../../components/SkeletonLoader";
import { api } from "../../lib/api";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/products").then(res => {
            setProducts(res.data.products);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center mb-8">All Products</h1>
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => <SkeletonLoader key={i} />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
