import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-gray-100 bg-white/60 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <img src="/logo.png" className="h-9 w-9 rounded-xl" alt="logo" />
                        <span className="font-display text-lg font-semibold">XPR Media Agency</span>
                    </div>
                    <p className="text-sm text-gray-600">Premium digital services & market-ready products for creators, brands and influencers.</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Explore</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/products" className="hover:underline">Products</Link></li>
                        <li><Link to="/services" className="hover:underline">Services</Link></li>
                        <li><Link to="/policies" className="hover:underline">Policies</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="mailto:xprmediaagency.help@gmail.com" className="hover:underline">xprmediaagency.help@gmail.com</a></li>
                        <li>24/7 WhatsApp support (widget can be added)</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Legal</h4>
                    <p className="text-sm text-gray-600">GST included in prices. Digital products delivered instantly after payment.</p>
                </div>
            </div>
            <div className="text-center text-xs text-gray-500 pb-6">&copy; {new Date().getFullYear()} XPR Media Agency</div>
        </footer>
    );
}
