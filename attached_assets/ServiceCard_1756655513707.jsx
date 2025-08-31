import React from "react";

export default function ServiceCard({ svc, onBook }) {
    return (
        <div className="card p-5 reveal">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{svc.title}</h3>
                <span className="font-bold text-brand-700">from ₹{svc.startingPrice}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{svc.description}</p>
            <button onClick={() => onBook && onBook(svc)} className="btn-primary mt-4">Book Service</button>
        </div>
    );
}
