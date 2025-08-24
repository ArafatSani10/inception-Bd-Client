import React from "react";
import { useEffect, useState } from "react";

// Sample avatars (place your images in public/images/)
const authorImages = {
    "Boktiar Ahmed Bappy": "https://inceptionbd.com/store/1/IMG_8206.jpg",
    "Md Ridoy Hossain": "https://inceptionbd.com/store/1/1686419740636.jpg",
    "Md Maruf Hossain": "https://inceptionbd.com/store/1946/avatar/67925d2930c56.png",
    "Debasis Kumar Biswas": "/images/debasis.jpg",
};

const recentCourses = [
    {
        title: "Generative Ai course in Bangla",
        author: "Boktiar Ahmed Bappy",
        status: "pending",
        time: "51 minutes ago",
    },
    {
        title: "Phython live course in Bangla",
        author: "Md Ridoy Hossain",
        status: "approved",
        time: "1 week ago",
    },
    {
        title: "Web Development",
        author: "Md Maruf Hossain",
        status: "approved",
        time: "3 weeks ago",
    },
];

const recentBlogs = [
    {
        title: "Why You Need to Learn Python in 2025",
        author: "Md Ridoy Hossain",
        status: "Approved",
        time: "8 months ago",
    },
    {
        title: "The Importance of Artificial Intelligence and Generative AI for the Future",
        author: "Boktiar Ahmed Bappy",
        status: "Approved",
        time: "9 months ago",
    },
    {
        title: "Electrical Engineering & Automation Pioneers of Technology",
        author: "Debasis Kumar Biswas",
        status: "Approved",
        time: "9 months ago",
    },
];

export default function RecentUpdates() {

    return (
        <div >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Reusable Card Component */}
                <InfoCard
                    title="Recent Courses"
                    subtitle="(1) Courses are pending"
                    data={recentCourses}
                />
                <InfoCard
                    title="Recent Blogs"
                    subtitle="(0) Blogs are pending"
                    data={recentBlogs}
                />

            </div>

            <footer className="text-start mt-5 text-sm text-gray-500 dark:text-gray-400">
                All Rights Reserved BY: <strong>Inception BD</strong> | Powered By: <strong>Inception BD</strong> <br />

            </footer>
        </div>
    );
}

function InfoCard({ title, subtitle, data }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="bg-[#00baff] text-white p-4 rounded-t-xl">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm mt-1">{subtitle}</p>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {data.map((item, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <h3 className="text-[#00baff] dark:text-[#00baff] font-medium">{item.title}</h3>
                        <div className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex items-center space-x-2">
                            <img
                                src={authorImages[item.author] || "/images/default-avatar.png"}
                                alt={item.author}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                            <span>{item.author}</span>
                            <span>•</span>
                            <span className={`capitalize ${item.status === "pending" ? "text-yellow-600 dark:text-yellow-400" : "text-green-600 dark:text-green-400"}`}>
                                {item.status}
                            </span>
                            <span>•</span>
                            <span>{item.time}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 text-right">
                <a href="#" className="text-blue-500 text-sm font-medium hover:underline">
                    View All &rarr;
                </a>
            </div>
        </div>
    );
}
