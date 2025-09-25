import React from "react";
import Banner from "../Banner/Banner";
import EstimatedCount from "../../EstimatedCount/EstimatedCount";
import TopCourses from "./TopCourses/TopCourses";
import AllCoursesList from "./AllCoursesList/AllCoursesList";
import StudentFeedback from "./StudentFeedback/StudentFeedback";
import SuccessStory from "./SuccessStory/SuccessStory";
import OurInstructor from "./OurInstructor/OurInstructor";
import CourseCategory from "./CourseCategory/CourseCategory";
import Podcast from "./Podcast/Podcast";
import BlogSection from "./Blogsection/BlogSection";
import VideoSection from "./VideoSection/VideoSection";
import PartnershipLogo from "./PartnershipLogo/PartnershipLogo";
import { useGetInitialLandingPageDataQuery } from "../../../redux/api/userApi";
import { Loader } from "lucide-react";

const Home = () => {
  const {
    data: initialLandingPageDataRes,
    isLoading,
    isError,
    refetch,
  } = useGetInitialLandingPageDataQuery();
  const initialData = initialLandingPageDataRes?.data;

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader className="size-10 animate-spin " />
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full relative pt-20 px-2 text-gray-900 dark:text-gray-100 transition-colors duration-500 overflow-hidden">
      {/* Light mode background */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundColor: "#f9fafb",
          backgroundImage: `
            radial-gradient(
              60% 40% at 80% 20%,
              rgba(100, 160, 255, 0.2),
              transparent 70%
            ),
            radial-gradient(
              40% 30% at 10% 90%,
              rgba(56, 189, 248, 0.15),
              transparent 80%
            )
          `,
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark mode background */}
      <div
        className="absolute inset-0 z-0 dark:block hidden"
        style={{
          backgroundColor: "#00091a",

          backgroundBlendMode: "screen",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content */}
      <div className="relative z-10 ">
        <Banner latestCourse={initialData?.latestCourse}></Banner>
        {/* Add more content here */}

        <EstimatedCount
          totalEnrolled={initialData?.totalEnrolledStudents}
          totalCourse={initialData?.totalCourse}
          totalInstructor={initialData?.totalInstructor}
        ></EstimatedCount>

        {/* top course */}
        <TopCourses courses={initialData?.courses} />

        {/* all course */}
        <AllCoursesList courses={initialData?.courses} />

        {/* our instructor */}
        <OurInstructor instructors={initialData?.allInstructors} />

        {/* coursecategory */}
        <CourseCategory categories={initialData?.categories} />

        {/* video section */}
        <VideoSection></VideoSection>

        {/* student feedback */}
        <StudentFeedback></StudentFeedback>

        {/* video feedback */}
        <SuccessStory></SuccessStory>

        {/* podcast */}
        <Podcast></Podcast>

        {/* blog */}
        {initialData?.blogs?.length > 0 && (
          <BlogSection blogPosts={initialData?.blogs} />
        )}

        {/* partnershiplogo */}
        {initialData?.brands?.length > 0 && (
          <PartnershipLogo brands={initialData?.brands} />
        )}
      </div>
    </div>
  );
};

export default Home;
