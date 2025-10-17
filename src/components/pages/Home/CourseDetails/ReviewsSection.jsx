import React, { useContext, useState } from "react";
import { FaStar, FaEllipsisH, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import AuthContext from "../../../../Content/Authcontext";
import { useCreateReviewMutation } from "../../../../redux/api/reviewApi";
import { toast, ToastContainer } from "react-toastify";

const ReviewsSection = ({ course }) => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState(course?.reviews || []);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [createReview] = useCreateReviewMutation();

  // Calculate summary statistics
  const totalReviews = reviews?.length;
  const averageRating =
    totalReviews > 0
      ? (
        reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      ).toFixed(1)
      : "0.0";

  const starSummary = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews?.filter((r) => r.rating === star).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

    return {
      star,
      count,
      percentage,
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    const reviewData = {
      courseId: course._id,
      review: reviewText,
      email: user?.email,
      rating,
    };

    try {
      const res = await createReview(reviewData).unwrap();
      if (res?.success) {
        toast.success("Review posted successfully!");
      }
      setComments((prev) => [...prev, res]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to create review:", error);
    }
  };

  const StarRating = ({ rating, size = 16 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return (
              <FaStar key={index} className="text-yellow-400" size={size} />
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <FaStarHalfAlt
                key={index}
                className="text-yellow-400"
                size={size}
              />
            );
          } else {
            return (
              <FaRegStar key={index} className="text-yellow-400" size={size} />
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="max-w-full mx-auto p-2 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#00baff] mb-4">
          Course Reviews
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          See what other students think about this course
        </p>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Overall Rating Card */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 text-start">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-24 mt-5 ml-10   rounded-full flex items-center justify-center">
                <span className="text-6xl font-bold dark:text-white text-black">
                  {averageRating}
                </span>
              </div>

              <div className="">
                <StarRating rating={parseFloat(averageRating)} size={30} />
              </div>
            </div>
          </div>
        </div>

        {/* Star Breakdown */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Rating Breakdown
          </h3>
          <div className="space-y-4">
            {starSummary.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 w-20">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {star}
                  </span>
                  <FaStar className="text-yellow-400" />
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Review Form */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Share Your Experience
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              How would you rate this course?
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <FaStar
                    size={32}
                    className={`transition-colors ${(hoverRating || rating) >= star
                        ? "text-yellow-400 drop-shadow-lg"
                        : "text-gray-300 dark:text-gray-600"
                      }`}
                  />
                </button>
              ))}
              <span className="ml-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                {rating}
              </span>
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your thoughts about the course... What did you like? What could be improved?"
              rows={5}
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-4 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!reviewText.trim()}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              Post Review
            </button>
          </div>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Student Reviews ({totalReviews})
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Sort by: Latest</span>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaStar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Be the first to share your experience with this course!
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              StarRating={StarRating}
            />
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

const ReviewCard = ({ review, StarRating }) => {
  const { user } = useContext(AuthContext);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [reply, setReply] = useState(review.reply || null);
  const [optionsOpen, setOptionsOpen] = useState(false);

  /*
  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    const replyData = {
      comment: replyText,
      commentId: comment?._id,
      email: user?.email,
    };

    try {
      const res = await createComment(replyData).unwrap();
      if (res?.success) {
        toast.success("Reply posted successfully!");
      }
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };
  */

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    const replyData = {
      review: replyText,
      reviewId: review?._id,
      email: user?.email,
    };

    console.log("reply data:", replyData);

    const newReply = {
      userName: "Instructor Mike",
      role: "Instructor",
      text: replyText,
      date: new Date().toLocaleDateString(),
    };

    setReply(newReply);
    setReplyText("");
    setShowReplyBox(false);
    setOptionsOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {review?.user?.name[0]?.toUpperCase()}
            </div>
            {review?.user?.role === "instructor" && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {review?.user?.name}
              </h3>
              {/* {review?.user?.role === "instructor" && (
                <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium rounded-full shadow-sm">
                  Instructor
                </span>
              )} */}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {new Date(review?.createdAt).toLocaleString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true, // true → 12-hour format (e.g., 3:45 PM), false → 24-hour
              })}
            </p>
          </div>
        </div>

        {/* Options Menu */}
        {/* <div className="relative">
          <button
            onClick={() => setOptionsOpen(!optionsOpen)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FaEllipsisH />
          </button>

          {optionsOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl z-10 overflow-hidden">
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700">
                Edit Review
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700">
                Share Review
              </button>
              <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                Delete Review
              </button>
            </div>
          )}
        </div> */}
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-3 mb-4">
        <StarRating rating={review?.rating} size={18} />
        <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {review?.rating}
        </span>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        {review?.review}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-4">
          {!reply && (
            <button
              onClick={() => setShowReplyBox(!showReplyBox)}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Reply
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Reply Box */}
      {showReplyBox && (
        <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
            Write a Reply
          </h4>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply as an instructor..."
            rows={3}
            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowReplyBox(false)}
              className="px-6 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleReplySubmit}
              disabled={!replyText.trim()}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post Reply
            </button>
          </div>
        </div>
      )}

      {/* Display Reply */}
      {reply && (
        <div className="mt-6 ml-6 pl-6 border-l-2 border-blue-300 dark:border-blue-700">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-xl shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {reply.userName[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 text-sm">
                    {reply.userName}
                  </h4>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs font-medium rounded-full">
                    {reply.role}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {reply.date}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {reply.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ReviewsSection;
