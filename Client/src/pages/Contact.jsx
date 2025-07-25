import { useState } from 'react';
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const inputVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.11, duration: 0.5, ease: "easeOut" },
  }),
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    boxShadow: "0 4px 24px 0px rgba(34,197,94,.25)",
    transition: { duration: 0.25, ease: "easeOut" },
  },
  tap: { scale: 0.97 },
};

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
    value: "support@agrizone.com",
    link: "mailto:support@agrizone.com",
  },
  {
    icon: <FaMapMarkerAlt className="text-red-500" />,
    label: "Location",
    value: "Pune, Maharashtra, India",
    link: "https://goo.gl/maps/agrizone",
  },
];

const socialLinks = [
  {
    icon: <FaFacebook />,
    label: "Facebook",
    link: "https://facebook.com/agrizone",
    color: "hover:text-blue-600",
  },
  {
    icon: <FaInstagram />,
    label: "Instagram",
    link: "https://instagram.com/agrizone",
    color: "hover:text-pink-500",
  },
  {
    icon: <FaTwitter />,
    label: "Twitter",
    link: "https://twitter.com/agrizone",
    color: "hover:text-blue-400",
  },
  {
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    link: "https://wa.me/919876543210",
    color: "hover:text-green-500",
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', form);
    alert('Message sent successfully!');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-tr from-lime-100 via-yellow-50 to-white flex items-center justify-center p-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="max-w-6xl w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-0 md:p-10 border border-green-100 flex flex-col md:flex-row gap-0 md:gap-10"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex-1 p-8 md:p-0 md:pr-8 flex flex-col justify-center">
          <motion.h2
            className="text-4xl font-extrabold text-center md:text-left text-green-800 mb-5 drop-shadow-lg"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 4, ease: "easeOut" }}
          >
            Contact <span className="text-yellow-600">Us</span>
          </motion.h2>
          <motion.p
            className="text-center md:text-left text-lg text-yellow-700 mb-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            We'd love to hear from you! Fill out the form below and our team will get back to you soon.
          </motion.p>
          <form onSubmit={handleSubmit} className="space-y-3">
            {[
              {
                label: "Name",
                type: "text",
                name: "name",
                placeholder: "Your name",
                required: true,
                value: form.name,
              },
              {
                label: "Email",
                type: "email",
                name: "email",
                placeholder: "you@example.com",
                required: true,
                value: form.email,
              },
              {
                label: "Phone",
                type: "tel",
                name: "phone",
                placeholder: "Mobile number (optional)",
                required: false,
                value: form.phone,
              },
            ].map((field, i) => (
              <motion.div key={field.name} custom={i} variants={inputVariants} initial="hidden" animate="visible">
                <label className="block text-sm font-semibold text-green-800 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full mt-1 p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-lime-50/80 placeholder:text-gray-400 transition shadow-sm"
                  placeholder={field.placeholder}
                />
              </motion.div>
            ))}
            <motion.div custom={3} variants={inputVariants} initial="hidden" animate="visible">
              <label className="block text-sm font-semibold text-green-800 mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full mt-1 p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-lime-50/80 placeholder:text-gray-400 transition shadow-sm resize-none"
                placeholder="Write your message here..."
              ></textarea>
            </motion.div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r bg-yellow-600 text-white font-bold py-3 rounded-xl text-lg shadow-xl transition-all flex items-center justify-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
            >
              <FaEnvelope className="text-xl " />
              Send Message
            </motion.button>
          </form>
        </div>
        <div className="flex-1 bg-gradient-to-br from-green-50/80 via-yellow-50/80 to-white/80 rounded-b-3xl md:rounded-3xl flex flex-col justify-center items-center p-8 border-t md:border-t-0 md:border-l border-green-100 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-green-200 via-yellow-100 to-white rounded-full opacity-30 blur-2xl pointer-events-none"></div>
          <h3 className="text-2xl font-bold text-green-800 mb-6 drop-shadow">Reach Out</h3>
          <ul className="space-y-8 mb-8 w-full">
            {contactInfo.map((info, idx) => (
              <li key={info.label} className="flex items-center gap-4 text-lg text-green-900 group">
                <span className="text-2xl group-hover:scale-125 transition-transform">{info.icon}</span>
                <a
                  className="hover:text-yellow-600 transition-colors font-medium underline-offset-2 hover:underline"
                >
                  {info.value}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-10 ">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`text-3xl text-green-700 hover:scale-125 transition-transform duration-200 ${social.color} shadow-md rounded-full p-2 bg-white/70 hover:bg-white`}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-100 via-green-100 to-white rounded-full opacity-20 blur-2xl pointer-events-none"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
