import React from "react";

const InvoicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1220] p-6 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-[#0F1724] rounded-lg shadow-sm p-6 mb-6 border border-gray-200 dark:border-[#1F2937] transition-colors duration-300">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-[#1F2937] pb-4">
          <h1 className="text-xl font-bold text-blue-600 dark:text-[#60A5FA]">
            Invoice
          </h1>
          <span className="text-sm text-gray-500 dark:text-[#94A3B8]">
            Order #KIKf6t0JK2
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 dark:text-[#94A3B8] text-sm">
              Order Date:
            </p>
            <p className="font-medium text-gray-900 dark:text-[#E6EEF8]">
              01 Aug, 2025
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-[#94A3B8] text-sm">
              Billed To:
            </p>
            <p className="font-medium text-gray-900 dark:text-[#E6EEF8]">
              Ripok
            </p>
            <p className="text-gray-800 dark:text-[#E6EEF8]">
              Email: ripok123456@gmail.com
            </p>
            <p className="text-gray-800 dark:text-[#E6EEF8]">Address: —</p>
            <p className="text-gray-800 dark:text-[#E6EEF8]">
              Payment Method: Bank
            </p>
            <p className="text-gray-800 dark:text-[#E6EEF8]">
              Payment Status: Pending
            </p>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white dark:bg-[#0F1724] rounded-lg shadow-sm p-6 mb-6 border border-gray-200 dark:border-[#1F2937] transition-colors duration-300">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-[#E6EEF8]">
          Order Summary
        </h2>
        <table className="w-full text-left border border-gray-200 dark:border-[#1F2937]">
          <thead className="bg-gray-100 dark:bg-[#071321] text-gray-600 dark:text-[#94A3B8]">
            <tr>
              <th className="p-3 border border-gray-200 dark:border-[#1F2937]">
                #
              </th>
              <th className="p-3 border border-gray-200 dark:border-[#1F2937]">
                Item
              </th>
              <th className="p-3 border border-gray-200 dark:border-[#1F2937]">
                By
              </th>
              <th className="p-3 border border-gray-200 dark:border-[#1F2937] text-right">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 dark:hover:bg-[#131B2D] transition">
              <td className="p-3 border border-gray-200 dark:border-[#1F2937] text-gray-900 dark:text-[#E6EEF8]">
                1
              </td>
              <td className="p-3 border border-gray-200 dark:border-[#1F2937] text-gray-900 dark:text-[#E6EEF8]">
                Passive Income From Marketplace By Laravel Script
              </td>
              <td className="p-3 border border-gray-200 dark:border-[#1F2937]">
                <p className="text-gray-900 dark:text-[#E6EEF8]">
                  Md Abu Sayed
                </p>
                <p className="text-sm text-blue-500 dark:text-[#60A5FA]">
                  sayed@quickskillbd.com
                </p>
              </td>
              <td className="p-3 border border-gray-200 dark:border-[#1F2937] text-right text-gray-900 dark:text-[#E6EEF8]">
                999.00 BDT
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Status Update */}
      <div className="bg-white dark:bg-[#0F1724] rounded-lg shadow-sm p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 dark:border-[#1F2937] transition-colors duration-300">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-[#E6EEF8]">
            Payment Status
          </label>
          <select className="w-full border border-gray-300 dark:border-[#1F2937] rounded-lg p-2 focus:ring focus:ring-blue-200 dark:bg-[#071321] dark:text-[#E6EEF8] transition">
            <option>Pending</option>
            <option>Paid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-[#E6EEF8]">
            Order Status
          </label>
          <select className="w-full border border-gray-300 dark:border-[#1F2937] rounded-lg p-2 focus:ring focus:ring-blue-200 dark:bg-[#071321] dark:text-[#E6EEF8] transition">
            <option>Completed</option>
            <option>Processing</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="bg-white dark:bg-[#0F1724] rounded-lg shadow-sm p-6 mb-6 border border-gray-200 dark:border-[#1F2937] transition-colors duration-300">
        <div className="flex justify-between py-1 text-gray-900 dark:text-[#E6EEF8]">
          <span>Subtotal</span>
          <span>999.00 BDT</span>
        </div>
        <div className="flex justify-between py-1 text-gray-900 dark:text-[#E6EEF8]">
          <span>Gateway Charge</span>
          <span>0.00 BDT</span>
        </div>
        <div className="flex justify-between py-1 text-gray-900 dark:text-[#E6EEF8]">
          <span>Discount</span>
          <span>0.00 BDT</span>
        </div>
        <hr className="my-2 border-gray-200 dark:border-[#1F2937]" />
        <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-[#E6EEF8]">
          <span>Total</span>
          <span>999.00 BDT</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button className="bg-blue-600 dark:bg-[#2563EB] text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 dark:hover:bg-[#1E4ED8] transition">
          Update
        </button>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600 transition">
          Print
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
