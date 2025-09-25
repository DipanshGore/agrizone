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
    setUsers(users.map((u) => (u._id === id ? res.data : u)));
  };

  const deleteUser = async (id) => {
    await api.delete(`/admin/users/${id}`);
    setUsers(users.filter((u) => u._id !== id));
  };

  // group users by role
  const grouped = {
    farmers: users.filter((u) => u.role === "farmer"),
    customers: users.filter((u) => u.role === "customer"),
    admins: users.filter((u) => u.role === "admin"),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top Bar with Title + Logout */}
      <div className="flex justify-between items-center mb-8 px-4">
        <h1 className="text-3xl font-bold text-green-700">
          🧑‍💼 Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="group relative flex items-center px-4 py-2 cursor-pointer bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
        >
          {/* Normal text */}
          <span className="group-hover:hidden">Logout</span>

          {/* Hover text with dots animation */}
          <span className="hidden group-hover:flex items-center">
            Logging out
            <span className="ml-1 animate-typing-dots">...</span>
          </span>
        </button>


      </div>


      {/* User Groups */}
      <div className="grid grid-cols-1 gap-6">
        {["farmers", "customers", "admins"].map((roleKey) => (
          <div
            key={roleKey}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6"
          >
            <h2 className="text-xl font-semibold text-green-700 mb-4 capitalize">
              {roleKey}
            </h2>

            <ul className="space-y-4">
              {grouped[roleKey].length > 0 ? (
                grouped[roleKey].map((u) => (
                  <li
                    key={u._id}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <span className="font-medium text-gray-700">
                      👤 {u.name}{" "}
                      {u.role === "admin" ? "🛡️" : u.approved ? "✅" : "❌"}
                    </span>

                    {u.role !== "admin" && (
                      <div className="space-x-2">
                        {!u.approved && (
                          <button
                            onClick={() => approveUser(u._id)}
                            className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => deleteUser(u._id)}
                          className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No users found.</p>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
