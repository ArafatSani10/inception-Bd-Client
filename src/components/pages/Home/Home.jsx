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

const Home = () => {
  return (
    <div className=" w-full relative pt-20 px-2 text-gray-900 dark:text-gray-100 transition-colors duration-500 overflow-hidden">
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

        <Banner></Banner>
        {/* Add more content here */}

        <EstimatedCount></EstimatedCount>


        {/* top course */}
        <TopCourses></TopCourses>

        {/* all course */}
        <AllCoursesList></AllCoursesList>

        {/* our instructor */}
        <OurInstructor></OurInstructor>

        {/* coursecategory */}
        <CourseCategory></CourseCategory>

        {/* video section */}
        <VideoSection></VideoSection>

        {/* student feedback */}
        <StudentFeedback></StudentFeedback>

        {/* video feedback */}
        <SuccessStory></SuccessStory>

        {/* podcast */}
        <Podcast></Podcast>


        {/* blog */}
        <BlogSection></BlogSection>

        {/* partnershiplogo */}
        <PartnershipLogo></PartnershipLogo>





      </div>
    </div>
  );
};

export default Home;
