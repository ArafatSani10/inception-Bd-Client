import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaComment, FaShare, FaBookmark, FaHeart } from "react-icons/fa";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}`);
        setBlog(res.data.data || res.data);
        setLikeCount(res.data.data?.likes || 0);
      } catch (err) {
        console.error(err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center py-20 text-gray-500 dark:text-gray-400">Loading...</p>;
  if (!blog) return <p className="text-center py-20 text-red-500">Blog post not found</p>;

  return (
    <div className="bg-gray-50 max-sm:mt-20 dark:bg-[#0a0e20] min-h-screen">

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-[#00baff] to-[#0088cc] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00baff]/50 to-[#0088cc]/50 z-0"></div>
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>

        <div className="relative z-10 px-4">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
            {blog.title}
          </h1>
          <p className="text-white/90 mt-3 text-sm md:text-lg">{blog.description}</p>
          <div className="flex justify-center items-center gap-6 mt-4 text-white/90 text-sm flex-wrap">
            <span className="flex items-center gap-1 bg-white/20 dark:bg-gray-800/30 px-3 py-1.5 rounded-full">
              <FaCalendarAlt /> {new Date(blog.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-2 bg-white/20 dark:bg-gray-800/30 px-3 py-1.5 rounded-full">
              <img src={blog.author?.photo || `https://ui-avatars.com/api/?name=${blog.author?.name || "Author"}`} alt={blog.author?.name} className="w-6 h-6 rounded-full border-2 border-white" />
              {blog.author?.name || "Unknown"}
            </span>
            <span className="flex items-center gap-1 bg-white/20 dark:bg-gray-800/30 px-3 py-1.5 rounded-full">
              <FaComment /> {blog.commentCount || 0} Comments
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        {/* Thumbnail */}
        {blog.thumbnail && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden mb-8 hover:scale-105 transition-transform">
            <img src={blog.thumbnail} alt={blog.title} className="w-full h-[500px] object-cover" />
          </div>
        )}

        {/* Content Card */}
        <article className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8 mb-8 prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: blog.content || blog.description }} />
        </article>

        {/* Tags & Action Buttons */}
        <div className="flex flex-wrap justify-between items-center mb-12 gap-4">
          <div className="flex flex-wrap gap-2">
            {blog.tags?.map((tag, idx) => (
              <span key={idx} className="bg-gradient-to-r from-[#00baff] to-[#0088cc] text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition transform shadow-md">
                {tag.replace(/[\[\]"]+/g, "")}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <button onClick={() => { setIsLiked(!isLiked); setLikeCount(isLiked ? likeCount-1 : likeCount+1) }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${isLiked ? 'bg-red-100 text-red-500 dark:bg-red-900/30' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'} hover:shadow-lg transition`}>
              <FaHeart /> {likeCount}
            </button>
            <button onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${isBookmarked ? 'bg-yellow-100 text-yellow-500 dark:bg-yellow-900/30' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'} hover:shadow-lg transition`}>
              <FaBookmark /> Bookmark
            </button>
            <button onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:shadow-lg transition">
              <FaShare /> Share
            </button>
          </div>
        </div>

        {/* Author Card */}
        <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 mb-20">
          <img src={blog.author?.photo || `https://ui-avatars.com/api/?name=${blog.author?.name || 'Author'}`} alt={blog.author?.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#00baff]" />
          <div>
            <p className="text-gray-900 dark:text-white font-semibold">{blog.author?.name || "Unknown"}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Author</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogDetails;
