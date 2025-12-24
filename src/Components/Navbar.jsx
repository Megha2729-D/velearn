import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const [active, setActive] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({
        selfPaced: false,
        liveCourses: false,
        practice: false,
        resources: false
    });
    const [subDropdownOpen, setSubDropdownOpen] = useState({});
    const navbarRef = useRef(null); // reference to navbar container

    const handleShowNavbar = () => setShowNavbar(!showNavbar);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 100) {
                setActive(true);
            } else {
                setActive(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    useEffect(() => {
        const body = document.body;
        const html = document.documentElement;

        if (showNavbar) {
            body.classList.add('nav-open');
            html.classList.add('nav-open');
        } else {
            body.classList.remove('nav-open');
            html.classList.remove('nav-open');

            setDropdownOpen({
                selfPaced: false,
                liveCourses: false,
                practice: false,
                resources: false
            });
            setSubDropdownOpen({});
        }

        return () => {
            body.classList.remove('nav-open');
            html.classList.remove('nav-open');
        };
    }, [showNavbar]);


    // // Close sub-dropdown when clicking outside
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (navbarRef.current && !navbarRef.current.contains(event.target)) {
    //             setSubDropdownOpen({});
    //         }
    //     };
    //     document.addEventListener('click', handleClickOutside);
    //     return () => document.removeEventListener('click', handleClickOutside);
    // }, []);

    const toggleDropdown = (key, e) => {
        e.stopPropagation();
        setDropdownOpen(prev => {
            const newState = {};
            for (let k in prev) {
                newState[k] = k === key ? !prev[k] : false;
            }
            return newState;
        });
        setSubDropdownOpen({}); // close all sub-dropdowns when top dropdown changes
    };

    const toggleSubDropdown = (key, e) => {
        e.stopPropagation();
        setSubDropdownOpen(prev => {
            const isOpen = prev[key];
            const newState = {};
            newState[key] = !isOpen; // only one open at a time
            return newState;
        });
    };

    const handleItemClick = () => {
        // close sub-dropdowns when clicking a link
        setSubDropdownOpen({});
    };

    return (
        <nav className="v-navbar flex-column w-100 bg-white" ref={navbarRef}>
            <div className="bg-c1 text-white py-1 d-flex align-items-center overflow-hidden">
                <div className="w-100">
                    <p className='mb-0 text-center py-1'> New batch offer live. Start your IT journey now.</p>
                </div>
            </div>
            <div className={`navbar_links ${active ? "active" : ""}`}>
                <div className='section_container'>
                    <div className="nav_parent py-1">

                        {/* Hamburger */}
                        <div className="menu-icon" onClick={handleShowNavbar}>
                            <Hamburger isOpen={showNavbar} />
                        </div>

                        {/* Logo */}
                        <NavLink to="/">
                            <div className="logo">
                                <div className="logo_img"></div>
                            </div>
                        </NavLink>

                        {/* Nav Links */}
                        <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
                            <ul className="mb-0 p-lg-0">

                                {/* Self-paced Courses */}
                                <li className={`dropdown ${dropdownOpen.selfPaced ? "open" : ""}`}
                                    onClick={(e) => toggleDropdown('selfPaced', e)}>
                                    <span className="dropdown-toggle">
                                        Self-paced Courses <i className="bi bi-chevron-down"></i>
                                    </span>
                                    <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                        <li className="sub-dropdown">
                                            <span className="sub-dropdown-toggle"
                                                onClick={(e) => toggleSubDropdown('group1', e)}>
                                                Menu Group 1 <i className="bi bi-chevron-right"></i>
                                            </span>
                                            <ul className={`sub-dropdown-menu ${subDropdownOpen.group1 ? 'open' : ''}`}>
                                                <li><NavLink to="/practice/ide" onClick={handleItemClick}>Online IDE</NavLink></li>
                                                <li><NavLink to="/practice/debugging" onClick={handleItemClick}>Debugging</NavLink></li>
                                            </ul>
                                        </li>
                                        <li className="sub-dropdown">
                                            <span className="sub-dropdown-toggle"
                                                onClick={(e) => toggleSubDropdown('group2', e)}>
                                                Menu Group 2 <i className="bi bi-chevron-right"></i>
                                            </span>
                                            <ul className={`sub-dropdown-menu ${subDropdownOpen.group2 ? 'open' : ''}`}>
                                                <li><NavLink to="/practice/challenges" onClick={handleItemClick}>Challenges</NavLink></li>
                                                <li><NavLink to="/practice/projects" onClick={handleItemClick}>Projects</NavLink></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>

                                {/* Live Courses */}
                                <li className={`dropdown ${dropdownOpen.liveCourses ? "open" : ""}`}
                                    onClick={(e) => toggleDropdown('liveCourses', e)}>
                                    <span className="dropdown-toggle">
                                        Live Courses <i className="bi bi-chevron-down"></i>
                                    </span>
                                    <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                        <li><NavLink to="/" onClick={handleItemClick}>UI UX Design</NavLink></li>
                                        <li><NavLink to="/" onClick={handleItemClick}>Data Science</NavLink></li>
                                        <li><NavLink to="/" onClick={handleItemClick}>Full Stack Web Development</NavLink></li>
                                        <li><NavLink to="/" onClick={handleItemClick}>Python Full Stack</NavLink></li>
                                    </ul>
                                </li>

                                {/* Practice */}
                                <li className={`dropdown ${dropdownOpen.practice ? "open" : ""}`}
                                    onClick={(e) => toggleDropdown('practice', e)}>
                                    <span className="dropdown-toggle">
                                        Practice <i className="bi bi-chevron-down"></i>
                                    </span>
                                    <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                        <li><NavLink to="/practice/ide" onClick={handleItemClick}>Online IDE</NavLink></li>
                                        <li><NavLink to="/practice/debugging" onClick={handleItemClick}>Debugging</NavLink></li>
                                        <li><NavLink to="/practice/challenges" onClick={handleItemClick}>Challenges</NavLink></li>
                                    </ul>
                                </li>

                                {/* Resources */}
                                <li className={`dropdown ${dropdownOpen.resources ? "open" : ""}`}
                                    onClick={(e) => toggleDropdown('resources', e)}>
                                    <span className="dropdown-toggle">
                                        Resources <i className="bi bi-chevron-down"></i>
                                    </span>
                                    <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                        <li><NavLink to="/resources/blogs" onClick={handleItemClick}>Blogs</NavLink></li>
                                        <li><NavLink to="/resources/docs" onClick={handleItemClick}>Docs</NavLink></li>
                                        <li><NavLink to="/resources/tools" onClick={handleItemClick}>Tools</NavLink></li>
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
                                <div className='pe-3 d-flex align-items-center'>
                                    <i className="bi bi-search"></i>
                                </div>
                                <span>
                                    <Link to="/login" className="btn_login">Login</Link>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    );
};

const Hamburger = ({ isOpen }) => (
    <>
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="24" viewBox="0 0 52 24" className={isOpen ? "d-none" : "d-block"}>
            <g transform="translate(-294 -47)">
                <rect width="30" height="2" rx="2" transform="translate(304 47)" fill="#574c4c" />
                <rect width="40" height="2" rx="2" transform="translate(294 57)" fill="#574c4c" />
                <rect width="30" height="2" rx="2" transform="translate(304 67)" fill="#574c4c" />
            </g>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={isOpen ? "d-block" : "d-none"}>
            <line x1="0" y1="0" x2="24" y2="24" stroke="#574c4c" strokeWidth="2" />
            <line x1="24" y1="0" x2="0" y2="24" stroke="#574c4c" strokeWidth="2" />
        </svg>
    </>
);

export default Navbar;
