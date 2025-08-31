import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@shared/schema";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: orders, isLoading } = useQuery<{ orders: Order[] }>({
    queryKey: ["/api/orders"],
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Please Login</h1>
        <p className="text-gray-600 mb-6">You need to login to access your dashboard.</p>
        <Link href="/login" className="btn-primary">Login</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold mb-4" data-testid="dashboard-title">
        Welcome, {user.name}
      </h1>
      <p className="text-gray-600 mb-8" data-testid="dashboard-description">
        Access your purchases and downloads.
      </p>

      <div className="space-y-6" data-testid="orders-list">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-6">
                <CardContent className="p-0">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : orders?.orders?.length ? (
          orders.orders.map((order) => {
            const orderItems = JSON.parse(order.items);
            return (
              <Card key={order.id} className="p-6" data-testid={`order-${order.id}`}>
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-semibold" data-testid="order-id">Order #{order.id.slice(0, 8)}</div>
                      <div className="text-sm text-gray-600" data-testid="order-details">
                        Amount: ₹{order.total} • Status: {order.status}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500" data-testid="order-date">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                  
                  {order.status === "completed" && (
                    <div>
                      <div className="font-semibold mb-2">Downloads</div>
                      <ul className="space-y-1">
                        {orderItems.map((item: any, index: number) => (
                          <li key={index}>
                            <a
                              href="#"
                              className="text-brand-700 hover:underline"
                              data-testid={`download-link-${index}`}
                            >
                              {item.title}.zip
                            </a>
                            <span className="text-xs text-gray-500 ml-2">
                              (expires in 30 days)
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {order.status !== "completed" && (
                    <p className="text-sm text-gray-600">
                      Downloads will be available once payment is confirmed.
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-16" data-testid="no-orders">
            <h2 className="font-display text-2xl mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here.</p>
            <Link href="/products" className="btn-primary">Browse Products</Link>
          </div>
        )}
      </div>
    </div>
  );
}
