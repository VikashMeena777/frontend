import React from "react";

export default function Policies() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
            <section className="card p-6">
                <h2 className="font-display text-2xl">Privacy Policy</h2>
                <p className="text-gray-700 mt-3">We collect personal information (name, email, payment details) solely to process orders, improve services, and provide support. We do not sell or share data except for payment processing or legal compliance. Contact: xprmediaagency.help@gmail.com</p>
            </section>

            <section className="card p-6">
                <h2 className="font-display text-2xl">Terms & Conditions</h2>
                <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
                    <li>All purchases are final unless stated otherwise.</li>
                    <li>Services delivered in agreed timeframe; delays by client are not our responsibility.</li>
                </ul>
            </section>

            <section className="card p-6">
                <h2 className="font-display text-2xl">Refund Policy</h2>
                <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
                    <li>Refunds only if service hasn't started. Digital products non-refundable once delivered.</li>
                    <li>Request within 7 days: xprmediaagency.help@gmail.com</li>
                </ul>
            </section>
        </div>
    );
}
