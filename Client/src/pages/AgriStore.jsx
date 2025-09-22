import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getRole, isApproved } from "../utils/auth";
import { motion } from "framer-motion";

export default function AgriStore() {
  const role = getRole();
  const approved = isApproved();
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [user, setUser] = useState(null);

  // Auto-stop confetti after 5s
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  useEffect(() => {
    // Load user from localStorage when page loads
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // If not logged in
  if (!role) {
    if (!showLoginMessage && !redirectToLogin) {
      setShowLoginMessage(true);
      setShowConfetti(true);

      // after 4s redirect
      setTimeout(() => {
        setRedirectToLogin(true);
      }, 4000);
    }

    if (redirectToLogin) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center border border-gray-200">
          <h1 className="text-2xl font-semibold text-red-600 mb-2">
            ⚠️ Please Login First
          </h1>
          <p className="text-gray-600 mb-6">
            You’ll need to log in to access this page. Redirecting you shortly...
          </p>

          {/* Subtle Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-500 to-yellow-500 animate-progress" />
          </div>

          {/* Small text hint */}
          <p className="text-xs text-gray-400 mt-3">Taking you to login page ⏳</p>
        </div>
      </div>

    );
  }

  // If not admin and not approved
  if (role !== "admin" && !approved) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied 🚫</h1>
          <p className="mt-2 text-gray-700">
            Your account is pending admin approval. Please wait until you are approved.
          </p>
        </div>
      </div>
    );
  }

  // Allowed access (Grand Welcome 🎉)
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-green-100 to-green-200 relative overflow-hidden">
      <div className="text-center space-y-8">

        {/* Seed sprouting */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mx-auto w-24 h-24 bg-green-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="text-4xl text-white">🌱</span>
        </motion.div>

        {/* Heading with sunrise effect */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-5xl font-extrabold bg-clip-text text-transparent 
                 bg-gradient-to-r from-green-700 via-yellow-600 to-orange-600 tracking-tight"
        >
          Welcome  <span className="text-green-700">to  AgriStore</span> 
          {user?.name && (
            <span className="ml-2 text-green-900">{user.name} 🌱</span>
          )}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-gray-700 text-lg max-w-lg mx-auto leading-relaxed"
        >
          Cultivating connections, knowledge, and growth for the future of farming.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <button className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition">
            Start Exploring
          </button>
        </motion.div>
      </div>
    </div>

  );
}
