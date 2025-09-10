import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const roles = [
  { key: "farmer", label: "Farmer" },
  { key: "customer", label: "Customer" },
  { key: "admin", label: "Admin" },
];

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [role, setRole] = useState("farmer");
  const [farmerDetails, setFarmerDetails] = useState({ farmName: "", farmLocation: "", crops: "" });
  const [customerDetails, setCustomerDetails] = useState({ address: "" });
  const [adminDetails, setAdminDetails] = useState({ businessName: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      role,
      ...(role === "farmer" && {
        farmerDetails: {
          farmName: farmerDetails.farmName || undefined,
          farmLocation: farmerDetails.farmLocation || undefined,
          crops: farmerDetails.crops ? farmerDetails.crops.split(",").map(s => s.trim()) : [],
        },
      }),
      ...(role === "customer" && { customerDetails }),
      ...(role === "admin" && { adminDetails }),
    };

    try {
      await axios.post("http://localhost:5000/api/auth/register", payload);
      alert("✅ Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-lime-100 via-yellow-50 to-white p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Create Account</h2>

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
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
            />
          </div>

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
              placeholder="Enter a strong password"
            />
          </div>

          {/* Conditional Fields */}
          {role === "farmer" && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Farm Name</label>
                <input
                  value={farmerDetails.farmName}
                  onChange={(e) => setFarmerDetails({ ...farmerDetails, farmName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Green Valley"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Farm Location</label>
                <input
                  value={farmerDetails.farmLocation}
                  onChange={(e) => setFarmerDetails({ ...farmerDetails, farmLocation: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="City / Village"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-700 mb-1">Crops (comma separated)</label>
                <input
                  value={farmerDetails.crops}
                  onChange={(e) => setFarmerDetails({ ...farmerDetails, crops: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="Wheat, Rice, Maize"
                />
              </div>
            </div>
          )}

          {role === "customer" && (
            <div>
              <label className="block text-gray-700 mb-1">Address</label>
              <input
                value={customerDetails.address}
                onChange={(e) => setCustomerDetails({ address: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500"
                placeholder="Shipping address"
              />
            </div>
          )}

          {role === "admin" && (
            <div>
              <label className="block text-gray-700 mb-1">Business Name</label>
              <input
                value={adminDetails.businessName}
                onChange={(e) => setAdminDetails({ businessName: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500"
                placeholder="Company / Org"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Registering..." : `Register as ${roles.find(r => r.key === role).label}`}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 font-medium hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
