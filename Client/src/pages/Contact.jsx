import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const contactInfo = [
  {
    icon: <FaPhoneAlt className="text-green-700" />,
    label: "Phone",
    value: "+91 98765 43210",
    link: "tel:+919876543210",
  },
  {
    icon: <FaEnvelope className="text-yellow-600" />,
    label: "Email",
    value: "dgore7078@gmail.com",
    link: "mailto:dgore7078@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt className="text-red-500" />,
    label: "Location",
    value: "Pune, Maharashtra, India",
    link: "https://goo.gl/maps/agrizone",
  },
];

const socialLinks = [
  { icon: <FaFacebook />, label: "Facebook", link: "https://facebook.com", color: "hover:text-blue-600" },
  { icon: <FaInstagram />, label: "Instagram", link: "https://instagram.com", color: "hover:text-pink-500" },
  { icon: <FaTwitter />, label: "Twitter", link: "https://twitter.com", color: "hover:text-blue-400" },
  { icon: <FaWhatsapp />, label: "WhatsApp", link: "https://wa.me/919876543210", color: "hover:text-green-500" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Dummy submit just resets the form
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Form submitted (frontend only)!");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-lime-100 via-yellow-50 to-white flex items-center justify-center p-6">
      <motion.div
        className="max-w-6xl w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6 md:p-10 border border-green-100 flex flex-col md:flex-row gap-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Contact Form */}
        <div className="flex-1">
          <h2 className="text-4xl font-extrabold text-green-800 mb-4">
            Contact <span className="text-yellow-600">Us</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We'd love to hear from you! Fill out the form below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full p-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-yellow-400 bg-lime-50/80 shadow-sm"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full p-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-yellow-400 bg-lime-50/80 shadow-sm"
            />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Mobile number (optional)"
              className="w-full p-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-yellow-400 bg-lime-50/80 shadow-sm"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Write your message here..."
              className="w-full p-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-yellow-400 bg-lime-50/80 shadow-sm resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white font-bold py-3 rounded-xl text-lg shadow-md hover:bg-yellow-700 transition"
            >
              <FaEnvelope className="inline mr-2" /> Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-green-50 via-yellow-50 to-white rounded-2xl p-8 border border-green-100">
          <h3 className="text-2xl font-bold text-green-800 mb-6">Reach Out</h3>
          <ul className="space-y-6 w-full">
            {contactInfo.map((info) => (
              <li key={info.label} className="flex items-center gap-4 text-lg text-green-900">
                <span className="text-2xl">{info.icon}</span>
                <a
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-600 transition-colors font-medium underline-offset-2 hover:underline"
                >
                  {info.value}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-6 mt-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`text-2xl text-green-700 hover:scale-110 transition-transform duration-200 ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <br />
        </div>
      </motion.div>
    </div>
  
  );
}
