import React from "react";
import { motion } from "framer-motion";

export default function ProductCard({ item, onAdd }) {
    const thumb = item.thumb || item.thumbnail || item.thumbnailUrl || `https://placehold.co/800x600/png?text=${encodeURIComponent(item.title)}`;
    return (
        <motion.div layout whileHover={{ scale: 1.02 }} className="card overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden"><img src={thumb} alt={item.title} className="w-full h-full object-cover" /></div>
            <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{item.description || item.shortDesc}</p>
                <div className="flex items-center justify-between mt-3">
                    <div className="font-bold">₹{item.price}</div>
                    <button onClick={() => onAdd && onAdd({ _id: item._id, title: item.title, price: item.price, thumb })} className="btn-primary text-sm">Add to Cart</button>
                </div>
            </div>
        </motion.div>
    );
}
