import React, { useContext, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault(); setLoading(true);
        try {
            const { data } = await API.post("/auth/login", form);
            login(data.token, data.user);
            nav("/dashboard");
        } catch (err) {
            alert(err?.response?.data?.message || "Login failed");
        } finally { setLoading(false); }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-14">
            <div className="card p-6">
                <h1 className="font-display text-2xl">Welcome back</h1>
                <form onSubmit={submit} className="grid gap-3 mt-5">
                    <input className="border rounded-xl px-3 py-2" placeholder="Email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    <input className="border rounded-xl px-3 py-2" placeholder="Password" type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                    <button className="btn-primary" disabled={loading}>{loading ? "Please wait..." : "Login"}</button>
                </form>
                <p className="text-sm text-gray-600 mt-3">No account? <Link to="/register" className="text-brand-700 font-semibold">Create one</Link></p>
            </div>
        </div>
    );
}
