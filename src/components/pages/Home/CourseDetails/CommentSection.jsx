import React, { useState, useRef, useEffect } from "react";

const CommentSection = ({ comments }) => {
    if (!comments || comments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">

            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-full">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Comments ({comments.length})
            </h2>
            {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

const CommentCard = ({ comment }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [reply, setReply] = useState(comment.reply || null);
    const [showMenu, setShowMenu] = useState(false);
    const [showReplyMenu, setShowReplyMenu] = useState(false);

    const menuRef = useRef();
    const replyMenuRef = useRef();

    // Auto-close menu on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
            if (replyMenuRef.current && !replyMenuRef.current.contains(event.target)) {
                setShowReplyMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleReplySubmit = () => {
        if (!replyText.trim()) return;

        const newReply = {
            userName: "Inception BD",
            role: "Instructor",
            userImage: "https://i.pravatar.cc/50",
            text: replyText,
            date: new Date().toLocaleString(),
        };

        setReply(newReply);
        setReplyText("");
        setShowReplyBox(false);
    };

    const handleEdit = () => {
        alert("Edit comment functionality!");
        setShowMenu(false);
    };

    const handleDelete = () => {
        alert("Delete comment functionality!");
        setShowMenu(false);
    };

    const handleReplyEdit = () => {
        alert("Edit reply functionality!");
        setShowReplyMenu(false);
    };

    const handleReplyDelete = () => {
        alert("Delete reply functionality!");
        setReply(null);
        setShowReplyMenu(false);
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300 max-w-full">
            {/* User Info */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <img
                        src={comment.userImage}
                        alt={comment.userName}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-white dark:ring-gray-800 shadow-sm"
                    />
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{comment.userName}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
                    </div>
                </div>
                <div className="relative flex items-center space-x-2">
                    <span className="text-xs text-gray-400 dark:text-gray-500">{comment.date}</span>
                    <div ref={menuRef} className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                        >
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                                <button
                                    onClick={handleEdit}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-t-lg"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 rounded-b-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Comment Text */}
            <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm leading-relaxed">{comment.commentText}</p>

            {/* Reply Button */}
            {!reply && (
                <button
                    onClick={() => setShowReplyBox(!showReplyBox)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                    {showReplyBox ? "Cancel" : "Reply"}
                </button>
            )}

            {/* Reply Input */}
            {showReplyBox && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply..."
                        rows="3"
                        className="w-full border-0 bg-white dark:bg-gray-900 rounded-lg p-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    <div className="flex justify-end mt-3 space-x-2">
                        <button
                            onClick={() => setShowReplyBox(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleReplySubmit}
                            disabled={!replyText.trim()}
                            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            Post Reply
                        </button>
                    </div>
                </div>
            )}

            {/* Display Reply */}
            {reply && (
                <div className="mt-6 ml-4 pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-sm flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                            <img
                                src={reply.userImage}
                                alt={reply.userName}
                                className="w-10 h-10 rounded-lg object-cover ring-2 ring-white dark:ring-gray-800"
                            />
                            <div className="flex flex-col">
                                <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{reply.userName}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{reply.role}</p>
                                <p className="text-gray-700 dark:text-gray-300 text-sm  leading-relaxed mt-5">{reply.text}</p>
                            </div>


                        </div>

                        <div ref={replyMenuRef} className="relative flex items-center gap-3">
                            <p className="text-gray-700 dark:text-gray-300 text-xs   ">{reply.date}</p>



                            <button
                                onClick={() => setShowReplyMenu(!showReplyMenu)}
                                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </button>
                            {showReplyMenu && (
                                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                                    <button
                                        onClick={handleReplyEdit}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-t-lg"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleReplyDelete}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 rounded-b-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentSection;
