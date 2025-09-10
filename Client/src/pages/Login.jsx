import { useState } from "react";
import axios from "axios";
import { saveAuth, getToken, getRole, clearAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const roles = [
  { key: "farmer", label: "Farmer" },
  { key: "customer", label: "Customer" },
  { key: "admin", label: "Admin" },
];

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [role, setRole] = useState("farmer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { ...form, role });
      saveAuth(res.data);
      alert("✅ Login successful");

      // Redirect per role
      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "farmer") navigate("/farmer-dashboard");
      else navigate("/customer-dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-lime-100 via-yellow-50 to-white p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Welcome Back</h2>

        {/* Role Selector */}
        <div className="flex gap-2 mb-6">
          {roles.map(r => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRole(r.key)}
              className={`px-4 py-2 rounded-xl border transition ${
                role === r.key ? "bg-green-600 text-white border-green-600" : "bg-white text-green-700 border-green-300 hover:border-green-600"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : `Login as ${roles.find(r => r.key === role).label}`}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-5">
          Don’t have an account?{" "}
          <a href="/register" className="text-green-600 font-medium hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
