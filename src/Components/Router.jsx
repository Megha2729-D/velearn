import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HomePage from "./HomePage"

const AppRouter = () => (
    <Router>
        <div className="first_sec">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </div>
    </Router>
);

export default AppRouter;
