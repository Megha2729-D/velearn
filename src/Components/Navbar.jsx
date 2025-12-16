import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const [active, setActive] = useState(false);
    const [practiceOpen, setPracticeOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    useEffect(() => {
        const handleScroll = () => {
            setActive(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (showNavbar) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            setPracticeOpen(false);
            setResourcesOpen(false);
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [showNavbar]);
    const togglePractice = () => {
        setPracticeOpen(prev => {
            if (!prev) setResourcesOpen(false); // close other
            return !prev;
        });
    };

    const toggleResources = () => {
        setResourcesOpen(prev => {
            if (!prev) setPracticeOpen(false); // close other
            return !prev;
        });
    };

    return (
        <nav className="v-navbar flex-column w-100 bg-white">
            <div className={`navbar_links section_container ${active ? "active" : ""}`}>
                <div className="nav_parent py-1">

                    {/* Hamburger */}
                    <div className="menu-icon" onClick={handleShowNavbar}>
                        <Hamburger isOpen={showNavbar} />
                    </div>

                    {/* Logo */}
                    <div className="logo">
                        <NavLink to="/">
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/images/velearn-logo.png`}
                                alt="Velearn"
                            />
                        </NavLink>
                    </div>

                    {/* Nav Links */}
                    <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
                        <ul className="mb-0 p-lg-0">

                            <li>
                                <NavLink to="/">Self-paced Courses</NavLink>
                            </li>

                            <li>
                                <NavLink to="/sample">Live Courses</NavLink>
                            </li>

                            {/* Practice Dropdown */}
                            <li
                                className={`dropdown ${practiceOpen ? "open" : ""}`}
                                onClick={togglePractice}
                            >
                                <span className="dropdown-toggle">
                                    Practice <i className="bi bi-chevron-down"></i>
                                </span>

                                <ul className="dropdown-menu">
                                    <li><NavLink to="/practice/ide">Online IDE</NavLink></li>
                                    <li><NavLink to="/practice/debugging">Debugging</NavLink></li>
                                    <li><NavLink to="/practice/challenges">Challenges</NavLink></li>
                                </ul>
                            </li>

                            {/* Resources Dropdown */}
                            <li
                                className={`dropdown ${resourcesOpen ? "open" : ""}`}
                                onClick={toggleResources}
                            >
                                <span className="dropdown-toggle">
                                    Resources <i className="bi bi-chevron-down"></i>
                                </span>

                                <ul className="dropdown-menu">
                                    <li><NavLink to="/resources/blogs">Blogs</NavLink></li>
                                    <li><NavLink to="/resources/docs">Docs</NavLink></li>
                                    <li><NavLink to="/resources/tools">Tools</NavLink></li>
                                </ul>
                            </li>

                        </ul>
                    </div>

                    {/* Right Section */}
                    <div className="d-flex gap-4 right_nav_icons">

                        <div className="d-lg-flex d-none align-items-center">
                            <div className="search_parent position-relative">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-search"></i>
                                    <input type="search" placeholder="Search" />
                                </div>
                            </div>
                        </div>

                        <div className="d-lg-flex d-none gap-2 text-white">
                            <span className="d-none d-lg-block">
                                <Link to="/login" className="btn_login">Login</Link>
                            </span>
                            <span className="d-none d-lg-block">|</span>
                            <span>
                                <Link to="/signup" className="btn_signup">Sign Up</Link>
                            </span>
                        </div>
                        <div className='d-flex d-lg-none nav_mbl_icons'>
                            <div className='pe-3'>
                                <i className="bi bi-search"></i>
                            </div>
                            <span className="">
                                <Link to="/login" className="btn_login">Login</Link>
                            </span>
                            {/* <div className='px-2'>
                                <i class="bi bi-door-open"></i>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const Hamburger = ({ isOpen }) => {
    return (
        <>
            {/* Hamburger icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="24"
                viewBox="0 0 52 24"
                className={isOpen ? "d-none" : "d-block"}
            >
                <g transform="translate(-294 -47)">
                    <rect width="30" height="2" rx="2" transform="translate(304 47)" fill="#574c4c" />
                    <rect width="40" height="2" rx="2" transform="translate(294 57)" fill="#574c4c" />
                    <rect width="30" height="2" rx="2" transform="translate(304 67)" fill="#574c4c" />
                </g>
            </svg>

            {/* Close icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className={isOpen ? "d-block" : "d-none"}
            >
                <line x1="0" y1="0" x2="24" y2="24" stroke="#574c4c" strokeWidth="2" />
                <line x1="24" y1="0" x2="0" y2="24" stroke="#574c4c" strokeWidth="2" />
            </svg>
        </>
    );
};

export default Navbar;
