import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { Product } from "@shared/schema";

export default function Home() {
  const { data: products, isLoading } = useQuery<{ products: Product[] }>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products?.products?.filter(p => p.featured).slice(0, 3) || [];
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products?.products?.slice(0, 3) || [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg">
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-display text-4xl md:text-5xl leading-tight reveal" data-testid="hero-title">
              Your Complete Path to <span className="text-brand-700">Online Success</span>
            </h1>
            <p className="mt-4 text-gray-700 text-lg" data-testid="hero-description">
              Premium services & digital products to grow your brand — promotions, video editing, UGC, reels bundles, thumbnails, and more.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link href="/products" className="btn-primary" data-testid="explore-products-button">
                Explore Products
              </Link>
              <Link href="/services" className="btn-outline" data-testid="view-services-button">
                View Services
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="card p-6">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600"
                className="rounded-xl w-full"
                alt="Digital marketing dashboard showing growth metrics"
                data-testid="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl font-bold" data-testid="featured-products-title">
            Featured Products
          </h2>
          <Link href="/products" className="text-brand-700 font-semibold hover:underline" data-testid="view-all-products">
            View all →
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6" data-testid="featured-products-grid">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : displayProducts.map(product => (
                <ProductCard key={product.id} item={product} />
              ))
          }
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4" data-testid="services-preview-title">
              Professional Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" data-testid="services-preview-description">
              Get expert help with video editing, design, copywriting, and social media management
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card p-6 text-center" data-testid="service-preview-video">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Video Editing</h3>
              <p className="text-gray-600 text-sm">Professional editing for reels, shorts, and long-form content</p>
              <p className="font-bold text-brand-700 mt-2">From ₹599</p>
            </div>
            
            <div className="card p-6 text-center" data-testid="service-preview-design">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Design Services</h3>
              <p className="text-gray-600 text-sm">Custom thumbnails, logos, and social media graphics</p>
              <p className="font-bold text-brand-700 mt-2">From ₹299</p>
            </div>
            
            <div className="card p-6 text-center" data-testid="service-preview-content">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 8V7l-3 2-3-2v1c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v1l3-2 3 2zm0 6H10v5c0 1.1.9 2 2 2h7c1.1 0 2-.9 2-2v-5z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Content Strategy</h3>
              <p className="text-gray-600 text-sm">Social media management and content planning</p>
              <p className="font-bold text-brand-700 mt-2">From ₹4999</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/services" className="btn-primary" data-testid="view-all-services-button">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
