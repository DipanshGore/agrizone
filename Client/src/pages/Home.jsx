import { FaStar, FaCheckCircle, } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import video from "../assets/Agriculture.mp4";
import { useEffect } from "react";

const features = [
  {
    title: "Reliable Farm Equipment",
    description: "High-quality agricultural machinery designed to boost your farm’s productivity and efficiency.",
    icon: "🚜",
    link: "/equipment",
  },
  {
    title: "Fresh & Organic Produce",
    description: "Connect with local farmers for fresh, organic, and sustainable produce delivered to your doorstep.",
    icon: "🥦",
    link: "/produce",
  },
  {
    title: "Expert Agricultural Advice",
    description: "Get farming tips, crop planning assistance, and sustainable agriculture consultation.",
    icon: "🌱",
    link: "/advice",
  },
  {
    title: "Sustainable Farming Solutions",
    description: "Promoting eco-friendly farming methods to protect our planet for future generations.",
    icon: "🌍",
    link: "/sustainability",
  },
];

const usps = [
  "Trusted by over 1000+ farmers and customers",
  "Eco-conscious and sustainable farming focused",
  "Affordable pricing with financing options",
  "24/7 Customer Support and Expert Guidance",
  "Community-focused marketplace and resources",
];

const testimonials = [
  {
    name: "Dipansh Gore",
    role: "Farmer",
    quote: "Agrizone's equipment helped me increase my farm’s output while reducing labor costs. Highly recommend!",
    rating: 5,
  },
  {
    name: "Subhani Shaikh",
    role: "Customer",
    quote: "The freshest vegetables I've ever received! Supporting local farmers meaningfully through Agrizone.",
    rating: 4,
  },
  {
    name: "Shivanand Birajdar",
    role: "Agricultural Expert",
    quote: "Their commitment to sustainable practices is commendable. Agrizone is truly a game-changer in agriculture.",
    rating: 5,
  }
];

const videos = [
  {
    title: "How can you make 1cr/year with farming? | BharatAgri Co-founders Interview",
    url: "https://www.youtube.com/embed/nNP4o1wE6Vo",
    description: "Explore the latest modern farming machinery and how it improves productivity.",
  },
  {
    title: "2 Acres to 1.5 Lakh/month: Transforming Small Farms into Profit Machines | AgriTalk by Abhinav Roy",
    url: "https://www.youtube.com/embed/NbavN0ZnQmo",
    description: "Discover innovative agricultural methods to increase farm output sustainably.",
  },
  {
    title: "Moringa farming🌿 : How this Maharashtra Farmer Made Crores from drumsticks || सहजन की खेती 💰",
    url: "https://www.youtube.com/embed/eEvVRNlEf_E",
    description: "Learn essential strategies for effective crop management from experts.",
  },
];

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 leading-relaxed bg-white">
      <section 
        className="relative flex flex-col-reverse md:flex-row items-center max-w-7xl mx-auto px-6 py-24 gap-16"
      >
        <div  data-aos="fade-down" className="flex-1 max-w-xl text-center md:text-left">
          <h1  data-aos="fade-right"
            className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-green-900 mb-6 drop-shadow-lg"
          >
            Empowering Farmers & Customers{" "}
            <span className="text-yellow-500">
              with Innovation
            </span>
          </h1>
          <p  data-aos="fade-left" className="mb-8 text-lg md:text-xl text-gray-700 max-w-md mx-auto md:mx-0">
            Agrizone connects you with the best agricultural equipment, fresh
            produce, and expert farming advice to nurture growth and sustainability.
          </p>
          <button  data-aos="fade-left"
            onClick={() => (window.location.href = "/register")}
            className="inline-block bg-yellow-400 hover:bg-yellow-500 focus-visible:ring-4 focus-visible:ring-yellow-300 text-white font-bold px-12 py-4 rounded-full shadow-xl transition text-lg tracking-wide"
          >
            Get Started
          </button>
        </div>
         <div   data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="2500" className="max-w-md mx-auto rounded-2xl shadow-2xl">
  <video
    src={video}
    autoPlay
    loop
    muted
    className="w-[450px] h-[254px] rounded-xl shadow-2xl object-cover transform transition-transform duration-500 hover:scale-115 cursor-pointer"
  />
