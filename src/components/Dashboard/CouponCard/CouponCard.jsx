import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function CouponSystemDemo() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "fixed",
      status: "active",
      currentUses: 0,
    },
  });

  const [coupons, setCoupons] = useState([]);
  const watchAll = watch();

  // 🔹 API URL from .env
  const API_URL = `${import.meta.env.VITE_API_URL}/coupons`;

  // Load existing coupons (POST method)
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const { data } = await axios.post(API_URL); // ✅ using POST instead of GET
        setCoupons(data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
    fetchCoupons();
  }, [API_URL]);

  // Handle form submit (Create Coupon)
  const onSubmit = async (data) => {
    const now = new Date();
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (startDate < now) {
      alert("Start date cannot be in the past!");
      return;
    }
    if (endDate <= startDate) {
      alert("End date must be after start date!");
      return;
    }

    const newCoupon = {
      ...data,
      discountValue: Number(data.discountValue),
      maxUses: Number(data.maxUses),
      uses: Number(data.currentUses),
      applicableCourses: data.applicableCourses
        ? data.applicableCourses.split(",").map((c) => c.trim())
        : [],
    };

    try {
      const { data: savedCoupon } = await axios.post(API_URL, newCoupon);
      setCoupons((prev) => [...prev, savedCoupon]);
      reset();
    } catch (error) {
      console.error("Error creating coupon:", error);
      alert("Failed to create coupon!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl transition-colors duration-300">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Discount Code Manager
        </h2>

        {/* Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field label="Discount Code">
            <input
              {...register("code", { required: "Discount code is required" })}
              placeholder="e.g. NEWYEAR25"
              className={inputClass}
            />
            {errors.code && <p className={errorClass}>{errors.code.message}</p>}
          </Field>

          <Field label="Discount Type">
            <select {...register("type")} className={inputClass}>
              <option value="fixed">Fixed Amount</option>
              <option value="percentage">Percentage</option>
            </select>
          </Field>

          <Field label="Discount Value">
            <input
              type="number"
              {...register("discountValue", {
                required: "Discount value is required",
                min: { value: 1, message: "Value must be at least 1" },
              })}
              placeholder="100"
              className={inputClass}
            />
            {errors.discountValue && (
              <p className={errorClass}>{errors.discountValue.message}</p>
            )}
          </Field>

          <Field label="Max Uses">
            <input
              type="number"
              {...register("maxUses", {
                required: "Max uses required",
                min: { value: 1, message: "Must be at least 1" },
              })}
              placeholder="50"
              className={inputClass}
            />
            {errors.maxUses && (
              <p className={errorClass}>{errors.maxUses.message}</p>
            )}
          </Field>

          <Field label="Current Uses">
            <input
              type="number"
              {...register("currentUses")}
              className={inputClass}
            />
          </Field>

          <Field label="Status">
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-1">
                <input type="radio" value="active" {...register("status")} defaultChecked />
                Active
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" value="inactive" {...register("status")} />
                Inactive
              </label>
            </div>
          </Field>

          <Field label="Start Date & Time">
            <input
              type="datetime-local"
              {...register("startDate", { required: "Start date required" })}
              className={inputClass}
            />
            {errors.startDate && (
              <p className={errorClass}>{errors.startDate.message}</p>
            )}
          </Field>

          <Field label="End Date & Time">
            <input
              type="datetime-local"
              {...register("endDate", { required: "End date required" })}
              className={inputClass}
            />
            {errors.endDate && <p className={errorClass}>{errors.endDate.message}</p>}
          </Field>

          <Field label="Applicable Course IDs (comma separated)">
            <input
              {...register("applicableCourses")}
              placeholder="courseID1, courseID2"
              className={inputClass}
            />
          </Field>

          <div className="md:col-span-2 flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all duration-300"
            >
              Create Discount Code
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold shadow hover:opacity-90 transition-all duration-300"
            >
              Reset Form
            </button>
          </div>
        </form>

        {/* Live Preview */}
        <div className="mt-8 p-4 rounded-xl bg-gray-100 dark:bg-gray-700">
          <h3 className="font-semibold mb-2">Preview</h3>
          <p>Code: {watchAll.code || "Not set"}</p>
          <p>Type: {watchAll.type || "Not set"}</p>
          <p>Value: {watchAll.discountValue || "Not set"}</p>
          <p>
            Usage: {watchAll.currentUses || 0}/{watchAll.maxUses || 0}
          </p>
          <p>Status: {watchAll.status || "inactive"}</p>
          <p>
            Courses:{" "}
            {watchAll.applicableCourses
              ? watchAll.applicableCourses
              : "No courses"}
          </p>
        </div>

        {/* Existing Coupons */}
        <div className="mt-10">
          <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Existing Coupons
          </h3>
          {coupons.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No coupons created yet.
            </p>
          ) : (
            <div className="space-y-4">
              {coupons.map((c) => (
                <div
                  key={c._id}
                  className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl"
                >
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    {c.code} - {c.type} {c.discountValue}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {c.startDate} → {c.endDate}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Uses: {c.uses}/{c.maxUses} | Status: {c.status}
                  </p>
                </div>
              ))}
            </div>
          )}
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

// TailwindCSS Input class
const inputClass =
  "w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300";

// Error styling
const errorClass = "text-red-500 text-sm mt-1";
