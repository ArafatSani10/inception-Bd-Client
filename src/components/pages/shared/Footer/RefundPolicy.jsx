import React from "react";
import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaUndo,
  FaBan,
  FaClock,
  FaEnvelope,
  FaBalanceScale,
  FaGlobe,
} from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function RefundPolicy() {
  return (
    <main className="min-h-screen mt-5 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-800 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-4">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl  mt-6 sm:text-5xl font-extrabold tracking-tight text-[#00baff]">
            Refund Policy
          </h1>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">InceptionBD</p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            {/* Last updated: 29.08.2025 */}
          </p>
        </motion.header>

        {/* Content */}
        <article className="space-y-10 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800">
          {/* 1. General Principles */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="flex items-center gap-3 text-xl font-semibold">
              <FaBalanceScale className="text-green-600" /> 1. General Principles
            </h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Refunds are offered in accordance with the terms below to ensure fairness for both students and instructors.
              By purchasing or enrolling in a course, you agree to this Refund Policy along with our Terms of Service and Privacy Policy.
            </p>
          </motion.section>

          {/* 2. Eligibility for Refunds */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="flex items-center gap-3 text-xl font-semibold">
              <FaMoneyBillWave className="text-teal-500" /> 2. Eligibility for Refunds
            </h2>
            <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Duplicate Payment:</strong> If charged more than once for the same course, a full refund of the duplicate amount will be issued.</li>
              <li><strong>Course Not Accessible:</strong> If technical errors prevent access to the course and cannot be resolved within 7 days, you may request a refund.</li>
              <li><strong>Course Cancellation:</strong> If a live course/workshop is cancelled by InceptionBD, students will receive a full refund or may transfer to another course.</li>
            </ul>
          </motion.section>

          {/* 3. Non-Refundable Situations */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="flex items-center gap-3 text-xl font-semibold">
              <FaBan className="text-red-500" /> 3. Non-Refundable Situations
            </h2>
            <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Change of mind after enrolling in a course.</li>
              <li>Failure to attend a live session or complete the course.</li>
              <li>Dissatisfaction with teaching style or content (unless it clearly does not match the description).</li>
              <li>Partial use of a course or subscription.</li>
            </ul>
          </motion.section>

          {/* 4. Timeframe for Requests */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="flex items-center gap-3 text-xl font-semibold">
              <FaClock className="text-blue-500" /> 4. Timeframe for Requests
            </h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Refund requests must be made within <strong>7 days</strong> of the original purchase date. After this period, refunds cannot be issued.
            </p>
          </motion.section>

          {/* 5. How to Request a Refund */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="flex items-center gap-3 text-xl font-semibold">
              <FaUndo className="text-purple-500" /> 5. How to Request a Refund
            </h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              To request a refund:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Email us at <strong>learn.inception@gmail.com

              </strong> with the subject line "Refund Request".</li>
              <li>Include your name, registered email, course name, purchase receipt, and reason for the refund request.</li>
              <li>Refunds will be processed within <span className="font-semibold">7-10</span> business days after approval, using the original method of payment.</li>
            </ul>
          </motion.section>

          {/* 6. Special Considerations */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="flex items-center gap-3 text-xl font-semibold">
              <FaBalanceScale className="text-yellow-500" /> 6. Special Considerations
            </h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              In cases of proven fraud, unauthorized transactions, or other exceptional situations, InceptionBD reserves the right to review and decide on refunds on a case-by-case basis. If a refund is granted, your access to the course will be revoked.
            </p>
          </motion.section>

          {/* 7. Contact Us */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="flex items-center gap-3 text-xl font-semibold">
              <FaEnvelope className="text-teal-500" /> 7. Contact Us
            </h2>
            <ul className="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Email:</strong> <a href="mailto:learn.inception@gmail.com

" className="text-blue-600 dark:text-blue-400">learn.inception@gmail.com

              </a></li>
              <li className="flex items-center gap-2"><FaGlobe /> <strong>Website:</strong> <a href="https://www.inceptionbd.com" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400">www.inceptionbd.com</a></li>
            </ul>
          </motion.section>


        </article>


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