</div>

      </section>

      <section data-aos="fade-down-left" className="max-w-3xl mx-auto px-6 mb-20 text-center">
        <h2 className="text-3xl font-bold text-green-900 mb-4 drop-shadow">
          Our Mission
        </h2>
        <p className="text-gray-700 text-lg bg-yellow-100 rounded-xl py-4 px-2 shadow">
          At Agrizone, we believe in empowering farmers and consumers alike through
          sustainable agriculture, innovative technology, and a shared commitment
          to nourishing our planet.
        </p>
      </section>

      <section data-aos="fade-down-right"
        className="bg-white py-20 px-6 text-center"
        aria-label="Key Services and Products"
      >
        <h2 className="text-4xl font-extrabold text-green-900 mb-12 max-w-3xl mx-auto drop-shadow">
          Key Services & Products
        </h2>
        <div  className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
          {features.map(({ title, description, icon, link }) => (
            <article data-aos="flip-left"
              key={title}
              className="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer focus-within:ring-4 focus-within:ring-yellow-300 border-2 border-transparent hover:border-yellow-400 group"
              tabIndex={0}
              aria-label={title}
              onClick={() => (window.location.href = link)}
              onKeyDown={(e) => {
                if (e.key === "Enter") window.location.href = link;
              }}
            >
              <div
                className="text-7xl mb-6 select-none group-hover:scale-110 transition-transform duration-300"
              > {icon}
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-3 group-hover:text-yellow-600 transition-colors">
                {title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section  data-aos="zoom-in-left"
        id="why-choose-us"
        className="relative max-w-4xl mx-auto px-50 py-5 text-center bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <h2 className="text-4xl font-extrabold text-green-900 mb-6 drop-shadow-md">
          Why Choose <span className="text-yellow-500">Agrizone?</span>
        </h2>

        <p className="max-w-xl mx-auto text-green-800 mb-12 text-lg font-medium">
          We’re committed to providing the best for our farmers and customers. Here’s why we stand out:
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-lg mx-auto list-none text-left">
          {usps.map((point, idx) => (
            <li
              key={idx}
              className="flex items-center space-x-4 text-xl text-green-900 font-semibold group cursor-default select-none"
            >
              <FaCheckCircle
                className="text-yellow-500 flex-shrink-0 w-8 h-8 transition-transform duration-300 group-hover:scale-125 drop-shadow"
                aria-hidden="true"
              />
              <span className="leading-snug transition-colors duration-300 group-hover:text-yellow-600">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section 
        className="bg-white py-20 px-6 text-center max-w-6xl mx-auto"
      >
        <h2 data-aos="fade-right" className="text-4xl font-extrabold text-green-900 mb-12 drop-shadow">
          Testimonials
        </h2>
        <div data-aos="fade-left"
     data-aos-offset="400"
     data-aos-easing="ease-in-sine" className="flex flex-col md:flex-row gap-10">
          {testimonials.map(({ name, role, quote, rating }, idx) => (
            <blockquote
              key={idx}
              className="bg-white rounded-2xl p-10 shadow-xl flex-1 border-2 border-yellow-100 hover:border-yellow-400 transition"
            >
              <p className="text-gray-800 italic mb-4 text-lg">"{quote}"</p>
              <div className="flex items-center mb-3">
                {[...Array(rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
                {[...Array(5 - rating)].map((_, i) => (
                  <FaStar key={i} className="text-gray-300" />
                ))}
              </div>
              <footer className="text-green-900 font-bold">
                {name}, <span className="font-normal text-green-800">{role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section
        id="videos"
        className="bg-white py-20 px-6 max-w-6xl mx-auto text-center"
        aria-label="Farming related videos"
      >
        <h2 className="text-4xl font-extrabold text-green-900 mb-12 drop-shadow">
          Farming Videos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {videos.map(({ title, url, description }) => (
            <article
              key={title}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition cursor-pointer border-2 border-transparent hover:border-yellow-400"
              tabIndex={0}
              aria-label={`Watch video: ${title}`}
            >
              <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden shadow-md">
                <iframe
                  src={url}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">{title}</h3>
              <p className="text-gray-700">{description}</p>
            </article>
          ))}
        </div>
      </section>


    </div>
  );
};

export default Home;
