import React from "react";

const PurchaseCourse = () => {
  // demo data (backend থেকে আসবে পরে)
  const purchases = [
    {
      _id: "2025",
      title: "The Complete Python Course in English",
      price: "Free",
      rating: 5.0,
      instructor: "Boktiar Ahmed Bappy",
      category: "Programming",
      date: "31 Aug 2025",
      thumbnail:
        "https://i.ibb.co/svMq9gM/python-course.jpg",
    },
    {
      _id: "2026",
      title: "Master Object-oriented programming (OOP) in Python (English)",
      price: "Free",
      rating: 5.0,
      instructor: "Boktiar Ahmed Bappy",
      category: "Programming",
      date: "31 Aug 2025",
      thumbnail:
        "https://i.ibb.co/x3m0gCh/python-oop.jpg",
    },
    {
      _id: "2024",
      title: "Python Live for Beginners in Bangla",
      price: "Free",
      rating: 4.29,
      instructor: "Md Ridoy Hossain",
      category: "Programming",
      date: "31 Aug 2025",
      thumbnail:
        "https://i.ibb.co/6tK6jSh/python-live.jpg",
    },
  ];

  return (
    <div className="max-w-full mx-auto mt-12 p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        My Purchases
      </h2>

      {purchases.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You haven’t purchased any course yet.
        </p>
      ) : (
        <div className="space-y-6">
          {purchases.map((course) => (
            <div
              key={course._id}
              className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-4"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-32 h-20 md:w-40 md:h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Category: {course.category}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Instructor: {course.instructor}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-yellow-400 font-bold">
                      {course.rating} ★
                    </span>
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                      {course.price}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Item ID: {course._id} | Purchase Date: {course.date}
                  </p>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-medium transition">
                  View Course
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchaseCourse;
