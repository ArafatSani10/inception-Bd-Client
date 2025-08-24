import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

const PostComment = () => {
  // Example dummy data for now
  const [comments, setComments] = useState([
    {
      id: 1,
      comment: "Great article! Very helpful.",
      post: "React Hooks Guide",
      author: "John Doe",
      email: "john@example.com",
      status: "Approved",
    },
    {
      id: 2,
      comment: "I have a question about useEffect.",
      post: "React Hooks Guide",
      author: "Jane Smith",
      email: "jane@example.com",
      status: "Pending",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-[#00baff]">
          Post Comments
        </h2>

        {comments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
              <thead className="bg-gray-200 dark:bg-gray-700 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3">SN</th>
                  <th className="px-4 py-3">Comment</th>
                  <th className="px-4 py-3">Post</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((c, index) => (
                  <tr
                    key={c.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{c.comment}</td>
                    <td className="px-4 py-3">{c.post}</td>
                    <td className="px-4 py-3">{c.author}</td>
                    <td className="px-4 py-3">{c.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          c.status === "Approved"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs">
                        <FaEdit size={20}></FaEdit>
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs">
                        <FaDeleteLeft size={20}></FaDeleteLeft>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
              alt="No Data"
              className="w-32 h-32 mb-4"
            />
            <p className="text-gray-500 dark:text-gray-300 text-lg">
              Data not found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostComment;
