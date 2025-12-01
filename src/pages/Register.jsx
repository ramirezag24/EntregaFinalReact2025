import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "", role: "client" });
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password || !form.confirm) return toast.error("Completá");
    if (form.password !== form.confirm) return toast.error("Contraseñas no coinciden");
    setLoading(true);
    try {
      // check email exists
      const chk = await fetch(`https://68cc450c716562cf5077160b.mockapi.io/usuarios?email=${form.email}`);
      const arr = await chk.json();
      if (arr.length > 0) { toast.error("Email ya registrado"); setLoading(false); return; }

      const res = await fetch("https://68cc450c716562cf5077160b.mockapi.io/usuarios", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ username: form.username, email: form.email, password: form.password, role: form.role })
      });
      if (!res.ok) throw new Error();
      toast.success("Registro OK. Redirigiendo al login");
      setTimeout(() => navigate("/login"), 1200);
    } catch {
      toast.error("Error al registrar");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-700">
      <div className="bg-white/10 p-8 rounded w-96 text-white">
        <h2 className="text-2xl mb-4">Crear cuenta</h2>
        <form onSubmit={submit} className="space-y-3">
          <input name="username" value={form.username} onChange={change} placeholder="Usuario" className="w-full p-2 rounded bg-white/20" />
          <input name="email" value={form.email} onChange={change} placeholder="Email" className="w-full p-2 rounded bg-white/20" />
          <input name="password" value={form.password} onChange={change} placeholder="Contraseña" type="password" className="w-full p-2 rounded bg-white/20" />
          <input name="confirm" value={form.confirm} onChange={change} placeholder="Confirmar contraseña" type="password" className="w-full p-2 rounded bg-white/20" />
          <select name="rol" value={form.rol} onChange={change} className="w-full p-2 rounded bg-white/20">
            <option value="client">Cliente</option>
            <option value="admin">Admin</option>
          </select>
          <button disabled={loading} className="w-full bg-indigo-600 p-2 rounded">{loading ? "Registrando..." : "Registrarme"}</button>
        </form>
      </div>
    </div>
  );
}
