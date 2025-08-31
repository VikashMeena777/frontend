import React, { useState } from "react";
import ServiceCard from "../components/ServiceCard";

const SERVICES = [
    { title: "Video Editing", startingPrice: 599, description: "Reels, Shorts, ads & long-form — transitions, grading, captions." },
    { title: "Thumbnail Designing", startingPrice: 299, description: "YouTube thumbnails and socials that convert." },
    { title: "Story Writing (Scripts)", startingPrice: 499, description: "Hooks, pacing & endings for reels." },
    { title: "Copywriting", startingPrice: 599, description: "Ad copy, captions & product descriptions." },
    { title: "Social Media Management", startingPrice: 4999, description: "Full page management & analytics." }
];

export default function Services() {
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState({ name: "", email: "", notes: "" });

    const open = (svc) => setModal(svc);
    const submit = async (e) => {
        e.preventDefault();
        try {
            // POST /api/bookings/create expected by backend
            await fetch(import.meta.env.VITE_API_BASE + "/bookings/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, service: modal.title, budget: modal.startingPrice })
            });
            alert("Booking received! We'll contact you soon.");
            setModal(null);
            setForm({ name: "", email: "", notes: "" });
        } catch {
            alert("Booking failed");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="font-display text-3xl">Services</h1>
            <p className="text-gray-600 mt-2">Book the service — we’ll contact you after booking to finalize scope & timeline.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {SERVICES.map((s, i) => (<ServiceCard key={i} svc={s} onBook={open} />))}
            </div>

            {modal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
                    <form onSubmit={submit} className="card w-full max-w-lg p-6">
                        <h3 className="font-semibold text-lg">Book: {modal.title}</h3>
                        <div className="grid gap-3 mt-4">
                            <input className="border rounded-xl px-3 py-2" placeholder="Your Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            <input className="border rounded-xl px-3 py-2" placeholder="Your Email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            <textarea className="border rounded-xl px-3 py-2" rows="4" placeholder="Describe your needs" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
                        </div>
                        <div className="flex items-center justify-end gap-3 mt-5">
                            <button type="button" onClick={() => setModal(null)} className="btn-outline">Cancel</button>
                            <button className="btn-primary" type="submit">Submit Booking</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
