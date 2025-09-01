import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function CheckoutForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Form data ready for backend:", data);
    alert("Checkout submitted! Backend not integrated yet.");
    reset();
  };

  const onApplyCoupon = (data) => {
    console.log("Coupon applied:", data.couponCode);
    alert(`Coupon "${data.couponCode}" applied!`);
  };

  // Single course data
  const course = {
    title: "Modern React Mastery",
    description:
      "Learn React.js from scratch to advanced concepts with real-world projects and hands-on practice.",
    thumbnail:
      "https://res.cloudinary.com/dbqoevq35/image/upload/v1756305973/minimal-LLM/x5ezywym6jxmmn27jaju.jpg",
    price: "100",
    instructor: {
      name: "John Doe",
      image: "https://i.ibb.co/mzCz3CM/node.png",
    },
  };

  return (
    <div className=" max-sm:mt-20 mt-10 bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-full mx-auto grid md:grid-cols-2 gap-10">
        
        {/* Course Card Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 flex flex-col"
        >
          <div className="relative h-56 w-full overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-500"
            />
            <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              Featured
            </span>
          </div>

          <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                {course.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-3">
                <img
                  src={course.instructor.image}
                  alt={course.instructor.name}
                  className="w-10 h-10 rounded-full border-2 border-purple-500"
                />
                <span className="text-gray-800 dark:text-gray-100 font-medium">
                  {course.instructor.name}
                </span>
              </div>
              <span className="text-xl font-bold text-purple-600">
                ৳{course.price}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Checkout Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl shadow-lg bg-white dark:bg-gray-800 p-8 flex flex-col justify-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Checkout
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            {/* Coupon Code with Apply button */}
            <Field label="Coupon Code">
              <div className="flex gap-2">
                <input
                  {...register("couponCode")}
                  placeholder="Enter coupon (if any)"
                  className="flex-1 rounded-xl border border-gray-300 dark:border-gray-700 
                             bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                             px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 
                             transition-colors duration-300"
                />
                <button
                  type="button"
                  onClick={handleSubmit(onApplyCoupon)}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all duration-300"
                >
                  Apply
                </button>
              </div>
            </Field>

            {/* Checkout Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r 
                         from-purple-600 to-pink-500 text-white font-semibold 
                         hover:opacity-90 shadow-lg transition-all duration-300"
            >
              Checkout
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

// Reusable Field Component
function Field({ label, children }) {
  return (
    <label className="block">
      <div className="mb-1 text-sm text-gray-600 dark:text-gray-300">{label}</div>
      {children}
    </label>
  );
}
