import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { clearAuth } from "../utils/auth";
import { BASE_URL } from "../utils/api"; // 👈 still needed for image URLs


export default function FarmerDashboard() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [crops, setCrops] = useState([]);
  const [newCrop, setNewCrop] = useState({ name: "", category: "", quantity: "", price: "", description: "", cropImage: null });
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

  // Upload new profile picture
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file); // 👈 must match multer field in backend

    try {
      const res = await api.put("/farmer/me/profile-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data); // ✅ update state with new image
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("❌ Error uploading image");
    }
  };

  // Remove profile picture
  const handleRemoveImage = async () => {
    try {
      const res = await api.delete("/farmer/me/profile-picture");
      setUser(res.data);
    } catch (err) {
      console.error("Remove error:", err.response?.data || err.message);
      alert("❌ Error removing image");
    }
  };



  // Add new crop (with FormData upload including image)
  const handleAddCrop = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(newCrop).forEach((key) => {
        // only append the file if present, otherwise skip for undefined/null
        if (key === 'cropImage') {
          if (newCrop.cropImage) formData.append('cropImage', newCrop.cropImage);
        } else {
          formData.append(key, newCrop[key]);
        }
      });
      const res = await api.post("/crops", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCrops([...crops, res.data]);
      setNewCrop({ name: "", category: "", quantity: "", price: "", description: "", cropImage: null });
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

        {/* Profile Section - Flex Row */}
        <div className="flex flex-col md:flex-row items-start gap-10 mb-6 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">

          {/* Left - Profile Picture */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
            <div className="relative">
              <img
                src={
                  user?.profileImage
                    ? `${BASE_URL}${user.profileImage}`
                    : "/default-avatar.png"
                }
                alt="Profile"
                className="w-44 h-52 rounded-2xl object-cover shadow-lg border-4 border-green-200"
              />
              {editMode && (
                <label className="absolute bottom-2 right-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs rounded-md cursor-pointer shadow-md transition">
                  📷 Change
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {editMode && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-3 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200"
              >
                ❌ Remove Photo
              </button>
            )}
          </div>

          {/* Right - Profile Info */}
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              👤 Profile Information
            </h2>

            {editMode ? (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={user.name || ""}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={user.email || ""}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition"
                />
                <input
                  type="text"
                  placeholder="Enter Your Contact Number"
                  value={user.farmerDetails?.contact || ""}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      farmerDetails: {
                        ...(user.farmerDetails || { location: "" }),
                        contact: e.target.value,
                      },
                    })
                  }
                  className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition"
                />
              </div>
            ) : (
              <div className="space-y-2 text-lg">
                <p>
                  <span className="font-semibold text-gray-700">Name:</span>{" "}
                  <span className="text-green-800">{user.name}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Email:</span>{" "}
                  <span className="text-green-800">{user.email}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Contact:</span>{" "}
                  <span className="text-green-800">
                    {user.farmerDetails?.contact || "Not provided"}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Buttons Section */}
        <div className="mt-6 flex gap-4">
          {editMode ? (
            <>
              <button
                onClick={handleProfileUpdate}
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-700 text-white font-medium rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200"
              >
                ✅ Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-2.5 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-medium rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200"
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200"
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Crop Listings */}
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-xl font-bold text-green-700 mb-6 flex items-center gap-2">
          🌾 Crop Listings
        </h2>

        {/* Add New Crop */}
        <form
          onSubmit={handleAddCrop}
          className="grid md:grid-cols-2 gap-4 mb-8 bg-green-50 p-4 rounded-xl shadow-sm"
        >
          <input
            type="text"
            placeholder="Crop Name"
            value={newCrop.name}
            onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newCrop.category}
            onChange={(e) => setNewCrop({ ...newCrop, category: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="number"
            placeholder="Quantity (kg)"
            value={newCrop.quantity}
            onChange={(e) => setNewCrop({ ...newCrop, quantity: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={newCrop.price}
            onChange={(e) => setNewCrop({ ...newCrop, price: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewCrop({ ...newCrop, cropImage: e.target.files[0] })
            }
            className="md:col-span-2"
          />
          <textarea
            placeholder="Description"
            value={newCrop.description}
            onChange={(e) =>
              setNewCrop({ ...newCrop, description: e.target.value })
            }
            className="md:col-span-2 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
          <button
            type="submit"
            className="md:col-span-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-700 text-white text-sm font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200 w-fit"
          >
            ➕ Add Crop
          </button>
        </form>

        {/* Crop List */}
        {crops.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {crops.map((crop) => (
              <div
                key={crop._id}
                className="p-5 border rounded-2xl shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-green-50 to-white"
              >
                {/* Crop Image */}
                {crop.cropImage && (
                  <img
                    src={`${BASE_URL}${crop.cropImage}`}
                    alt={crop.name}
                    className="w-full h-50 object-cover rounded-lg mb-3 shadow-md"
                  />
                )}

                {editingCrop && editingCrop._id === crop._id ? (
                  <form onSubmit={handleEditCrop} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Crop Name"
                      value={editingCrop.name}
                      onChange={(e) =>
                        setEditingCrop({ ...editingCrop, name: e.target.value })
                      }
                      className="w-full border p-2 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Quantity (kg)"
                      value={editingCrop.quantity}
                      onChange={(e) =>
                        setEditingCrop({
                          ...editingCrop,
                          quantity: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Price (₹)"
                      value={editingCrop.price}
                      onChange={(e) =>
                        setEditingCrop({ ...editingCrop, price: e.target.value })
                      }
                      className="w-full border p-2 rounded-lg"
                    />
                    <textarea
                      placeholder="Description"
                      value={editingCrop.description}
                      onChange={(e) =>
                        setEditingCrop({
                          ...editingCrop,
                          description: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded-lg"
                    />
                    <div className="flex gap-2 mt-3">
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCrop(null)}
                        type="button"
                        className="px-4 py-1.5 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3 className="font-bold text-lg text-green-800 flex items-center gap-2">
                      {crop.name}
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                        {crop.category}
                      </span>
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                        {crop.quantity} kg
                      </span>
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                        ₹{crop.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                      {crop.description || "No description"}
                    </p>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => setEditingCrop(crop)}
                        className="px-4 py-1.5 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCrop(crop._id)}
                        className="px-4 py-1.5 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center italic mt-4">
            No crops listed yet.
          </p>
        )}
      </div>

    </div>
  );
}
