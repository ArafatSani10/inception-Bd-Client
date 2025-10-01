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
    bio: "Robotics Engineer and Mentor with over 7 years of industry expertise in Robotics Systems, Embedded Systems, Control Engineering, Autonomous Navigation, Python, and Mechatronic Integration. Recognized with 32+ prestigious awards, including the APICTA Award, BASIS National ICT Award, and as one of the Top 3 Innovators in Bangladesh.",
    image:
      "https://i.ibb.co/MkWTVbXP/353055540-3382191028762726-6439950272090551511-n.jpg",
    socials: [
      { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/ridoyhossain/" },
      { icon: <FaYoutube />, url: "https://www.youtube.com/@problemsolvewithridoy" },
      { icon: <FaFacebook />, url: "https://www.facebook.com/roboticsridoy/" },
      { icon: <FaGithub />, url: "https://github.com/problemsolvewithridoy" },
    ],
    companies: [
      "Itle",
      "VIVO",
      "Samsung",
      "Xiaomi",
      "Inone Group",
      "Robolife Technologies",
      "AffGods R&D",
      "Inception BD",
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
    companies: [
      "Japan-Bangladesh Robotics & Advanced Research Center (JBRATRC)",
      "Pangaea X",
      "iNeuron.ai",
      "Physics Wallah",
      "Euron",
      "Quantum Human",



      "Inception BD",



    ],
  },
  {
    name: "DABASISH KUMAR BISWAS",
    role: "Co-Founder & COO",
    bio: "Embedded Systems Engineer and Mentor with over 5 years of industry experience in Embedded Microcontroller Programming, RTOS, Hardware-Software Integration, IoT Systems, PLC, PCB Design, and ARM-based Architectures.",
    image: "https://i.ibb.co.com/fz6G8kjQ/448765170-3340362229598402-5634876335468866581-n.jpg",
    socials: [
      {
        icon: <FaFacebook />,
        url: "https://www.facebook.com/dabasish.kumar.biswas.2024",
      },
      {
        icon: <FaLinkedin />,
        url: "https://www.linkedin.com/in/dabasish-kumar-biswas/",
      },

      { icon: <FaGithub />, url: "https://github.com/EntDabasishkb" },
      {
        icon: <FaInstagram />,
        url: "https://www.instagram.com/dabasish_kumar_biswas/",
      },
    ],
    companies: ["SPI", "JhPI", "Inception BD"],
  },
  {
    name: "MD. MAMUN OR RASHID",
    role: "Co-Founder & Marketing Officer ",
    bio: "Marketing Operations Specialist with over 4 years of industry experience in Marketing Automation, Campaign Analytics, Lead Management, Martech Stack Optimization, Data-Driven Strategy, and Cross-Channel Execution.",
    image: "https://i.ibb.co.com/dJxhW1Vh/481925168-2330025807396861-1487864547235476687-n.jpg",
    socials: [
      {
        icon: <FaFacebook />,
        url: "https://www.facebook.com/share/1CbjV6W3k4/",
      },
      {
        icon: <FaLinkedin />,
        url: "https://www.linkedin.com/in/md-mamun-or-rashid-498a84218",
      },
      {
        icon: <FaInstagram />,
        url: "https://www.instagram.com/malithamamun",
      },
    ],
    companies: ["Inception BD"],
  },
];

const FounderStory = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 transition-colors duration-500">
      <h2 className="text-center text-5xl max-sm:text-3xl font-bold text-[#00baff] mb-16">
        Meet Our Founders
      </h2>

      <div className="max-w-7xl mx-auto space-y-24 px-6 flex flex-col items-center">
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
                className={`${isEven ? "md:order-1" : "md:order-2"
                  } order-1 relative flex items-center justify-center`}
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="relative rounded-2xl shadow-lg w-full md:w-[70%] h-[400px] md:h-[450px] object-cover object-center border-4 border-[#00baff]/40"
                />
              </div>

              {/* Info */}
              <div
                className={`${isEven ? "md:order-2" : "md:order-1"
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

                {/* Companies */}
                {person.companies && person.companies.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Companies I have worked with:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {person.companies.map((company, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm rounded-full bg-[#00baff]/10 text-[#00baff] border border-[#00baff]/30 hover:bg-[#00baff]/20 transition"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Socials */}
                {person.socials.length > 0 && (
                  <div className="flex flex-wrap gap-4 pt-4">
                    {person.socials.map((s, i) => (
                      <a
                        key={i}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-yellow-400 text-2xl transition-colors duration-300"
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
