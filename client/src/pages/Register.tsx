import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import api from "../lib/api";

export default function Register() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [form, setForm] = useState({ name: "", email: "", password: "", username: "" });
  const { toast } = useToast();

  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await api.post("/auth/register", userData);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.token, data.user);
      toast({
        title: "Account created successfully!",
        description: "Welcome to XPR Media Agency.",
      });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({
      ...form,
      username: form.email, // Use email as username
    });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <Card className="p-6" data-testid="register-card">
        <CardContent className="p-0">
          <h1 className="font-display text-2xl font-bold mb-6" data-testid="register-title">Create an account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              data-testid="input-name"
            />
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
              disabled={registerMutation.isPending}
              data-testid="register-button"
            >
              {registerMutation.isPending ? "Please wait..." : "Create Account"}
            </Button>
          </form>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-700 font-semibold hover:underline" data-testid="login-link">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
