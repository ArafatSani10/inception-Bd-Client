import React, { useState } from "react";

// Example icon
const StatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 14l9-5-9-5-9 5 9 5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
    />
  </svg>
);

const EstimatedCount = ({ totalEnrolled, totalCourse, totalInstructor }) => {
  const stats = [
    {
      id: 1,
      value: totalEnrolled || 0,
      suffix: "+",
      label: "Students Enrolled",
      icon: <StatIcon />,
    },
    {
      id: 2,
      value: totalInstructor || 0,
      suffix: "+",
      label: "Expert Instructors",
      icon: <StatIcon />,
    },
    {
      id: 3,
      value: totalCourse || 0,
      suffix: "+",
      label: "Active Courses",
      icon: <StatIcon />,
    },
    {
      id: 4,
      value: 95,
      suffix: "%",
      label: "Success Rate",
      icon: <StatIcon />,
    },
  ];

  return (
    <div className="py-10 md:p-5 transition-colors duration-500">
      <div className="max-w-full mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-5xl font-extrabold text-[#00baff] dark:text-[#00baff] mb-4">
            Our Growing Community
          </h2>
          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of learners and experts in our thriving educational
            ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats?.map((stat) => (
            <div
              key={stat.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6 text-center hover:shadow-xl hover:border-indigo-500 transition-all duration-300"
            >
              <div className="flex justify-center items-center w-14 h-14 bg-indigo-100 dark:bg-indigo-800/30 rounded-full mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-extrabold text-[#00baff] dark:text-[#00baff] mb-1">
                {stat.value.toLocaleString()}
                {stat.suffix}
              </h3>
              <p className="text-[#00baff] dark:text-[#00baff] text-sm font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EstimatedCount;
