import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totals } = useCart();
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" data-testid="logo-link">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-turquoise flex items-center justify-center text-white font-bold">
            X
          </div>
          <span className="font-display text-xl font-bold">XPR Media Agency</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`transition-colors ${
              location === "/" ? "text-brand-700 font-semibold" : "text-gray-700 hover:text-ink"
            }`}
            data-testid="nav-home"
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`transition-colors ${
              location === "/products" ? "text-brand-700 font-semibold" : "text-gray-700 hover:text-ink"
            }`}
            data-testid="nav-products"
          >
            Products
          </Link>
          <Link
            href="/services"
            className={`transition-colors ${
              location === "/services" ? "text-brand-700 font-semibold" : "text-gray-700 hover:text-ink"
            }`}
            data-testid="nav-services"
          >
            Services
          </Link>
          <Link
            href="/policies"
            className={`transition-colors ${
              location === "/policies" ? "text-brand-700 font-semibold" : "text-gray-700 hover:text-ink"
            }`}
            data-testid="nav-policies"
          >
            Policies
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/cart" className="btn-outline text-sm relative" data-testid="cart-button">
            Cart ({totals.count})
            {totals.count > 0 && (
              <div className="absolute -top-2 -right-2 bg-turquoise text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totals.count}
              </div>
            )}
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="btn-primary text-sm" data-testid="dashboard-link">
                Dashboard
              </Link>
              <button onClick={logout} className="text-sm text-gray-600 px-3 py-2" data-testid="logout-button">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn-primary text-sm" data-testid="login-link">
              Login
            </Link>
          )}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          data-testid="mobile-menu-toggle"
        >
          <svg width="26" height="26" viewBox="0 0 24 24">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="#0b1020"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2" data-testid="mobile-menu">
          <Link href="/" className="block py-2">Home</Link>
          <Link href="/products" className="block py-2">Products</Link>
          <Link href="/services" className="block py-2">Services</Link>
          <Link href="/policies" className="block py-2">Policies</Link>
          <div className="pt-2 border-t">
            <Link href="/cart" className="block py-2">Cart ({totals.count})</Link>
            {user ? (
              <>
                <Link href="/dashboard" className="block py-2">Dashboard</Link>
                <button onClick={logout} className="block py-2">Logout</button>
              </>
            ) : (
              <Link href="/login" className="block py-2">Login</Link>
            )}
          </div>
        </div>
      )}
    </motion.header>
  );
}
