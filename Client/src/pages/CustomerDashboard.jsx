import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { clearAuth } from "../utils/auth";

export default function CustomerDashboard() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          contact: res.data.contact || "",
          address: res.data.address || "",
        });
      })
      .catch(() => {
        clearAuth();
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async () => {
    try {
      const res = await api.put("/customer/me", formData); // 👈 backend must accept address
      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!user) return <p className="p-6 text-gray-600">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 relative">
      {/* Profile Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-2xl p-6 relative">
        {/* Logout */}
        <div className="absolute top-6 right-6">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition"
          >
            🚪 Logout
          </button>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold mb-4 text-blue-800">
          🛒 Customer Dashboard
        </h1>
        <h2 className="text-lg font-semibold text-blue-700 mb-4">
          Profile Summary
        </h2>

        {/* Editable Fields */}
        <div className="p-6 bg-white shadow-xl rounded-2xl border border-gray-200 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            ) : (
              <p className="text-blue-800 text-lg">{user.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            ) : (
              <p className="text-blue-800 text-lg">{user.email}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Contact</label>
            {editMode ? (
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            ) : (
              <p className="text-blue-800 text-lg">
                {user.contact || "Not provided"}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            {editMode ? (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            ) : (
              <p className="text-blue-800 text-lg">
                {user.address || "Not provided"}
              </p>
            )}
          </div>
        </div>

        {/* Buttons Section */}
        <div className="mt-6 flex gap-4">
          {editMode ? (
            <>
              <button
                onClick={handleProfileUpdate}
                className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition"
              >
                ✅ Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-2.5 bg-gray-400 text-white font-medium rounded-lg shadow hover:bg-gray-500 transition"
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-lg shadow hover:scale-105 hover:shadow-lg transition-transform duration-200"
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
