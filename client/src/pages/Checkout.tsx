import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useLocation, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import api from "../lib/api";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout() {
  const { items, totals, clear } = useCart();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await api.post("/orders", orderData);
      return response.data;
    },
  });

  const paymentMutation = useMutation({
    mutationFn: async (paymentData: any) => {
      const response = await api.post("/payment/create", paymentData);
      return response.data;
    },
  });

  const verifyPaymentMutation = useMutation({
    mutationFn: async (verificationData: any) => {
      const response = await api.post("/payment/verify", verificationData);
      return response.data;
    },
  });

  const handlePayment = async () => {
    if (!user) {
      setLocation("/login");
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some products to cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      // Create order first
      const order = await createOrderMutation.mutateAsync({
        items: JSON.stringify(items),
        total: totals.amount,
        status: "pending",
      });

      // Create Razorpay payment
      const paymentOrder = await paymentMutation.mutateAsync({
        amount: totals.amount * 100, // Convert to paise
      });

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      const options = {
        key: paymentOrder.key,
        amount: paymentOrder.amount,
        currency: "INR",
        name: "XPR Media Agency",
        description: "Digital Products Purchase",
        order_id: paymentOrder.orderId,
        handler: async (response: any) => {
          try {
            await verifyPaymentMutation.mutateAsync({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              order_id: order.id,
            });

            clear();
            toast({
              title: "Payment successful!",
              description: "Check your email for download links.",
            });
            setLocation("/dashboard");
          } catch {
            toast({
              title: "Payment verification failed",
              description: "Please contact support.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#3777ff",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast({
        title: "Payment initiation failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Please Login</h1>
        <p className="text-gray-600 mb-6">You need to login to proceed with checkout.</p>
        <Link href="/login" className="btn-primary">Login</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold mb-8" data-testid="checkout-title">Checkout</h1>
      
      <Card className="p-6" data-testid="payment-details">
        <CardContent className="p-0">
          <h3 className="font-semibold text-lg mb-4">Payment Details</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <span>Total Amount</span>
              <span className="font-semibold text-xl" data-testid="checkout-total">
                ₹{totals.amount}
              </span>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                🔒 Secure payment powered by Razorpay. Your payment information is encrypted and secure.
              </p>
            </div>
          </div>
          
          <Button
            onClick={handlePayment}
            disabled={processing || createOrderMutation.isPending || paymentMutation.isPending}
            className="btn-primary w-full mt-6"
            data-testid="pay-button"
          >
            {processing ? "Processing..." : "Pay with Razorpay"}
          </Button>
          
          <p className="text-xs text-gray-500 mt-3 text-center">
            By proceeding, you agree to our Terms & Conditions and Privacy Policy
          </p>
        </CardContent>
      </Card>

      {processing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" data-testid="payment-processing">
          <Card className="p-8 text-center">
            <CardContent className="p-0">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
              <p className="font-semibold">Processing Payment...</p>
              <p className="text-sm text-gray-600">Please do not close this window</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
