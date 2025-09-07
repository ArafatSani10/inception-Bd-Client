// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import axios from 'axios';

// // CountUp animation
// const CountUp = ({ end, duration = 2, start }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!start) return;
//     let startTime = performance.now();

//     const step = (timestamp) => {
//       const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
//       const value = Math.floor(progress * end);
//       setCount(value);
//       if (progress < 1) requestAnimationFrame(step);
//     };

//     requestAnimationFrame(step);
//   }, [start, end, duration]);

//   return <span>{start ? count.toLocaleString() : '0'}</span>;
// };

// // Example icon
// const StatIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-8 w-8"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//   </svg>
// );

// const EstimatedCount = () => {
//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
//   const [stats, setStats] = useState([
//     { id: 1, value: 200, suffix: '+', label: 'Students Enrolled', icon: <StatIcon /> },
//     { id: 2, value: 0, suffix: '+', label: 'Expert Instructors', icon: <StatIcon /> },
//     { id: 3, value: 0, suffix: '+', label: 'Active Courses', icon: <StatIcon /> },
//     { id: 4, value: 95, suffix: '%', label: 'Success Rate', icon: <StatIcon /> }, // static
//   ]);

//   // Fetch users and courses
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const usersRes = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
//         const coursesRes = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);


//         const users = usersRes.data.data || [];
//         const courses = coursesRes.data.data || [];

//         const students = users.filter(u => u.role === 'student').length;
//         const instructors = users.filter(u => u.role === 'instructor').length;

//         setStats((prev) =>
//           prev.map((s) => {
//             // if (s.label === 'Students Enrolled') return { ...s, value: students };
//             if (s.label === 'Expert Instructors') return { ...s, value: instructors };
//             if (s.label === 'Active Courses') return { ...s, value: courses.length };
//             return s;
//           })
//         );
//       } catch (err) {
//         console.error('Error fetching stats:', err);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div ref={ref} className="py-10 md:p-5 transition-colors duration-500">
//       <div className="max-w-full mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-xl md:text-5xl font-extrabold text-[#00baff] dark:text-[#00baff] mb-4">
//             Our Growing Community
//           </h2>
//           <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             Join thousands of learners and experts in our thriving educational ecosystem.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={stat.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1, duration: 0.6 }}
//               viewport={{ once: true }}
//               className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6 text-center 
//                 hover:shadow-xl hover:border-indigo-500 transition-all duration-300"
//             >
//               <div className="flex justify-center items-center w-14 h-14 bg-indigo-100 dark:bg-indigo-800/30 rounded-full mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
//                 {stat.icon}
//               </div>
//               <h3 className="text-3xl font-extrabold text-[#00baff] dark:text-[#00baff] mb-1">
//                 <CountUp end={stat.value} duration={2} start={inView} />{stat.suffix}
//               </h3>
//               <p className="text-[#00baff] dark:text-[#00baff] text-sm font-medium">
//                 {stat.label}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EstimatedCount;


import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const CountUp = ({ end, duration = 2, start }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const value = Math.floor(progress * end);
      setCount(value);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [start, end, duration]);

  return <span>{start ? count.toLocaleString() : '0'}</span>;
};

// Example icon
const StatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const EstimatedCount = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [stats, setStats] = useState([
    { id: 1, value: 0, suffix: '+', label: 'Students Enrolled', icon: <StatIcon /> },
    { id: 2, value: 0, suffix: '+', label: 'Expert Instructors', icon: <StatIcon /> },
    { id: 3, value: 0, suffix: '+', label: 'Active Courses', icon: <StatIcon /> },
    { id: 4, value: 95, suffix: '%', label: 'Success Rate', icon: <StatIcon /> },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch users, courses, and enrollments/orders
        const [usersRes, coursesRes, ordersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/users`),
          axios.get(`${import.meta.env.VITE_API_URL}/courses`),
          axios.get(`${import.meta.env.VITE_API_URL}/orders`), // assuming enrollments are here
        ]);

        const users = usersRes.data.data || [];
        const courses = coursesRes.data.data || [];
        const orders = ordersRes.data.data || [];

        const students = orders.length; // number of enrollments
        const instructors = users.filter(u => u.role === 'instructor').length;

        setStats(prev =>
          prev.map(s => {
            if (s.label === 'Students Enrolled') return { ...s, value: students };
            if (s.label === 'Expert Instructors') return { ...s, value: instructors };
            if (s.label === 'Active Courses') return { ...s, value: courses.length };
            return s;
          })
        );
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div ref={ref} className="py-10 md:p-5 transition-colors duration-500">
      <div className="max-w-full mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-5xl font-extrabold text-[#00baff] dark:text-[#00baff] mb-4">
            Our Growing Community
          </h2>
          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of learners and experts in our thriving educational ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6 text-center hover:shadow-xl hover:border-indigo-500 transition-all duration-300"
            >
              <div className="flex justify-center items-center w-14 h-14 bg-indigo-100 dark:bg-indigo-800/30 rounded-full mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-extrabold text-[#00baff] dark:text-[#00baff] mb-1">
                <CountUp end={stat.value} duration={2} start={inView} />{stat.suffix}
              </h3>
              <p className="text-[#00baff] dark:text-[#00baff] text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EstimatedCount;
