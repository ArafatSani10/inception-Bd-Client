import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CiCalendar, CiShare2, CiTimer } from "react-icons/ci";
import {
  FaAddressCard,
  FaHeadphones,
  FaMinus,
  FaPlus,
  FaWhatsapp,
} from "react-icons/fa";
import { GoPersonAdd } from "react-icons/go";
import { GrGift } from "react-icons/gr";
import {
  MdFavorite,
  MdOutlineDone,
  MdOutlineLightbulb
} from "react-icons/md";
import { Link, useParams } from "react-router";
import ReviewsSection from "./ReviewsSection";
// import AuthContext from "../../../Content/Authcontext";
import { Loader } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import AuthContext from "../../../../Content/Authcontext";
import { useCreateCommentMutation } from "../../../../redux/api/commentApi";
import { useMyOrdersQuery } from "../../../../redux/api/orderApi";
import CourseOutlineTab from "../../../CourseOutlineTab";
import CommentSection from "./CommentSection";

const CourseDetails = () => {
  const { user } = useContext(AuthContext);
  const [openIndex, setOpenIndex] = useState(null);
  const [openLearning, setOpenLearning] = useState(null);
  const [activeTab, setActiveTab] = useState("information");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [createComment] = useCreateCommentMutation();

  // new add

  const [comments, setComments] = useState(course?.comments || []);
  const [newComment, setNewComment] = useState("");

  // ✅ নতুন কমেন্ট যোগ করার ফাংশন
  const handlePostComment = async () => {
    const commentData = {
      courseId: course._id,
      comment: newComment,
      email: user?.email,
    };
    if (!newComment.trim()) return; // Prevent empty comments
    try {
      const res = await createComment(commentData).unwrap();
      if (res?.success) {
        toast.success("Comment posted successfully!");
      }
      setComments((prev) => [...prev, res]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  const [instructorData, setInstructorData] = useState(null);

  const { idOrSlug } = useParams();

  const { data: orderRes } = useMyOrdersQuery(user?.email, {
    skip: !user?.email,
  });
  const myOrders =
    orderRes?.data?.filter((order) => order.status === "complete") || [];

  // চেক করব user এই course কিনেছে কিনা
  const isEnrolled = myOrders.some(
    (order) => order?.course?._id === course?._id
  );

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleLearning = (index) => {
    setOpenLearning(openLearning === index ? null : index);
  };

  console.log("job ready course",course?._id)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/courses/${idOrSlug}`
        );
        setCourse(res.data.data || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [idOrSlug]);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const email = course?.instructor?.email; // or ID
        if (!email) return;
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        const allUsers = res?.data?.data || [];
        const instructor = allUsers.find((u) => u.email === email);
        setInstructorData(instructor);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInstructor();
  }, [course]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
        const completedOrders = response.data?.data?.filter(order => order.status === "complete" && order?.course?._id === course?._id) || [];
        setCompletedOrders(completedOrders);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [course]);

  if (loading || !course) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader className="size-10 animate-spin " />
      </div>
    );
  }

  // Calculate price display
  const isPaid = course.type === "paid";
  const hasDiscount = course.discountPrice > 0;
  const displayPrice = hasDiscount ? course.discountPrice : course.price;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-full p-3 bg-gray-100 dark:bg-[#0f172a] text-black dark:text-white">
      <Helmet>
        <title>{course.title} - Inception-BD</title>
        <meta
          name="description"
          content={course.metaDescription || course.description}
        />
      </Helmet>

      {/* Background Image Section */}
      <div className="relative w-full h-auto">
        <div
          className="relative w-full mt-10 max-sm:mt-20 overflow-hidden 
  h-[400px] lg:h-[400px] md:h-[300px] sm:h-[250px] max-sm:h-auto"
        >
          <img
            src={course.coverPhoto}
            alt="Course Background"
            className="w-full h-full max-sm:h-auto object-cover max-sm:object-contain"
          />
          <div className="hidden lg:block max-sm:block absolute inset-0"></div>
        </div>

        <div className="w-full mx-auto    px-2 py-8 rounded-xl  dark:bg-transparent relative z-10">
          <h1 className="text-[#00baff]  text-sm lg:text-3xl font-bold mb-3 leading-tight text-start lg:text-left">
            {course.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 mb-3 justify-center lg:justify-start">
            <h2 className="font-semibold text-xs md:text-xl text-gray-900 dark:text-gray-200 underline">
              <span className="text-black dark:text-white">
                {course.category?.name || "Uncategorized"}
              </span>
            </h2>

            <div className="flex items-center">
              {Array(5)
                .fill("★")
                .map((star, i) => (
                  <span
                    key={i}
                    className="text-yellow-400 dark:text-yellow-300 text-xl"
                  >
                    {star}
                  </span>
                ))}
            </div>
          </div>

          <p className="text-sm text-gray-800 dark:text-gray-300 mb-6 text-start lg:text-left">
            created by{" "}
            <span className="underline font-medium cursor-pointer hover:text-[#00baff] dark:hover:text-[#38bdf8] transition">
              {course.instructor?.name || "Unknown"}
            </span>
          </p>
        </div>
      </div>

      {/* Main Flex Section */}
      <div className="flex flex-col lg:flex-row  mt-4">
        {/* Left Side with Tabs */}
        <div className="w-full lg:w-2/3 mx-auto border-2 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
          {/* Tabs */}
          <div className="flex border-b border-gray-300 dark:border-gray-700">
            {["information", "Course Curriculum", "review"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-center font-semibold uppercase tracking-wide ${activeTab === tab
                    ? "border-b-4 border-[#00baff] text-[#00baff]"
                    : "text-gray-500 hover:text-[#00baff]"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="w-full p-3">
            {activeTab === "information" && (
              <>
                {/* Learning Points */}
                <div className="space-y-6 mt-5">
                  <h1 className="text-xl  max-sm:text-sm font-bold text-[#00baff]">
                    What You Will Learn?
                  </h1>

                  <ul className="space-y-5 max-sm:space-y-7 text-gray-800 dark:text-gray-300 text-base leading-relaxed">
                    {course.learningPoints?.map((point, index) => (
                      <li
                        key={point._id || index}
                        className="flex items-start gap-2 "
                      >
                        <MdOutlineDone className="text-green-500 text-lg mt-[2px]" />
                        <span className="font-medium max-sm:text-sm">
                          {point.subject || point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* About */}
                <h1 className="font-bold max-sm:text-sm text-xl mt-6 text-[#00baff]">
                  About This Course
                </h1>
                <p className="opacity-70 border p-3 md:text-lg text-sm mt-3 dark:border-gray-700 dark:bg-gray-900">
                  {course.description}
                </p>

                {/* Requirements */}
                <h1 className="text-lg max-sm:text-sm mb-4 font-bold mt-6 text-[#00baff]">
                  Requirements
                </h1>
                <div className=" bg-base-200  space-y-4 rounded-md">
                  {course.requirements?.map((req, i) => (
                    <p
                      key={i}
                      className="flex items-center max-sm:text-sm  gap-2"
                    >
                      <MdOutlineDone className="text-green-500 text-lg  mt-[2px]" />{" "}
                      {req}
                    </p>
                  ))}
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4 mt-10">
                  <h1 className="md:text-lg text-sm text-[#00baff] font-bold ">
                    FAQ
                  </h1>
                  {course.faqs?.map((faq, index) => (
                    <div
                      key={faq._id || index}
                      className="border border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-800 text-left"
                      >
                        <span className="text-lg max-sm:text-xs  font-medium text-gray-900 dark:text-gray-100">
                          {faq.question}
                        </span>
                        <span className="text-blue-600 dark:text-blue-400">
                          {openIndex === index ? <FaMinus /> : <FaPlus />}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {openIndex === index && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 py-4 max-sm:text-xs bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t dark:border-gray-700">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Comments */}
                {/* Comments */}
                <div className="mt-6">
                  <h1 className="text-lg max-sm:text-sm text-[#00baff] font-semibold">
                    Comments
                  </h1>

                  <textarea
                    className="w-full p-2 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-600"
                    rows="4"
                    placeholder="Write your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>

                  <button
                    onClick={handlePostComment}
                    className="mt-3 px-4 py-2 bg-[#00baff] text-white rounded-lg font-bold"
                  >
                    Post Comment
                  </button>
                </div>

                {/* Comment গুলো দেখাবে নিচে */}
                {course?.comments?.length > 0 && (
                  <div className="mt-5 p-4 ">
                    <CommentSection comments={course?.comments} />
                  </div>
                )}

                {/* aikhane comment gulo show hobe..!!! */}
                {/* <div className="mt-5  ">
                  <CommentSection></CommentSection>
                </div> */}
              </>
            )}

            {activeTab === "Course Curriculum" && (
              <>
                <CourseOutlineTab course={course} />
              </>
              // <CourseContent course={course} isEnrolled={isEnrolled} />
            )}

            {activeTab === "review" && (
              <div>
                <ReviewsSection course={course} />
              </div>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/3 relative bg-base-100  rounded-lg">
          <div className="card md:-mt-52 p-1 bg-base-100 dark:bg-gray-900 w-full shadow-xl relative z-10 overflow-visible">
            <figure className="w-full max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-lg">
              <img
                className="w-full aspect-[16/9] object-cover"
                src={course.thumbnail}
                alt={course.title}
              />
            </figure>

            <div className="card-body">
              <div className="flex items-center justify-center">
                <h1
                  className={`text-4xl text-center font-bold my-3 ${isPaid
                      ? "text-green-500 dark:text-green-300"
                      : "text-blue-500"
                    }`}
                >
                  {isPaid ? (
                    <>
                      {hasDiscount && (
                        <span className="text-gray-500 line-through text-lg mr-2">
                          ৳{course.price}
                        </span>
                      )}
                      ৳{displayPrice}
                    </>
                  ) : (
                    "Free"
                  )}
                </h1>
              </div>
              {/* (`/student-dashboard/module-page/${course.id}`); */}
              {/* এখানে condition check */}
              {isEnrolled ? (
                <Link to={`/student-dashboard/module-page/${course.id}`}>
                  <div className="flex justify-center">
                    <button className="p-2 text-center bg-green-600 hover:bg-green-700 transition-all duration-300 rounded-xl my-2 text-white w-full">
                      Go to Learning Page
                    </button>
                  </div>
                </Link>
              ) : (
                <Link to="/checkout" state={{ course }}>
                  <div className="flex justify-center">
                    <button disabled={course?._id == "68e36eeafe94d958c5a5870f"} className="p-2 text-center bg-[#00baff] hover:bg-indigo-600 transition-all duration-300 rounded-xl my-2 text-white w-full disabled:bg-gray-400 disabled:cursor-not-allowed">
                      {course?._id == "68e36eeafe94d958c5a5870f" ? "Enrollment Date Over" : "Enroll on course"}
                    </button>
                  </div>
                </Link>
              )}

              <div className="text-center text-sm opacity-60">
                <h1 className="flex gap-1 justify-center items-center">
                  5 Days money back guarantee
                </h1>
              </div>

              <div>
                <h1 className="font-bold mx-5 mt-6 text-[#00baff]">
                  This course includes:
                </h1>
                <div className="text-sm text-gray-700 dark:text-gray-200 p-3 space-y-2 transition-colors duration-300">
                  {/* Instructor support */}
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors cursor-default">
                    <FaHeadphones className="text-[#00baff]" />
                    <span>Instructor support</span>
                  </div>

                  {/* Course duration */}
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors cursor-default">
                    <CiTimer className="text-[#00baff]" />
                    <span>{course.duration} hours of content</span>
                  </div>

                  {/* WhatsApp Community */}
                  <a
                    href="https://chat.whatsapp.com/CbHbKxRNeygCNxLYXy9iW2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                      <FaWhatsapp className="text-[#25D366]" />
                      <span className="font-medium">WhatsApp Community</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="border-2 mt-5 shadow-xl rounded-lg p-3 flex items-center justify-between dark:border-gray-700">
                <div className="flex flex-col items-center">
                  <CiCalendar className="text-xl" />
                  <span className="text-xs mt-1">Reminder</span>
                </div>
                <div className="flex flex-col items-center">
                  <MdFavorite className="text-xl" />
                  <span className="text-xs mt-1">Favorite</span>
                </div>
                <div className="flex flex-col items-center">
                  <CiShare2 className="text-xl" />
                  <span className="text-xs mt-1">Share</span>
                </div>
              </div>

              <div className="mt-5 gap-3 border-2 p-3 rounded-xl flex items-center dark:border-gray-700">
                <div className="w-10 h-10 rounded-full bg-green-200 dark:bg-green-700 flex justify-center items-center">
                  <GrGift className="text-xl" />
                </div>
                <div>
                  <h1 className="font-bold opacity-70 text-[#00baff]">
                    Gift this course
                  </h1>
                  <p className="text-xs">
                    Send this course as a gift to your friends
                  </p>
                </div>
              </div>

              <div className="mt-5 border-2 shadow-xl rounded-lg p-4 dark:border-gray-700">
                <h1 className="font-bold text-[#00baff]">
                  Course specifications
                </h1>
                <div className="h-1 w-9 bg-green-500 my-2"></div>
                <div className="space-y-3 mt-3 opacity-70 text-sm">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <CiCalendar />
                      Start date:
                    </span>
                    <h1>{formatDate(course.startingDate)}</h1>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <PiStudentBold />
                      Total enroll :
                    </span>
                    <h1>{completedOrders.length}</h1>
                  </div> */}

                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <GoPersonAdd />
                      Capacity:
                    </span>
                    <h1>{"Unlimited"}</h1>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <CiTimer />
                      Duration:
                    </span>
                    <h1>{course.duration || "unlimited"} Hours </h1>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <FaAddressCard />
                      Number of lectures:
                    </span>
                    <h1>{course.sessions || "unlimited"}</h1>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <MdOutlineLightbulb />
                      Language:
                    </span>
                    <h1>{course.language || "Bangla"}</h1>
                  </div>
                </div>
              </div>

              {instructorData && (
                <div className="bg-white/30 dark:bg-transparent border border-black/50 dark:border-white/10 rounded-xl mt-4 p-5 hover:shadow-xl max-w-full mx-auto">
                  <img
                    src={
                      instructorData?.photo || "https://via.placeholder.com/150"
                    }
                    alt={instructorData?.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                  />
                  <h3 className="mt-5 text-xl font-semibold text-[#00baff] dark:text-[#00baff] text-center">
                    {instructorData?.name}
                  </h3>
                  <p className="text-[#00baff] dark:text-[#00baff] text-sm font-medium mt-2 text-center">
                    {instructorData?.jobTitle}
                  </p>
                  <div className="mt-3 text-yellow-400 text-lg text-center">
                    ⭐⭐⭐⭐⭐
                  </div>
                  <div className="flex justify-center mt-6">
                    <Link to={`/instructor/${instructorData?.email}`}>
                      <button className="px-5 py-2 rounded-full bg-[#00baff] hover:bg-indigo-600 text-white font-semibold shadow-md transition-all">
                        View Profile
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="mt-5 border-2 shadow-xl rounded-lg p-4 dark:border-gray-700">
                <div className="mb-3">
                  <h1 className="font-bold text-[#00baff]">Tags</h1>
                  <div className="h-1 w-12 bg-green-500 mt-1"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {course.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-2 bg-gray-300 dark:bg-gray-700 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 rounded-lg transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CourseDetails;
