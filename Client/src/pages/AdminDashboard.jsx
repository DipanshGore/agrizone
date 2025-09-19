import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { clearAuth } from "../utils/auth";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/users")
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

  const approveUser = async (id) => {
    const res = await api.patch(`/admin/users/${id}/approve`);
    setUsers(users.map(u => u._id === id ? res.data : u));
  };

  const deleteUser = async (id) => {
    await api.delete(`/admin/users/${id}`);
    setUsers(users.filter(u => u._id !== id));
  };

  // group users by role
  const grouped = {
    farmers: users.filter(u => u.role === "farmer"),
    customers: users.filter(u => u.role === "customer"),
    admins: users.filter(u => u.role === "admin"),
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🧑‍💼 Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["farmers", "customers", "admins"].map((roleKey) => (
          <div key={roleKey} className="bg-white shadow rounded-xl p-5">
            <h2 className="text-lg font-semibold text-green-700 mb-3 capitalize">
              {roleKey}
            </h2>
            <ul className="space-y-3">
              {grouped[roleKey].map((u) => (
                <li key={u._id} className="flex justify-between items-center">
                  <span>
                    👤 {u.name}{" "}
                    {u.role === "admin" ? "🛡️" : (u.approved ? "✅" : "❌")}
                  </span>
                  {/* Only show controls for non-admins */}
                  {u.role !== "admin" && (
                    <div className="space-x-2">
                      {!u.approved && (
                        <button
                          onClick={() => approveUser(u._id)}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="w-full mt-8 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
