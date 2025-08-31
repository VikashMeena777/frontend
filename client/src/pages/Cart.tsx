import { Link } from "wouter";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Cart() {
  const { items, totals, updateQuantity, remove } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="font-display text-3xl font-bold mb-8" data-testid="cart-title">Your Cart</h1>
        <div className="text-center py-16" data-testid="empty-cart">
          <h2 className="font-display text-2xl mb-4">Your cart is empty</h2>
          <Link href="/products" className="btn-primary" data-testid="browse-products-button">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const gst = Math.round(totals.amount * 0.18 * 100) / 100;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold mb-8" data-testid="cart-title">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4" data-testid="cart-items">
          {items.map((item) => (
            <Card key={item._id} className="p-4" data-testid={`cart-item-${item._id}`}>
              <CardContent className="p-0">
                <div className="flex gap-4 items-center">
                  <img
                    src={item.thumb}
                    className="w-24 h-20 object-cover rounded-xl"
                    alt={item.title}
                    data-testid={`cart-item-image-${item._id}`}
                  />
                  <div className="flex-1">
                    <div className="font-semibold" data-testid={`cart-item-title-${item._id}`}>
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-600" data-testid={`cart-item-price-${item._id}`}>
                      ₹{item.price}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        data-testid={`decrease-quantity-${item._id}`}
                      >
                        -
                      </Button>
                      <span data-testid={`quantity-${item._id}`}>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        data-testid={`increase-quantity-${item._id}`}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => remove(item._id)}
                    className="text-red-600 hover:text-red-700"
                    data-testid={`remove-item-${item._id}`}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="p-6 h-fit" data-testid="order-summary">
          <CardContent className="p-0">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span data-testid="subtotal">₹{totals.amount}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>GST (included)</span>
                <span data-testid="gst">₹{gst}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex items-center justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span data-testid="total">₹{totals.amount}</span>
                </div>
              </div>
            </div>
            <Link href="/checkout" className="btn-primary w-full mt-6 block text-center" data-testid="checkout-button">
              Proceed to Checkout
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
