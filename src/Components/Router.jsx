import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import ScrollToTop from "./ScrollToTop";

const PageTransitionWrapper = ({ children, pathname }) => {
    const isHome = pathname === "/";

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: isHome ? 0 : -80 }} // new page slides from top
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}                   // leaving page stays still
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

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
            </Routes>
        </AnimatePresence>
    );
};

const AppRouter = () => (
    <Router>
        <ScrollToTop />
        <div className="first_sec">
            <Navbar />
            <AnimatedRoutes />
            <Footer />
        </div>
    </Router>
);

export default AppRouter;
