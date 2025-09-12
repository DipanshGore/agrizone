import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { clearAuth } from "../utils/auth";

export default function FarmerDashboard() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [crops, setCrops] = useState([]);
  const [newCrop, setNewCrop] = useState({ name: "", category: "", quantity: "", price: "", description: "" });
  const [editingCrop, setEditingCrop] = useState(null); // crop being edited
  const navigate = useNavigate();

  // Fetch user + crops on load
  useEffect(() => {
    api.get("/farmer/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        clearAuth();
        navigate("/login");
      });

    api.get("/crops")
      .then((res) => setCrops(res.data))
      .catch(() => setCrops([]));
  }, [navigate]);

  // Logout
  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  // Update profile
  const handleProfileUpdate = async () => {
    try {
      const res = await api.put("/farmer/me", user);
      setUser(res.data);
      setEditMode(false);
      alert("✅ Profile updated!");
    } catch {
      alert("❌ Error updating profile");
    }
  };

  // Add new crop
  const handleAddCrop = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/crops", newCrop);
      setCrops([...crops, res.data]);
      setNewCrop({ name: "", category: "", quantity: "", price: "", description: "" });
    } catch {
      alert("❌ Error adding crop");
    }
  };

  // Update crop
  const handleEditCrop = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/crops/${editingCrop._id}`, editingCrop);
      setCrops(crops.map(c => c._id === editingCrop._id ? res.data : c));
      setEditingCrop(null);
    } catch {
      alert("❌ Error updating crop");
    }
  };

  // Delete crop
  const handleDeleteCrop = async (id) => {
    try {
      await api.delete(`/crops/${id}`);
      setCrops(crops.filter(c => c._id !== id));
    } catch {
      alert("❌ Error deleting crop");
    }
  };

  if (!user) return <p className="p-6 text-gray-600">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 relative">
      {/* Profile Summary */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 shadow-lg rounded-2xl p-6 relative">
        <div className="absolute top-6 right-6">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition"
          >
            🚪 Logout
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-green-800">🧑‍🌾 Farmer Dashboard</h1>
        <h2 className="text-lg font-semibold text-green-700 mb-4">Profile Summary</h2>

        {/* Editable Profile */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            {editMode ? (
              <>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={user.name || ""}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full border p-2 rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={user.email || ""}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full border p-2 rounded mb-2"
                />
                
                <input
                  type="text"
                  placeholder="Enter Your Contact Number"
                  value={user.farmerDetails?.contact || ""}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      farmerDetails: {
                        ...(user.farmerDetails || { location: "" }), // ensure object exists
                        contact: e.target.value,
                      },
                    })
                  }
                  className="w-full border p-2 rounded mb-2"
                />
              </>
            ) : (
              <>
                <p className="mb-2">
                  <span className="font-semibold">Name:</span> {user.name}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Contact:</span>{" "}
                  {user.farmerDetails?.contact || "Not provided"}
                </p>
              </>
            )}
          </div>
        </div>


        <div className="mt-5 flex gap-3">
          {editMode ? (
            <>
              <button
                onClick={handleProfileUpdate}
                className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-5 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Crop Listings */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-green-700 mb-5">🌾 Crop Listings</h2>

        {/* Add New Crop */}
        <form onSubmit={handleAddCrop} className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Crop Name"
            value={newCrop.name}
            onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newCrop.category}
            onChange={(e) => setNewCrop({ ...newCrop, category: e.target.value })}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="Quantity (kg)"
            value={newCrop.quantity}
            onChange={(e) => setNewCrop({ ...newCrop, quantity: e.target.value })}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={newCrop.price}
            onChange={(e) => setNewCrop({ ...newCrop, price: e.target.value })}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <textarea
            placeholder="Description"
            value={newCrop.description}
            onChange={(e) => setNewCrop({ ...newCrop, description: e.target.value })}
            className="md:col-span-2 w-full border p-2 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="md:col-span-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg shadow hover:bg-green-700 transition w-fit"
          >
            ➕ Add Crop
          </button>
        </form>

        {/* Crop List */}
        {crops.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {crops.map((crop) => (
              <div key={crop._id} className="p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-green-50">
                {editingCrop && editingCrop._id === crop._id ? (
                  <form onSubmit={handleEditCrop} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Crop Name"
                      value={editingCrop.name}
                      onChange={(e) => setEditingCrop({ ...editingCrop, name: e.target.value })}
                      className="w-full border p-2 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Quantity (kg)"
                      value={editingCrop.quantity}
                      onChange={(e) => setEditingCrop({ ...editingCrop, quantity: e.target.value })}
                      className="w-full border p-2 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Price (₹)"
                      value={editingCrop.price}
                      onChange={(e) => setEditingCrop({ ...editingCrop, price: e.target.value })}
                      className="w-full border p-2 rounded-lg"
                    />
                    <textarea
                      placeholder="Description"
                      value={editingCrop.description}
                      onChange={(e) => setEditingCrop({ ...editingCrop, description: e.target.value })}
                      className="w-full border p-2 rounded-lg"
                    />
                    <div className="flex gap-2 mt-2">
                      <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Save</button>
                      <button onClick={() => setEditingCrop(null)} type="button" className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3 className="font-semibold text-lg text-green-800">
                      {crop.name} <span className="text-sm text-gray-500">({crop.category})</span>
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">{crop.quantity} kg • ₹{crop.price}</p>
                    <p className="text-sm text-gray-600 mt-2">{crop.description || "No description"}</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => setEditingCrop(crop)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCrop(crop._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No crops listed yet.</p>
        )}
      </div>
    </div>
  );
}
