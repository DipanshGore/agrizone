import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { clearAuth } from "../utils/auth";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/users") // 👈 admin-only route
      .then((res) => setUsers(res.data))
      .catch(() => {
        clearAuth();
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧑‍💼 Admin Dashboard</h1>

      {/* User Management */}
      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <h2 className="text-lg font-semibold text-green-700 mb-3">
          User Management
        </h2>
        <ul className="space-y-2">
          {users.map((u) => (
            <li key={u._id} className="flex justify-between items-center">
              <span>👤 {u.role}: {u.name}</span>
              <div className="space-x-2">
                <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Approve
                </button>
                <button className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                  Suspend
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
