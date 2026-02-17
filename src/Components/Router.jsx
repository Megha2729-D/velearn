import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import ScrollToTop from "./ScrollToTop";
import Preloader from "./Preloader";

import RecordedCourse from "./RecordedCourse";
import LiveCourses from "./LiveCourses";

import FullStackDevelopment from "./FullStackDevelopment";
import UIUX from "./UIUX";
import DigitalMarketing from "./DigitalMarketing";
import DataScience from "./DataScience";

// import CourseDetails from "./CourseDetails";
import MyCourses from "./MyCourses";

import Debugging from "./Debugging";
import LiveEditor from "./LiveEditor";
import IDEEditor from "./IDEEditor";

import RecordedCourseDetails from "./RecordedCourseDetails";
import Blog from "./Blog";
import Webinar from "./Webinar";
import ContactUs from "./ContactUs";
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
                <Route path="/course-details/:id" element={
                    <PageTransitionWrapper pathname={location.pathname}>
                        <RecordedCourseDetails />
                    </PageTransitionWrapper>
                } />
                <Route
                    path="/my-courses"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <MyCourses />
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
                    path="/webinar"
                    element={
                        <PageTransitionWrapper pathname={location.pathname}>
                            <Webinar />
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
            </Routes>
        </AnimatePresence>
    );
};

/* ---------- App Router with Preloader ---------- */
const AppRouter = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setLoading(false);
        };

        // If page already loaded (fast reload / cache)
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    return (
        <Router>
            <ScrollToTop />

            <AnimatePresence mode="wait">
                {loading ? (
                    <Preloader />
                ) : (
                    <motion.div
                        className="first_sec"
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
        </Router>
    );
};

export default AppRouter;
