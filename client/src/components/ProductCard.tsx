import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { Product } from "@shared/schema";

interface ProductCardProps {
  item: Product;
}

export default function ProductCard({ item }: ProductCardProps) {
  const { add } = useCart();

  const handleAddToCart = () => {
    add({
      _id: item.id,
      title: item.title,
      price: item.price,
      thumb: item.thumbnail || `https://placehold.co/800x600/png?text=${encodeURIComponent(item.title)}`,
    });
  };

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      className="card overflow-hidden"
      data-testid={`product-card-${item.id}`}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.thumbnail || `https://placehold.co/800x600/png?text=${encodeURIComponent(item.title)}`}
          alt={item.title}
          className="w-full h-full object-cover"
          data-testid={`product-image-${item.id}`}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold" data-testid={`product-title-${item.id}`}>
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1" data-testid={`product-description-${item.id}`}>
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="font-bold" data-testid={`product-price-${item.id}`}>
            ₹{item.price}
          </div>
          <button
            onClick={handleAddToCart}
            className="btn-primary text-sm"
            data-testid={`add-to-cart-${item.id}`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
