import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { Product } from "@shared/schema";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: products, isLoading } = useQuery<{ products: Product[] }>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = products?.products?.filter(product =>
    !searchQuery || product.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold" data-testid="products-title">All Products</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-200 rounded-xl px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="product-search"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6" data-testid="products-grid">
        {isLoading
          ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
          : filteredProducts.map(product => (
              <ProductCard key={product.id} item={product} />
            ))
        }
      </div>

      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-16" data-testid="no-products-found">
          <h2 className="font-display text-2xl mb-4">No products found</h2>
          <p className="text-gray-600">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}
