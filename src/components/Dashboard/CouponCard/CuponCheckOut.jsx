import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import AuthContext from "../../../Content/Authcontext";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "lucide-react";

export default function CheckoutPage() {
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const { course } = location.state || {};
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  // console.log("course data",course?.price)

  const [userInfo, setUserInfo] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(course?.price || 0);
  const [couponMessage, setCouponMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // fetch logged-in user info
  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`${API_URL}/users/${user.email}`)
      .then((res) => setUserInfo(res.data.data))
      .catch((err) => console.error("User fetch error:", err));
  }, [user?.email]);

  // fetch available coupons for this course
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get(`${API_URL}/coupons`);
        if (res.data?.data) {
          const courseCoupons = res.data.data.filter((c) =>
            c.applicableCourses.includes(course._id)
          );
          setCoupons(courseCoupons);
        }
      } catch (err) {
        console.error("Coupons fetch error:", err);
      }
    };
    fetchCoupons();
  }, [course?._id]);

  // Apply coupon
  const onApplyCoupon = async (data) => {
    if (!data.couponCode) return;
    const code = data.couponCode.trim();

    try {
      const res = await axios.post(`${API_URL}/coupons/apply`, {
        code,
        userId: userInfo?._id,
        courseId: course._id,
      });

      console.log("courpon res", res?.data?.data);

      const couponData = res?.data?.data;

      if (couponData) {
        const originalPrice = Number(course.price || 0);
        let discountAmount = 0;

        if (couponData.discountType === "fixed")
          discountAmount = Number(couponData.discountValue);
        if (couponData.discountType === "percentage")
          discountAmount =
            (originalPrice * Number(couponData.discountValue)) / 100;

        let finalPrice = originalPrice - discountAmount;
        console.log("final price", finalPrice);
        if (finalPrice < 0) finalPrice = 0;

        setDiscountedPrice(finalPrice);
        setAppliedCoupon(couponData);
        setCouponMessage(`✅ Coupon applied! You saved ৳${discountAmount}`);
      } else {
        setAppliedCoupon(null);
        setDiscountedPrice(course.price);
        setCouponMessage(`❌ ${res.data.message || "Invalid coupon!"}`);
      }
    } catch (err) {
      console.error("Apply coupon failed:", err);
      setAppliedCoupon(null);
      setDiscountedPrice(course.price);
      setCouponMessage("❌ Failed to apply coupon!");
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message);
      }
    }
  };

  // Checkout
  const onCheckout = async () => {
    if (!user) {
      return navigate("/login");
    }
    setLoading(true);
    try {
      const payload = {
        user: userInfo?._id,
        course: course._id,
        price: discountedPrice,
      };
      const res = await axios.post(`${API_URL}/orders`, payload);
      window.location.href = res?.data?.data?.url;
    } catch (err) {
      console.error("Order failed:", err);
      setLoading(false);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>
          <Loader className="animate-spin w-5 h-5" />
        </span>
      </div>
    );
  }

  return (
    <div className="max-sm:mt-20 mt-10 bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-full mx-auto grid md:grid-cols-2 gap-10">
        {/* Course Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 flex flex-col"
        >
          <div className="relative h-full w-full overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
            <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              {course.category?.name}
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
                  src={course.instructor?.photo || course.instructorImage}
                  alt={course.instructor?.name || "Instructor"}
                  className="w-10 h-10 rounded-full border-2 border-purple-500"
                />
                <span className="text-gray-800 dark:text-gray-100 font-medium">
                  Instructor: {course.instructor?.name || "Unknown"}
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-sm text-gray-500 line-through">
                  ৳{course.price}
                </span>
                <span className="text-xl font-bold text-purple-600">
                  ৳{discountedPrice}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Checkout Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl shadow-lg bg-white dark:bg-gray-800 p-8 flex flex-col justify-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Checkout
          </h2>

          <form onSubmit={handleSubmit(onApplyCoupon)} className="grid gap-6">
            {/* Coupon Field */}

            {course?.type === "paid" && (
              <label className="block">
                <div className="mb-1 text-sm text-gray-600 dark:text-gray-300">
                  Coupon Code
                </div>
                <div className="flex gap-2">
                  <input
                    {...register("couponCode")}
                    placeholder="Enter coupon code"
                    className="flex-1 rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300"
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all duration-300"
                  >
                    Apply
                  </button>
                </div>
              </label>
            )}


            <div className="flex items-center justify-between">
              <a
                href="/terms-and-conditions" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition duration-150 block mb-1"
              >
                Terms & Conditions
              </a>
              <a
                href="/privacy-and-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition duration-150 block mb-1"
              >
                Privacy & Policy
              </a>
              <a
                href="/refund-and-policy" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition duration-150 block"
              >
                Refund Policy
              </a>
            </div>


            {/* Coupon Message */}
            <p className="text-sm mt-2">Price: {discountedPrice}</p>
            {/* {couponMessage && <p className="text-sm mt-2">{couponMessage}</p>} */}


            {/* Checkout Button */}
            <button
              type="button"
              onClick={onCheckout}
              disabled={loading}
              className="disabled:bg-blend-multiply disabled:cursor-not-allowed w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:opacity-90 shadow-lg transition-all duration-300 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="animate-spin w-5 h-5" />
                  Loading....
                </span>
              ) : (
                "Checkout"
              )}
            </button>
          </form>

          {/* Available Coupons */}
          {/* {coupons.length > 0 && (
            <div className="mt-6">
              <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-2">
                Available Coupons:
              </h3>
              <div className="flex flex-wrap gap-2">
                {coupons.map((c) => (
                  <span
                    key={c._id}
                    className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm"
                  >
                    {c.code} -{" "}
                    {c.type === "percentage"
                      ? `${c.discountValue}%`
                      : `৳${c.discountValue}`}
                  </span>
                ))}
              </div>
            </div>
          )} */}
        </motion.div>
      </div>
      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
}
