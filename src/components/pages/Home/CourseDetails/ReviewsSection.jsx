import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../../../Content/Authcontext";
import axios from "axios";

// Emoji reactions allowed
const EMOJIS = ["👍", "❤️", "😂", "😮", "😢"];

const ReviewsSection = ({ courseId }) => {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch full user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user?.email) return;
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        const singleUser = res.data.data.find((u) => u.email === user.email);
        setDbUser(singleUser);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [user]);

  // Load reviews from localStorage
 // Save reviews to localStorage whenever they change
useEffect(() => {
    if(courseId && reviews) {
        localStorage.setItem(`courseReviews_${courseId}`, JSON.stringify(reviews));
    }
}, [reviews, courseId]);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`courseReviews_${courseId}`, JSON.stringify(reviews));
  }, [reviews, courseId]);

  // Post a new comment
  const postComment = () => {
    if (!newComment.trim() || !dbUser) return;
    const comment = {
      id: Date.now(),
      user: {
        id: dbUser.id || dbUser.email,
        name: dbUser.name,
        avatar:
          dbUser.photo || dbUser.image || `https://ui-avatars.com/api/?name=${dbUser.name}`,
      },
      text: newComment,
      createdAt: new Date().toISOString(),
      reactions: {},
      replies: [],
    };
    setReviews([comment, ...reviews]);
    setNewComment("");
  };

  // Post a reply to a comment
  const postReply = (commentId, replyText) => {
    if (!replyText.trim() || !dbUser) return;

    const reply = {
      id: Date.now(),
      user: {
        id: dbUser.id || dbUser.email,
        name: dbUser.name,
        avatar:
          dbUser.photo || dbUser.image || `https://ui-avatars.com/api/?name=${dbUser.name}`,
      },
      text: replyText,
      createdAt: new Date().toISOString(),
      reactions: {},
    };

    setReviews((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, replies: [...c.replies, reply] } : c))
    );
  };

  // Add reaction to comment or reply
  const addReaction = (commentId, emoji, isReply = false, replyId = null) => {
    if (!dbUser) return;

    setReviews((prev) =>
      prev.map((c) => {
        if (c.id !== commentId) return c;

        if (!isReply) {
          const userReacted = c.reactions[emoji]?.includes(dbUser.id);
          if (userReacted) return c; // Only one reaction per user per emoji
          const newReactions = { ...c.reactions };
          newReactions[emoji] = [...(newReactions[emoji] || []), dbUser.id];
          return { ...c, reactions: newReactions };
        } else {
          const newReplies = c.replies.map((r) => {
            if (r.id !== replyId) return r;
            const userReacted = r.reactions[emoji]?.includes(dbUser.id);
            if (userReacted) return r;
            const newReactions = { ...r.reactions };
            newReactions[emoji] = [...(newReactions[emoji] || []), dbUser.id];
            return { ...r, reactions: newReactions };
          });
          return { ...c, replies: newReplies };
        }
      })
    );
  };

  // Delete comment or reply
  const deleteCommentOrReply = (commentId, isReply = false, replyId = null) => {
    if (!dbUser) return;

    if (!isReply) {
      setReviews((prev) => prev.filter((c) => c.id !== commentId || c.user.id !== dbUser.id));
    } else {
      setReviews((prev) =>
        prev.map((c) => {
          if (c.id !== commentId) return c;
          const newReplies = c.replies.filter((r) => r.id !== replyId || r.user.id !== dbUser.id);
          return { ...c, replies: newReplies };
        })
      );
    }
  };

  if (!dbUser)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-10">Loading user...</p>
    );

  return (
    <div className="max-w-full mx-auto p-4 space-y-6">
      {/* New Comment */}
      <div className="flex flex-col space-y-2">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 rounded-md w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="Write a comment..."
        />
        <button
          onClick={postComment}
          className="self-end px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          Post Comment
        </button>
      </div>

      {/* Reviews */}
      {reviews.map((c) => (
        <Comment
          key={c.id}
          comment={c}
          postReply={postReply}
          addReaction={addReaction}
          deleteCommentOrReply={deleteCommentOrReply}
          currentUser={dbUser}
        />
      ))}
    </div>
  );
};

// Single Comment Component
const Comment = ({
  comment,
  postReply,
  addReaction,
  deleteCommentOrReply,
  currentUser,
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <div className="border p-4 rounded-md bg-gray-50 dark:bg-gray-900 shadow-sm">
      {/* Comment header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={comment.user.avatar}
            alt={comment.user.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {comment.user.name}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Delete button */}
        {comment.user.id === currentUser.id && (
          <button
            onClick={() => deleteCommentOrReply(comment.id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        )}
      </div>

      <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.text}</p>

      {/* Reactions */}
      <div className="flex space-x-2 mt-2">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => addReaction(comment.id, emoji)}
            className="px-2 py-1 border rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {emoji} {comment.reactions[emoji]?.length || ""}
          </button>
        ))}
      </div>

      {/* Replies */}
      <div className="pl-6 mt-2 space-y-2">
        {comment.replies.map((r) => (
          <div key={r.id} className="flex items-start justify-between">
            <div className="flex items-start space-x-2">
              <img src={r.user.avatar} alt={r.user.name} className="w-8 h-8 rounded-full" />
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{r.user.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {new Date(r.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300">{r.text}</p>

                {/* Reactions on reply */}
                <div className="flex space-x-2 mt-1">
                  {EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => addReaction(comment.id, emoji, true, r.id)}
                      className="px-2 py-1 border rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                    >
                      {emoji} {r.reactions[emoji]?.length || ""}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Delete reply */}
            {r.user.id === currentUser.id && (
              <button
                onClick={() => deleteCommentOrReply(comment.id, true, r.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        ))}

        {/* Reply Input */}
        {showReplyInput ? (
          <div className="flex space-x-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="border p-1 rounded-md flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Write a reply..."
            />
            <button
              className="bg-green-600 dark:bg-green-500 text-white px-3 rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition"
              onClick={() => {
                postReply(comment.id, replyText);
                setReplyText("");
                setShowReplyInput(false);
              }}
            >
              Reply
            </button>
          </div>
        ) : (
          <button
            className="text-blue-600 dark:text-blue-400 mt-1"
            onClick={() => setShowReplyInput(true)}
          >
            Reply
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
