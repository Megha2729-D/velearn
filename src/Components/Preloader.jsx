// Preloader.jsx
import { motion } from "framer-motion";

const Preloader = () => {
    return (
        <motion.div
            className="preloader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="loader">
                {/* Spinner */}
                <div className="spinner"></div>

                {/* Logo animation */}
                <motion.img
                    src="/assets/images/logo-icon.png"
                    alt="Logo"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1, 0.8] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>
        </motion.div>
    );
};

export default Preloader;
