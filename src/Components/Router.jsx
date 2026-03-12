import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import ProtectedRoute from "./ProtectedRoute";

import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ScrollToTop from "./ScrollToTop";
import Preloader from "./Preloader";

import RecordedCourse from "./Pages/RecordedCourse/RecordedCourse";
import RecordedCourseDetails from "./Pages/RecordedCourse/RecordedCourseDetails";

import LiveCourses from "./Pages/LiveCourse/LiveCourses";
import LiveCourseHistory from "./Pages/LiveCourse/LiveCourseHistory";

import FullStackDevelopment from "./Pages/LiveCourse/FullStackDevelopment";
import UIUX from "./Pages/LiveCourse/UIUX";
import DigitalMarketing from "./Pages/LiveCourse/DigitalMarketing";
import DataScience from "./Pages/LiveCourse/DataScience";

// import CourseDetails from "./CourseDetails";
import MyCourses from "./Pages/MyCourses";
import ChangePassword from "./Pages/ChangePassword";
import LearnWrapper from "./Pages/LearnCourse";
import Profile from "./Pages/Profile";

import Debugging from "./Pages/Debugging";
import DebuggingWorkspace from "./Pages/DebuggingWorkspace";
import LiveEditor from "./Pages/LiveEditor";
import IDEEditor from "./Pages/IDEEditor";

import Blog from "./Pages/Blog";
import BlogDetails from "./Pages/BlogDetails";
import Webinar from "./Pages/Webinar";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import FAQ from "./Pages/FAQ";
import HelpCenter from "./Pages/HelpCenter";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

import RefundPolicy from "./Pages/Policies/RefundPolicy";
import PrivacyPolicy from "./Pages/Policies/PrivacyPolicy";
import TermsAndConditions from "./Pages/Policies/TermsAndConditions";

/* ---------- Page Transition Wrapper ---------- */
const PageTransitionWrapper = ({ children, pathname }) => {
    const isHome = pathname === "/";

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: isHome ? 0 : -80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

/* ---------- Animated Routes ---------- */
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <HomePage />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <LoginPage />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <SignUpPage />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/recorded-course"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <RecordedCourse />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/live-course"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <LiveCourses />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/live-course-history"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <ProtectedRoute>
                                <LiveCourseHistory />
                            </ProtectedRoute>
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/live-course/full-stack-development"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <FullStackDevelopment />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/live-course/ui-ux-design"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <UIUX />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/live-course/digital-marketing"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <DigitalMarketing />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/live-course/data-science"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <DataScience />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/course-details/:slugId"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <RecordedCourseDetails />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/my-courses"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <ProtectedRoute>
                                <MyCourses />
                            </ProtectedRoute>
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/change-password"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <ProtectedRoute>
                                <ChangePassword />
                            </ProtectedRoute>
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/learn/:slug"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <ProtectedRoute>
                                <LearnWrapper />
                            </ProtectedRoute>
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        </PageTransitionWrapper>
                    }
                />

                <Route
                    path="/debugging"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <Debugging />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/debugging-workspace"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <DebuggingWorkspace />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/live-editor"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <LiveEditor />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/ide"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <IDEEditor />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/blogs"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <Blog />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/blog-details/:id"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <BlogDetails />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/webinar"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <Webinar />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/about-us"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <AboutUs />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/contact-us"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <ContactUs />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/faq"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <FAQ />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/help-center"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <HelpCenter />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <ForgotPassword />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <ResetPassword />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/refund-policy"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <RefundPolicy />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/privacy-policy"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <PrivacyPolicy />
                        </PageTransitionWrapper>
                    }
                />
                <Route
                    path="/terms-and-conditions"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <TermsAndConditions />
                        </PageTransitionWrapper>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

/* ---------- App Router with Preloader ---------- */
const AppRouter = () => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const handleLoad = () => setLoading(false);

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    const isPageTwo =
        location.pathname === "/live-course/data-science";

    return (
        <>
            <ScrollToTop />

            <AnimatePresence mode="wait">
                {loading ? (
                    <Preloader />
                ) : (
                    <motion.div
                        className={`first_sec ${isPageTwo ? 'inner_page_ds' : ''}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Navbar />
                        <AnimatedRoutes />
                        <Footer />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AppRouter;
