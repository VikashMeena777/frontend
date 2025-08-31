import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Navbar() {
    const { totals } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const loc = useLocation();
    React.useEffect(() => setOpen(false), [loc]);

    return (
        <motion.header initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .35 }} className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <img src="/logo.png" alt="XPR" className="h-9 w-9 rounded-xl" />
                    <span className="font-display text-xl font-bold">XPR Media Agency</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-brand-700 font-semibold" : "text-gray-700 hover:text-ink"}>Home</NavLink>
                    <NavLink to="/products" className={({ isActive }) => isActive ? "text-brand-700 font-semibold" : "text-gray-700 hover:text-ink"}>Products</NavLink>
                    <NavLink to="/services" className={({ isActive }) => isActive ? "text-brand-700 font-semibold" : "text-gray-700 hover:text-ink"}>Services</NavLink>
                    <NavLink to="/policies" className={({ isActive }) => isActive ? "text-brand-700 font-semibold" : "text-gray-700 hover:text-ink"}>Policies</NavLink>
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <Link to="/cart" className="btn-outline text-sm">Cart ({totals.count})</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="btn-primary text-sm">Dashboard</Link>
                            <button onClick={logout} className="text-sm text-gray-600 px-3 py-2">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="btn-primary text-sm">Login</Link>
                    )}
                </div>

                <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
                    <svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="#0b1020" strokeWidth="2" strokeLinecap="round" /></svg>
                </button>
            </div>

            {open && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    <NavLink to="/" className="block py-2">Home</NavLink>
                    <NavLink to="/products" className="block py-2">Products</NavLink>
                    <NavLink to="/services" className="block py-2">Services</NavLink>
                    <NavLink to="/policies" className="block py-2">Policies</NavLink>
                    <div className="pt-2 border-t">
                        <Link to="/cart" className="block py-2">Cart ({totals.count})</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="block py-2">Dashboard</Link>
                                <button onClick={logout} className="block py-2">Logout</button>
                            </>
                        ) : <Link to="/login" className="block py-2">Login</Link>}
                    </div>
                </div>
            )}
        </motion.header>
    );
}
