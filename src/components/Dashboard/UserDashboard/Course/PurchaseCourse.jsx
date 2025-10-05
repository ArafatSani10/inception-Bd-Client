



import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import AuthContext from "../../../Content/Authcontext";
import { useMyOrdersQuery } from "../../../../redux/api/orderApi";
import AuthContext from "../../../../Content/Authcontext";

const PurchaseCourse = ({ orders: propOrders }) => {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);

  // যদি UserHome থেকে prop আসে তাহলে ওটাই use হবে
  // না আসলে এখানে API দিয়ে আনা হবে
  const { data: orderRes } = useMyOrdersQuery(dbUser?.email, {
    skip: !dbUser?.email || !!propOrders,
  });

  const myOrders = propOrders || orderRes?.data || [];

  useEffect(() => {
    // শুধু তখনই fetch করব যদি propOrders না থাকে
    if (user?.email && !propOrders) {
      fetch(`${import.meta.env.VITE_API_URL}/users`)
        .then((res) => res.json())
        .then((data) => {
          const singleUser = data.data.find((u) => u.email === user.email);
          setDbUser(singleUser);
        })
        .catch((err) => console.error(err));
    }
  }, [user, propOrders]);

  return (
    <div className="max-w-full mx-auto mt-12 p-2">
      <h2 className="text-2xl font-bold mb-8 text-[#00baff]">
        You have {myOrders.length} new course
      </h2>

      {myOrders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You haven’t purchased any course yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {myOrders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
            >
              <img
                src={order?.course?.thumbnail}
                alt={order?.course?.title}
                className="w-full h-full  md:h-full"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-lg">
                  {order?.course?.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Category: {order?.course?.category?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Instructor: {order?.course?.instructor?.name || "Not Found"}
                </p>
                <Link
                  to={`/student-dashboard/module-page/${order?.course?.id}`}
                >
                  <button className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-medium shadow-lg hover:opacity-90 transition-all duration-300">
                    View Course
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchaseCourse;
