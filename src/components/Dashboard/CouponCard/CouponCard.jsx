import React from "react";

export default function CouponSystemDemo() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl transition-colors duration-300">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Create Coupon
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Coupon Code">
            <input
              placeholder="e.g. LMS30OFF"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
            />
          </Field>

          <Field label="Discount (%)">
            <input
              type="number"
              placeholder="10"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
            />
          </Field>

          <Field label="Start Date & Time">
            <input
              type="datetime-local"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
            />
          </Field>

          <Field label="End Date & Time">
            <input
              type="datetime-local"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
            />
          </Field>

          <Field label="Claim Limit">
            <input
              type="number"
              placeholder="100"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
            />
          </Field>

         

         

          <div className="md:col-span-2">
            <button
              type="button"
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all duration-300"
            >
              Create Coupon
            </button>
          </div>
        </form>

        <div className="mt-10">
          <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Existing Coupons
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No coupons created yet.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="mb-1 text-sm text-gray-600 dark:text-gray-300">{label}</div>
      {children}
    </label>
  );
}
