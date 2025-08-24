import React from 'react';

const UpdateMethod = () => {
    return (
        <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-[#00baff]">Edit Withdraw Method</h1>
            </div>

            <form className="max-w-full mx-auto flex flex-col gap-5 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                      
                        className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Minimum Amount</label>
                    <input
                        type="number"
                       
                        className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Maximum Amount</label>
                    <input
                        type="number"
                       
                        className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        rows="3"
                        placeholder="Write description"
                        className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <select className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div className="text-end">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateMethod;
