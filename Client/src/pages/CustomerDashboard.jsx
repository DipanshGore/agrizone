import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { clearAuth } from "../utils/auth";

export default function CustomerDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        clearAuth();
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Customer Dashboard</h1>

      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <h2 className="text-lg font-semibold text-green-700 mb-3">
          Profile Summary
        </h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <button
        onClick={handleLogout}
        className="w-full py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
