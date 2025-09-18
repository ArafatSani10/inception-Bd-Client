import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from "./layout/Mainlayout";
import Home from "./components/pages/Home/Home";
import "./index.css";
import Courses from "./components/pages/Courses/Courses";
import InstructorProfile from "./components/pages/Home/OurInstructor/InstructorProfile";
import AboutUs from "./components/pages/About/AboutUs/AboutUs";
import ContactUs from "./components/pages/ContactUs/ContactUs";
import InstructorPage from "./components/pages/InstructorPage/InstructorPage";
import BlogPage from "./components/pages/BlogPage/BlogPage";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import CourseDetails from "./components/pages/Home/CourseDetails/CourseDetails";
import BlogDetails from "./components/pages/BlogPage/BlogDetails";
import AdminDashboard from "./components/Dashboard/AdminDashboard/AdminDashboard";
import Dashboard from "./components/Dashboard/Dashboard";
import CourseList from "./components/Dashboard/CourseList/CourseList";
import CourseForm from "./components/Dashboard/CourseList/CourseForm/CourseForm";
import CategoryList from "./components/Dashboard/CategoryList/CategoryList";
import AddCategory from "./components/Dashboard/CategoryList/AddCategory/AddCategory";
import CertificateEditor from "./components/Dashboard/CertificateEditor/CertificateEditor";
import OrderHistory from "./components/Dashboard/OrderHistory/OrderHistory";
import PendingOrder from "./components/Dashboard/OrderHistory/PendingOrder/PendingOrder";
import WithdrawMethod from "./components/Dashboard/WithdrawMethod/WithdrawMethod";
import CreateMethod from "./components/Dashboard/WithdrawMethod/CreateMethod/CreateMethod";
import WithdrawList from "./components/Dashboard/WithdrawMethod/WithdrawList/WithdrawList";
import AllUser from "./components/Dashboard/ManageUsers/AllUser/AllUser";
import AllInstructor from "./components/Dashboard/ManageUsers/AllInstructor/AllInstructor";
import InstructorUpdate from "./components/Dashboard/ManageUsers/AllInstructor/InstructorUpdate";
import ActiveUser from "./components/Dashboard/ManageUsers/ActiveUser/ActiveUser";
import ActiveUpdate from "./components/Dashboard/ManageUsers/ActiveUser/ActiveUpdate";
import NonVarifiedUser from "./components/Dashboard/ManageUsers/NonVarifiedUser/NonVarifiedUser";
import BannedUser from "./components/Dashboard/ManageUsers/BannedUser/BannedUser";
import SendBulkMail from "./components/Dashboard/ManageUsers/SendBulkMail/SendBulkMail";
import BrandList from "./components/Dashboard/BrandList/BrandList";
import PostList from "./components/Dashboard/ManageBlog/PostList/PostList";
import CreatePost from "./components/Dashboard/ManageBlog/PostList/CreatePost";
import UpdatePost from "./components/Dashboard/ManageBlog/PostList/UpdatePost";
import PostComment from "./components/Dashboard/ManageBlog/PostComment/PostComment";
import CreateBrand from "./components/Dashboard/BrandList/CreateBrand";
import UpdateBrand from "./components/Dashboard/BrandList/UpdateBrand";
import InvoicePage from "./components/Dashboard/OrderHistory/InvoicePage/InvoicePage";
import UpdateMethod from "./components/Dashboard/WithdrawMethod/UpdateMethod/UpdateMethod";
import UpdateCourse from "./components/Dashboard/CourseList/UpdateCourse/UpdateCourse";
import Updatecategory from "./components/Dashboard/CategoryList/Updatecategory/Updatecategory";
import AuthProviders from "./Content/AuthProviders";
import CategoryCourses from "./components/pages/Home/CourseCategory/CategoryCourses";
import UserProfile from "./components/Dashboard/UserProfile/UserProfile";
import CouponCard from "./components/Dashboard/CouponCard/CouponCard";
import TermsAndCondition from "./components/pages/shared/Footer/TermsAndCondition";
import PrivacyPolicy from "./components/pages/shared/Footer/PrivacyPolicy";
import RefundPolicy from "./components/pages/shared/Footer/RefundPolicy";
import UpdateProfile from "./components/Dashboard/UserProfile/UpdateProfile";
import CouponCheckout from "./components/Dashboard/CouponCard/CuponCheckOut";
import PurchaseCourse from "./components/Dashboard/UserDashboard/Course/PurchaseCourse";
import UserHome from "./components/Dashboard/UserDashboard/UserHome";
import ModulePage from "./components/Dashboard/UserDashboard/ModulePage/ModulePage";
import Successpage from "./components/Dashboard/CouponCard/Successpage";
import ErrorPage from "./components/Dashboard/CouponCard/ErrorPage";
import AdminRouter from "./routes/AdminRouter";
import ReduxProvider from "./Content/ReduxProvider";
import ProtectedRouter from "./routes/ProtectedRouter";
import StudentDashboard from "./components/Dashboard/UserDashboard/StudentDashboard";
import OTPVerification from "./components/pages/OTPVerification/OTPVerification";
import StudentProfile from "./components/Dashboard/UserDashboard/StudentProfile/StudentProfile";
import StudentUpdateProfile from "./components/Dashboard/UserDashboard/StudentProfile/StudentUpdateProfile";
import InstrucorDetails from "./components/pages/InstructorPage/InstrucorDetails";
import ModuleUpload from "./components/Dashboard/ModuleUpload/ModuleUpload";
import CourseStudents from "./components/Dashboard/CourseList/CourseStudents/CourseStudents";
import FounderStory from "./components/pages/FounderStory/FounderStory";
import AddCourseOutline from "./components/AddCourseOutline";
import UpdateCourseForm from "./components/UpdateCourseForm";
import UpdateCategoryForm from "./components/UpdateCategoryForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/instructorProfile",
        element: <InstructorProfile></InstructorProfile>,
      },
      {
        path: "/courses",
        element: (
        
            <Courses />
       
        ),
      },

      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },

      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },

      {
        path: "/instructors",
        element: <InstructorPage></InstructorPage>,
      },


      {
        path:"/founder-story",
        element:<FounderStory></FounderStory>
      },

      {
        path: "/instructor/:email",
        element: <InstrucorDetails></InstrucorDetails>,
      },

      {
        path: "/blog",
        element: <BlogPage></BlogPage>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },

      {
        path: "/register",
        element: <Register></Register>,
      },

      {
        path: "/verify-OTP",
        element: <OTPVerification></OTPVerification>,
      },

      {
        path: "/coursedetails/:idOrSlug",
        element: <CourseDetails></CourseDetails>,
      },

      {
        path: "/blog/:id",
        element: <BlogDetails></BlogDetails>,
      },
      {
        path: "/courses/category/:id",
        element: <CategoryCourses></CategoryCourses>,
      },

      // footer er infos page
      {
        path: "/terms-and-conditions",
        element: <TermsAndCondition></TermsAndCondition>,
      },
      {
        path: "/privacy-and-policy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "/refund-and-policy",
        element: <RefundPolicy></RefundPolicy>,
      },

      // user checkout list page (Cupon)
      {
        path: "/checkout",
        element: <CouponCheckout></CouponCheckout>,
      },

      {
        path: "order/success",
        element: <Successpage></Successpage>,
      },

      {
        path: "order/fail",
        element: <ErrorPage></ErrorPage>,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <AdminRouter>
        <Dashboard></Dashboard>
      </AdminRouter>
    ),
    children: [
      // admin routes
      {
        path: "admin-home",
        element: <AdminDashboard></AdminDashboard>,
      },
      // manage courses related routes
      {
        path: "courses-list",
        element: <CourseList></CourseList>,
      },
      {
        path: "edit-course/:courseId",
        element: <UpdateCourseForm></UpdateCourseForm>,
      },
      {
        path:"course-students/:courseId",
        element:<CourseStudents></CourseStudents>
      },
      {
        path: "course-form",
        element: <CourseForm></CourseForm>,
      },
      {
        path: "update-course",
        element: <UpdateCourse></UpdateCourse>,
      },

      {
        path:"outline",
        element:<AddCourseOutline></AddCourseOutline>
      },

      // category
      {
        path: "categories",
        element: <CategoryList></CategoryList>,
      },
      {
        path: "add-category",
        element: <AddCategory></AddCategory>,
      },

      {
        path: "update-category/:id",
        element:<UpdateCategoryForm></UpdateCategoryForm>,
        // element: <Updatecategory></Updatecategory>,
      },

      // moduleupload

      // Manage Blog related routes
      {
        path: "post-list",
        element: <PostList></PostList>,
      },
      {
        path: "create-post",
        element: <CreatePost></CreatePost>,
      },

      {
        path: "post-update",
        element: <UpdatePost></UpdatePost>,
      },

      {
        path: "post-comment",
        element: <PostComment></PostComment>,
      },
      {
        path: "certificate",
        element: <CertificateEditor></CertificateEditor>,
      },
      {
        path: "orderhistory",
        element: <OrderHistory></OrderHistory>,
      },
      {
        path: "invoice",
        element: <InvoicePage></InvoicePage>,
      },
      {
        path: "pending-order",
        element: <PendingOrder></PendingOrder>,
      },
      // withdraw related routes
      {
        path: "withdraw-method",
        element: <WithdrawMethod></WithdrawMethod>,
      },
      {
        path: "withdraw-list",
        element: <WithdrawList></WithdrawList>,
      },
      {
        path: "create-method",
        element: <CreateMethod></CreateMethod>,
      },
      {
        path: "update-method",
        element: <UpdateMethod></UpdateMethod>,
      },
      // manage users er all student
      {
        path: "all-student",
        element: <AllUser></AllUser>,
      },
      {
        path: "all-instructor",
        element: <AllInstructor></AllInstructor>,
      },
      {
        path: "instructor-updated",
        element: <InstructorUpdate></InstructorUpdate>,
      },
      {
        path: "active-user",
        element: <ActiveUser></ActiveUser>,
      },
      {
        path: "active-update",
        element: <ActiveUpdate></ActiveUpdate>,
      },
      {
        path: "non-verified",
        element: <NonVarifiedUser></NonVarifiedUser>,
      },
      {
        path: "banned-users",
        element: <BannedUser></BannedUser>,
      },
      {
        path: "bulk-mail",
        element: <SendBulkMail></SendBulkMail>,
      },

      // Brand
      {
        path: "Brand-List",
        element: <BrandList></BrandList>,
      },
      {
        path: "create-brand",
        element: <CreateBrand></CreateBrand>,
      },
      {
        path: "update-brand/:id",
        element: <UpdateBrand></UpdateBrand>,
      },

      // user/instructor both profile
      {
        path: "profile",
        element: <UserProfile></UserProfile>,
      },

      {
        path: "update-profile",
        element: <UpdateProfile></UpdateProfile>,
      },

      {
        path: "cupon",
        element: <CouponCard></CouponCard>,
      },
      {
        path: "module-upload",
        element: <ModuleUpload></ModuleUpload>,
      },
    ],
  },

  {
    path: "student-dashboard",
    element: <StudentDashboard></StudentDashboard>,
    children: [
      // user/student related panel route.!!
      {
        path: "purchase-course",
        element: <PurchaseCourse></PurchaseCourse>,
      },

      {
        path: "user-home",
        element: <UserHome></UserHome>,
      },

      {
        path: "student-profile",
        element: <StudentProfile></StudentProfile>,
      },

      {
        path: "student-update-profile",
        element: <StudentUpdateProfile></StudentUpdateProfile>,
      },

      // student module access video
      {
        path: "module-page/:id",
        element: <ModulePage></ModulePage>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProviders>
      <ReduxProvider>
        <RouterProvider router={router} />
      </ReduxProvider>
    </AuthProviders>
  </React.StrictMode>
);
