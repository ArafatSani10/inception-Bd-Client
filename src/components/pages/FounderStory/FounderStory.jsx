import React from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaResearchgate,
  FaGoogle,
} from "react-icons/fa6";

const founders = [
  {
    name: "MD. RIDOY HOSSAIN",
    role: "Founder & CEO",
    bio: "Robotics Engineer and Mentor with more than 7 years of industry experience in Robotics Systems, Embedded Systems, Control Engineering, Autonomous Navigation, Python, ROS, and Mechatronic Integration.",
    image: "https://i.ibb.co/MkWTVbXP/353055540-3382191028762726-6439950272090551511-n.jpg",
    socials: [
      { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/boktiarahmed73/" },
      { icon: <FaYoutube />, url: "https://www.youtube.com/dswithbappy" },
      { icon: <FaFacebook />, url: "https://web.facebook.com/profile.php?id=100005254877425" },
      { icon: <FaInstagram />, url: "https://www.instagram.com/entbappy/" },
      { icon: <FaXTwitter />, url: "https://twitter.com/bappy913873" },
      { icon: <FaGithub />, url: "https://github.com/entbappy" },
      { icon: <FaResearchgate />, url: "https://www.researchgate.net/profile/Boktiar-Bappy" },
      { icon: <FaGoogle />, url: "https://scholar.google.com/citations?hl=en&user=Z64la9EAAAAJ" },
    ],
  },
  {
    name: "BOKTIAR AHMED BAPPY",
    role: "Co-Founder & CTO",
    bio: "Chief AI Engineer and Mentor with more than 6 years of industry working experience in Python, Machine Learning, Deep Learning, MLOps, Cloud, Generative AI, AI Agents, and Robotics systems.",
    image: "https://i.ibb.co/qF1yg8GM/IMG-8206.jpg",
    socials: [
      { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/boktiarahmed73/" },
      { icon: <FaYoutube />, url: "https://www.youtube.com/dswithbappy" },
      { icon: <FaFacebook />, url: "https://web.facebook.com/profile.php?id=100005254877425" },
      { icon: <FaInstagram />, url: "https://www.instagram.com/entbappy/" },
      { icon: <FaXTwitter />, url: "https://twitter.com/bappy913873" },
      { icon: <FaGithub />, url: "https://github.com/entbappy" },
      { icon: <FaResearchgate />, url: "https://www.researchgate.net/profile/Boktiar-Bappy" },
      { icon: <FaGoogle />, url: "https://scholar.google.com/citations?hl=en&user=Z64la9EAAAAJ" },
    ],
  },
  {
    name: "DABASISH KUMAR BISWAS",
    role: "Co-Founder & COO",
    bio: "Embedded Systems Engineer and Mentor with over 5 years of industry experience in Embedded Microcontroller Programming, RTOS, Hardware-Software Integration, IoT Systems, PLC, PCB Design, and ARM-based Architectures.",
    image: "https://i.ibb.co/qF1yg8GM/IMG-8206.jpg",
    socials: [
      { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/boktiarahmed73/" },
      { icon: <FaYoutube />, url: "https://www.youtube.com/dswithbappy" },
      { icon: <FaFacebook />, url: "https://web.facebook.com/profile.php?id=100005254877425" },
      { icon: <FaInstagram />, url: "https://www.instagram.com/entbappy/" },
      { icon: <FaXTwitter />, url: "https://twitter.com/bappy913873" },
      { icon: <FaGithub />, url: "https://github.com/entbappy" },
      { icon: <FaResearchgate />, url: "https://www.researchgate.net/profile/Boktiar-Bappy" },
      { icon: <FaGoogle />, url: "https://scholar.google.com/citations?hl=en&user=Z64la9EAAAAJ" },
    ],
  },
  {
    name: "MAMUN OR RASHID",
    role: "Co-founder & Operating Officer",
    bio: "Marketing Operations Specialist with over 4 years of industry experience in Marketing Automation, Campaign Analytics, Lead Management, Martech Stack Optimization, Data-Driven Strategy, and Cross-Channel Execution.",
    image: "https://i.ibb.co/qF1yg8GM/IMG-8206.jpg", // replace with actual image from your Drive
    socials: [
      { icon: <FaLinkedin />, url: "#" },
      { icon: <FaYoutube />, url: "#" },
      { icon: <FaFacebook />, url: "#" },
      { icon: <FaInstagram />, url: "#" },
      { icon: <FaXTwitter />, url: "#" },
      { icon: <FaGithub />, url: "#" },
      { icon: <FaResearchgate />, url: "#" },
      { icon: <FaGoogle />, url: "#" },
    ],
  },
];

const FounderStory = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 transition-colors duration-500">
      <h2 className="text-center text-5xl max-sm:text-3xl font-bold text-[#00baff] mb-16">
        Meet Our Founders
      </h2>

      <div className="max-w-full mx-auto space-y-24 px-6 flex flex-col items-center">
        {founders.map((person, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full"
            >
              {/* Image */}
              <div
                className={`${
                  isEven ? "md:order-1" : "md:order-2"
                } order-1 relative flex items-center justify-center`}
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="relative rounded-2xl shadow-lg w-full md:w-[70%] h-[400px] md:h-[450px] lg:h-[450px] object-cover object-center"
                />
              </div>

              {/* Info */}
              <div
                className={`${
                  isEven ? "md:order-2" : "md:order-1"
                } order-2 space-y-6`}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-[#00baff]">
                  {person.name}
                </h3>
                <p className="text-orange-600 dark:text-yellow-400 font-semibold">
                  {person.role}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  {person.bio}
                </p>

                {/* Socials */}
                {person.socials.length > 0 && (
                  <div className="flex flex-wrap gap-4 pt-4">
                    {person.socials.map((s, i) => (
                      <a
                        key={i}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-yellow-400 text-xl transition-colors duration-300"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FounderStory;
