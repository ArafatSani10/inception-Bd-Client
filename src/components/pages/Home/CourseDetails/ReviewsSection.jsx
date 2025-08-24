import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const categories = [
    "Content quality",
    "Instructor skills",
    "Purchase worth",
    "Support quality",
];

// Sample reviews data
const initialReviews = [
    {
        id: 1,
        name: "Nishan Ahamed",
        avatar: "https://i.pravatar.cc/40?img=1",
        rating: 5,
        date: "23 Jan 2025 | 19:26",
        comment: "Thank you for creating this course in Bangla!",
    },
    {
        id: 2,
        name: "MD Redhwan",
        avatar: null,
        initials: "MR",
        rating: 5,
        date: "27 Jan 2025 | 21:12",
        comment: "",
    },
    {
        id: 3,
        name: "Md Sohel Rana",
        avatar: "https://i.pravatar.cc/40?img=3",
        rating: 5,
        date: "31 Jan 2025 | 17:43",
        comment: "",
    },
    {
        id: 4,
        name: "Md Anamul Islam",
        avatar: null,
        initials: "MA",
        rating: 4,
        date: "4 Feb 2025 | 21:12",
        comment: "",
    },
    {
        id: 5,
        name: "Nabil Sowrov",
        avatar: null,
        initials: "NS",
        rating: 5,
        date: "6 Feb 2025 | 18:58",
        comment: "",
    },
];

function StarRating({ rating }) {
    return (
        <div className="flex text-yellow-400">
            {[1, 2, 3, 4, 5].map((i) =>
                i <= rating ? (
                    <FaStar key={i} />
                ) : (
                    <FaRegStar key={i} />
                )
            )}
        </div>
    );
}

export default function ReviewsSection() {
    // For review form state
    const [formRatings, setFormRatings] = useState({
        "Content quality": 0,
        "Instructor skills": 0,
        "Purchase worth": 0,
        "Support quality": 0,
    });
    const [formComment, setFormComment] = useState("");
    const [reviews, setReviews] = useState(initialReviews);

    // Calculate average rating
    const averageRating = (
        reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    ).toFixed(2);

    // Calculate category averages (for bars)
    const categoryAverages = {
        "Content quality": 4.9,
        "Instructor skills": 5,
        "Purchase worth": 5,
        "Support quality": 4.9,
    };

    const handleRatingClick = (category, value) => {
        setFormRatings((prev) => ({ ...prev, [category]: value }));
    };

    const handleSubmit = () => {
        // For demo, add a new review with average of ratings and comment
        const averageFormRating =
            Object.values(formRatings).reduce((a, b) => a + b, 0) /
            Object.values(formRatings).length;

        const newReview = {
            id: reviews.length + 1,
            name: "Anonymous User",
            avatar: null,
            initials: "AU",
            rating: Math.round(averageFormRating),
            date: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }),
            comment: formComment,
        };
        setReviews([newReview, ...reviews]);
        setFormComment("");
        setFormRatings({
            "Content quality": 0,
            "Instructor skills": 0,
            "Purchase worth": 0,
            "Support quality": 0,
        });
    };

    return (
        <div className="max-w-full mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            {/* Rating summary */}
            <div className="flex items-center gap-8 mb-6">
                <div className="text-center">
                    <div className="text-4xl font-extrabold text-green-500">{averageRating}</div>
                    <StarRating rating={Math.round(averageRating)} />
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        {reviews.length} Reviews
                    </div>
                </div>
                <div className="flex-1 space-y-3">
                    {Object.entries(categoryAverages).map(([cat, val]) => (
                        <div key={cat} className="flex items-center gap-4">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-yellow-400 h-3 rounded-full"
                                    style={{ width: `${(val / 5) * 100}%` }}
                                />
                            </div>
                            <div className="w-32 text-right text-sm text-gray-600 dark:text-gray-400">
                                {cat} ({val})
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reviews header */}
            <h2 className="font-semibold mb-3 border-b pb-1 dark:border-gray-700">
                Reviews ({reviews.length})
            </h2>

            {/* Review form */}
            <div className="mb-6 space-y-3">
                <textarea
                    rows="4"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Write your review here..."
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                ></textarea>

                {/* Rating inputs */}
                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                    {categories.map((cat) => (
                        <div key={cat}>
                            <div className="mb-1">{cat}</div>
                            <div className="flex justify-center gap-1 cursor-pointer">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => handleRatingClick(cat, star)}
                                        className={`text-yellow-400 ${formRatings[cat] >= star ? "opacity-100" : "opacity-40"
                                            }`}
                                    >
                                        <FaStar />
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-[#00baff] text-white px-4 py-1 rounded hover:bg-green-600 transition"
                >
                    Post review
                </button>
            </div>

            {/* Reviews list */}
            <div className="space-y-10">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex gap-5 items-start shadow"
                    >
                        {/* Avatar */}
                        {review.avatar ? (
                            <img
                                src={review.avatar}
                                alt={review.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-green-300 dark:bg-green-700 flex items-center justify-center text-white font-semibold">
                                {review.initials}
                            </div>
                        )}

                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{review.name}</h3>
                                    <StarRating rating={review.rating} />
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{review.date}</div>
                            </div>
                            {review.comment && (
                                <p className="mt-2 text-gray-800 dark:text-gray-300">{review.comment}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
