import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import api from "../lib/api";

export default function Login() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.token, data.user);
      toast({
        title: "Login successful!",
        description: "Welcome back to XPR Media Agency.",
      });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(form);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <Card className="p-6" data-testid="login-card">
        <CardContent className="p-0">
          <h1 className="font-display text-2xl font-bold mb-6" data-testid="login-title">Welcome back</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              data-testid="input-email"
            />
            <Input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              data-testid="input-password"
            />
            <Button
              type="submit"
              className="btn-primary w-full"
              disabled={loginMutation.isPending}
              data-testid="login-button"
            >
              {loginMutation.isPending ? "Please wait..." : "Login"}
            </Button>
          </form>
          <p className="text-sm text-gray-600 mt-4 text-center">
            No account?{" "}
            <Link href="/register" className="text-brand-700 font-semibold hover:underline" data-testid="register-link">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
