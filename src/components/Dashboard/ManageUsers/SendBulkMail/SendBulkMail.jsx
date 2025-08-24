import React from "react";

export default function SendBulkMail() {
  return (
    <div className=" flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-4">
      <div className="w-full max-w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-[#00baff]">Send Bulk Mail</h1>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Subject</label>
          <input
            type="text"
            placeholder="Enter subject"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Description</label>
          <textarea
            rows={6}
            placeholder="Write your message here..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Send Mail
        </button>
      </div>
    </div>
  );
}
