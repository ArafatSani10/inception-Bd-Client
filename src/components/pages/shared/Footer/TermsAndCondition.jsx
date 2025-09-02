import React from "react";
import {
  FaCheckCircle,
  FaUserShield,
  FaRegCreditCard,
  FaBookOpen,
  FaLightbulb,
  FaUsers,
  FaExclamationTriangle,
  FaBan,
  FaSyncAlt,
  FaGavel,
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

export default function TermsAndCondition() {
  // Section list for mapping (so each gets animation)
  const sections = [
    {
      icon: <FaCheckCircle className="text-blue-500" />,
      title: "1. Acceptance of Terms",
      content: (
        <p>
          By creating an account, enrolling in a course, or using our platform,
          you agree to be bound by these Terms &amp; Conditions along with our
          Privacy Policy and Refund Policy.
        </p>
      ),
    },
    {
      icon: <FaUserShield className="text-indigo-500" />,
      title: "2. Eligibility",
      content: (
        <p>
          You must be at least 13 years old to use our services. If you are
          under 18, you may use our services only with parental/guardian
          consent. You are responsible for ensuring that your use of InceptionBD
          complies with applicable local laws.
        </p>
      ),
    },
    {
      icon: <FaUsers className="text-purple-500" />,
      title: "3. User Accounts",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>You must provide accurate and complete information when creating an account.</li>
          <li>You are responsible for keeping your account credentials secure.</li>
          <li>You agree not to share your account with others or impersonate another user.</li>
        </ul>
      ),
    },
    {
      icon: <FaRegCreditCard className="text-green-500" />,
      title: "4. Payments & Refunds",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Course fees must be paid in full before access is granted.</li>
          <li>Payments are processed through secure third-party gateways.</li>
          <li>Refunds are subject to our Refund Policy.</li>
        </ul>
      ),
    },
    {
      icon: <FaBookOpen className="text-yellow-500" />,
      title: "5. Course Access & Usage",
      content: (
        <>
          <p>
            When you purchase a course, you receive a limited, non-transferable,
            non-exclusive license to access it for personal learning only. You
            may not:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Reproduce, distribute, or resell course materials without written permission.</li>
            <li>Record, copy, or share live sessions or paid content.</li>
            <li>Use the platform for fraudulent, harmful, or unlawful purposes.</li>
          </ul>
        </>
      ),
    },
    {
      icon: <FaLightbulb className="text-orange-500" />,
      title: "6. Intellectual Property",
      content: (
        <p>
          All course materials, videos, texts, designs, and content are the
          property of InceptionBD or its instructors. Unauthorized use may
          result in account suspension and legal action.
        </p>
      ),
    },
    {
      icon: <FaUsers className="text-pink-500" />,
      title: "7. Instructor & Student Responsibilities",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Instructors must ensure their course descriptions are accurate and deliver promised content.</li>
          <li>
            Students are expected to behave respectfully in classes, discussions,
            and community forums. Abusive or disruptive behavior may lead to removal
            without refund.
          </li>
        </ul>
      ),
    },
    {
      icon: <FaExclamationTriangle className="text-red-500" />,
      title: "8. Limitation of Liability",
      content: (
        <>
          <p>
            InceptionBD provides educational content “as is” without guarantees
            of specific outcomes (e.g., job placement). We are not responsible
            for:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Internet disruptions, device issues, or third-party service failures.</li>
            <li>Loss of data or unauthorized access caused by user negligence.</li>
          </ul>
        </>
      ),
    },
    {
      icon: <FaBan className="text-red-600" />,
      title: "9. Termination of Services",
      content: (
        <p>
          We reserve the right to suspend or terminate accounts that violate
          these Terms. Users may request account deletion at any time by
          contacting <strong>hello@inceptionbd.com

          </strong>.
        </p>
      ),
    },
    {
      icon: <FaSyncAlt className="text-blue-400" />,
      title: "10. Changes to Terms",
      content: (
        <p>
          InceptionBD may update these Terms from time to time. Continued use of
          the platform after updates means you accept the revised Terms.
        </p>
      ),
    },
    {
      icon: <FaGavel className="text-gray-600 dark:text-gray-300" />,
      title: "11. Governing Law",
      content: (
        <p>
          These Terms are governed by the laws of Bangladesh. Any disputes shall
          be resolved under the jurisdiction of Bangladeshi courts.
        </p>
      ),
    },
    {
      icon: <FaEnvelope className="text-teal-500" />,
      title: "12. Contact Us",
      content: (
        <ul className="space-y-1">
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:hello@inceptionbd.com

"
              className="text-blue-600 dark:text-blue-400"
            >
              hello@inceptionbd.com


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
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            Terms & Conditions
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

          
        </article>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap gap-4 justify-start">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm transition"
          >
            🖨 Print
          </button>

         
        </div>
      </div>
    </main>
  );
}
