import { motion } from "framer-motion";

const features = [
  {
    icon: "🌱",
    title: "Sustainable Farming",
    desc: "Ecological methods focused on biodiversity and soil health.",
  },
  {
    icon: "🌾",
    title: "Crop Expertise",
    desc: "Guidance on crop rotation, selection, and cutting-edge agro-techniques.",
  },
  {
    icon: "🚜",
    title: "Modern Equipment",
    desc: "Access to the latest machinery for increased productivity.",
  },
  {
    icon: "🤝",
    title: "Community Outreach",
    desc: "Empowering local farmers and sharing agricultural knowledge.",
  },
  {
    icon: "🌻",
    title: "Organic Products",
    desc: "Premium, chemical-free harvest delivered fresh from our fields.",
  },
  {
    icon: "💧",
    title: "Water Conservation",
    desc: "Advanced irrigation practices to preserve water resources.",
  },
];

const highlights = [
  "500+ Acres Nurtured",
  "200+ Partner Farmers",
  "10 Years Building Sustainable Agriculture",
  "30% Water Usage Reduced",
  "100% Organic Produce",
  "5,000+ Happy Customers",
  "50+ Community Workshops",
];

const container = {
  show: {
    opacity: 1,
    transition: { ease: "easeInOut", duration: 0.7 },
  },
};

const featureCardVariants = {
  hidden: { opacity: 0, y: 60, scale: 2 },
  show: {
    opacity: 1,
 
   
  },
  hover: {
    scale: 1.1,
    boxShadow: "0 8px 30px 0 rgba(56, 161, 105, 0.22)",
    transition: {  ease: "easeInOut" },
  },
};

const iconAnimation = {
  animate: {
    scale: [1, 1.23, 1],
    rotate: [0, 12, -12, 0],
    transition: {
      repeat: Infinity,
      duration: 4,
      ease: "easeInOut",
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -32 },
  show: i => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.18 + i * 0.13, duration: 0.47, ease: "easeOut" },
  }),
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.07,
    boxShadow: "0 4px 24px 0px rgba(50,160,100,.37)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const About = () => (
  <motion.section
    className="min-h-screen font-sans px-4 sm:px-8 py-14 bg-gradient-to-tr from-lime-50 via-yellow-50 to-white flex flex-col"
    initial="hidden"
    animate="show"
    variants={container}
  >

    <motion.div className="text-center mb-12" variants={fadeUp}>
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-green-900 drop-shadow mb-3"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        About{" "}
        <motion.span
          className="text-yellow-600"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Us
        </motion.span>
      </motion.h1>
      <motion.p
        className="text-yellow-700 max-w-2xl mx-auto text-lg md:text-xl font-medium pb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="block">Cultivating growth, sustainability, and healthy communities.</span>
        <span className="text-green-800 font-semibold block mt-1">Your trusted partner in modern agriculture.</span>
      </motion.p>
    </motion.div>

    <motion.div
      className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
      variants={container}
    >
      {features.map((feature, idx) => (
        <motion.div
          key={feature.title}
          className=" border border-green-100 shadow-xl rounded-3xl px-8 py-10 flex flex-col items-center cursor-pointer  transition-all duration-300 "
          variants={featureCardVariants}
          whileHover="hover"
        >
          <motion.span
            className="text-5xl mb-4 drop-shadow"
            aria-label={feature.title}
            role="img"
            variants={iconAnimation}
            animate="animate"
          >
            {feature.icon}
          </motion.span>
          <motion.h2
            className="text-lg font-bold text-green-800 mb-1 tracking-wide"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.11 * idx, duration: 0.47 }}
          >
            {feature.title}
          </motion.h2>
          <motion.p
            className="text-green-700 text-center text-base max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.16 * idx + 0.22, duration: 0.56 }}
          >
            {feature.desc}
          </motion.p>
        </motion.div>
      ))}
    </motion.div>

    <motion.blockquote
      className="max-w-2xl mx-auto bg-gradient-to-r from-green-600 via-lime-500 to-green-700 text-white rounded-3xl px-8 py-8 shadow-2xl text-center mb-14 border border-green-600"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
    >
      <span className="block text-xl md:text-2xl font-semibold mb-2 cursor-pointer">Our Promise</span>
      <span className="not-italic block text-lg md:text-xl">
        Ethical farming, innovative solutions, and unwavering dedication to a greener, sustainable, and healthier future for all.
      </span>
    </motion.blockquote>

    <motion.section
      className="text-center mb-14"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <motion.h3
        className="text-2xl md:text-3xl font-bold text-green-800 mb-7 tracking-wide"
        variants={fadeUp}
      >
        Our Journey in Numbers
      </motion.h3>
      <ul className="flex flex-wrap justify-center gap-4 md:gap-7 mx-auto">
  {highlights.map((item, idx) => (
    <motion.li
      className="moving-border flex items-center text-base md:text-lg text-yellow-900 font-semibold bg-yellow-50 rounded-full px-5 py-2 shadow select-none border border-yellow-200 cursor-pointer hover:bg-yellow-100 transition-colors duration-200"
      key={item}
      custom={idx}
      variants={listItemVariants}
      initial="hidden"
      animate="show"
    >
      <span className="mr-2 text-yellow-300 text-2xl animate-pulse">
        ★
      </span>
      {item}
    </motion.li>
  ))}
</ul>
    </motion.section>

    <motion.div className="text-center">
      <motion.a
        href="/contact"
        className="bg-green-800 text-white px-7 py-4 text-2xl hover:bg-green-700 rounded-full font-semibold shadow-lg transition-colors duration-300"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
      >
        Connect With Us
      </motion.a>
    </motion.div>
  </motion.section>
);

export default About;
