import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { clearAuth, getToken } from "../utils/auth";

export default function CustomerDashboard() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login"); // Redirect if no token
      return;
    }

    api
      .get("/customer/me")
      .then((res) => {
        setUser(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          contact: res.data.contact || "",
          address: res.data.address || "",
        });
      })
      .catch((err) => {
        console.error("Fetch profile failed:", err.response?.data || err);
        clearAuth();
        navigate("/login"); // Redirect on invalid token
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async () => {
  setLoading(true);
  try {
    const res = await api.put("/customer/me", formData);
    setUser(res.data);       // <-- safe now
    setEditMode(false);
  } catch (err) {
    console.error("Update failed:", err.response?.data || err);
    alert("Failed to update profile.");
  } finally {
    setLoading(false);
  }
};


  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (!user) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 relative">
      {/* Logout button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition"
        >
          🚪 Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-4 text-blue-800">🛒 Customer Dashboard</h1>

      {/* Profile Form */}
      <div className="p-6 bg-white shadow-xl rounded-2xl border border-gray-200 space-y-4">
        {["name", "email", "contact", "address"].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 font-medium mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            {editMode ? (
              field === "address" ? (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              ) : (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              )
            ) : (
              <p className="text-blue-800 text-lg">{user[field] || "Not provided"}</p>
            )}
          </div>
        ))}
      </div>

      

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        {editMode ? (
          <>
            <button
              onClick={handleProfileUpdate}
              className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? "Saving..." : "✅ Save"}
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
  );
}
