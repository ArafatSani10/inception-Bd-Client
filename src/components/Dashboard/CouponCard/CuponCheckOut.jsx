import React from "react";
import { useForm } from "react-hook-form";

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

  return (
    <div className="min-h-screen mt-10 bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-full mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-2 transition-colors duration-300 grid md:grid-cols-2 gap-5 items-center">

        {/* Demo Image Section */}
        <div className="flex justify-center">
          <img
            src="https://i.ibb.co.com/fVq7M5Hs/download-22.png"
            alt="Coupon demo"
            className="w-full max-w-md"
          />
        </div>

        {/* Form Section */}
        <div>
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
        </div>
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
