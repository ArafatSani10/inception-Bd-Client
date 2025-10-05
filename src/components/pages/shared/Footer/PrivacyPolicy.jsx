import React from "react";
import {
  FaUserShield,
  FaUserCircle,
  FaBookReader,
  FaServer,
  FaCookieBite,
  FaLock,
  FaKey,
  FaChild,
  FaSyncAlt,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import { motion } from "framer-motion";

// Animation variants
const fadeInSide = (direction = "left") => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -60 : 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
});

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <FaUserCircle className="text-blue-500" />,
      title: "1. Information We Collect",
      content: (
        <>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Personal Information:</strong> Name, email, phone (if provided), billing details.</li>
            <li><strong>Account & Learning Information:</strong> Username, enrolled courses, progress, certificates, feedback.</li>
            <li><strong>Technical Information:</strong> IP address, browser type, operating system, cookies & usage data.</li>
          </ul>
        </>
      ),
    },
    {
      icon: <FaBookReader className="text-indigo-500" />,
      title: "2. How We Use Your Information",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Provide access to courses, live sessions, and certificates.</li>
          <li>Process payments and verify transactions.</li>
          <li>Communicate updates, reminders, and promotions (with consent).</li>
          <li>Improve course quality and user experience.</li>
          <li>Prevent fraud, unauthorized access, or misuse.</li>
        </ul>
      ),
    },
    {
      icon: <FaServer className="text-purple-500" />,
      title: "3. How We Share Your Information",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>With trusted service providers (payment processors, hosting, email).</li>
          <li>With instructors (only name and enrollment status).</li>
          <li>With legal authorities if required by law.</li>
        </ul>
      ),
    },
    {
      icon: <FaCookieBite className="text-yellow-500" />,
      title: "4. Cookies & Tracking",
      content: (
        <p>
          Our site uses cookies to remember preferences, track usage, and improve
          performance. You can disable cookies, but some features may not work properly.
        </p>
      ),
    },
    {
      icon: <FaLock className="text-green-500" />,
      title: "5. Data Security",
      content: (
        <p>
          We use SSL encryption, secure servers, and trusted providers to protect
          your data. However, no method of transmission is 100% secure, and we cannot
          guarantee absolute protection.
        </p>
      ),
    },
    {
      icon: <FaKey className="text-orange-500" />,
      title: "6. Your Rights",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Access, update, or correct your personal information.</li>
          <li>Request deletion of your account and data.</li>
          <li>Opt-out of promotional communications anytime.</li>
          <li>Withdraw consent (may limit access to services).</li>
        </ul>
      ),
    },
    {
      icon: <FaChild className="text-pink-500" />,
      title: "7. Children’s Privacy",
      content: (
        <p>
          Our services are intended for learners 13 years and older. We do not knowingly
          collect personal data from children under 13. If discovered, such data will be
          deleted immediately.
        </p>
      ),
    },
    {
      icon: <FaSyncAlt className="text-blue-400" />,
      title: "8. Changes to This Policy",
      content: (
        <p>
          We may update this Privacy Policy from time to time. Updates will be posted
          with a revised “Last updated” date.
        </p>
      ),
    },
    {
      icon: <FaEnvelope className="text-teal-500" />,
      title: "9. Contact Us",
      content: (
        <ul className="space-y-1">
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:learn.inception@gamil.com"
              className="text-blue-600 dark:text-blue-400"
            >
              learn.inception@gmail.com


            </a>
          </li>
          <li className="flex items-center gap-2">
            <FaGlobe /> <strong>Website:</strong>{" "}
            <a
              href="https://www.inceptionbd.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 dark:text-blue-400"
            >
              www.inceptionbd.com
            </a>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <main className="min-h-screen mt-5 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-800 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-4">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl mt-6 sm:text-5xl font-extrabold tracking-tight text-[#00baff]">
            Privacy & Policy
          </h1>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            InceptionBD
          </p>
        </motion.header>

        {/* Sections */}
        <article className="space-y-10 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800">
          {sections.map((sec, i) => (
            <motion.section
              key={i}
              variants={fadeInSide(i % 2 === 0 ? "left" : "right")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-2"
            >
              <h2 className="flex items-center gap-3 text-xl font-semibold">
                {sec.icon} {sec.title}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {sec.content}
              </div>
            </motion.section>
          ))}


          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4 justify-start">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm transition"
            >
              🖨 Print
            </button>


          </div>


        </article>
      </div>
    </main>
  );
}
