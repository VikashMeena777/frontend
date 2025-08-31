import React, { useContext, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault(); setLoading(true);
        try {
            const { data } = await API.post("/auth/register", form);
            if (data.token) login(data.token, data.user);
            nav("/dashboard");
        } catch (err) {
            alert(err?.response?.data?.message || "Registration failed");
        } finally { setLoading(false); }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-14">
            <div className="card p-6">
                <h1 className="font-display text-2xl">Create an account</h1>
                <form onSubmit={submit} className="grid gap-3 mt-5">
                    <input className="border rounded-xl px-3 py-2" placeholder="Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    <input className="border rounded-xl px-3 py-2" placeholder="Email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    <input className="border rounded-xl px-3 py-2" placeholder="Password" type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                    <button className="btn-primary" disabled={loading}>{loading ? "Please wait..." : "Register"}</button>
                </form>
            </div>
        </div>
    );
}
