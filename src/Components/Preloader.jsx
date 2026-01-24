import { motion } from "framer-motion";

const BASE_API_URL = "https://www.iqvideoproduction.com/api/";
const BASE_IMAGE_URL = "https://www.iqvideoproduction.com/assets/images/";

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

                {/* Logo (CSS background image) */}
                <div className="logo-bg">
                    <motion.div

                        initial={{ scale: 0.8 }}
                        animate={{ scale: [0.8, 1, 0.8] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div>
                            <img src={`${BASE_IMAGE_URL}logo-icon.png`} alt="" />
                        </div>
                    </motion.div>
                </div>

            </div>
        </motion.div>
    );
};

export default Preloader;
