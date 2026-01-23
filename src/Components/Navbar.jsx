import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const BASE_API_URL = "http://www.iqvideoproduction.com/api/";
const BASE_IMAGE_URL = "http://www.iqvideoproduction.com/assets/images/";

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [subDropdownOpen, setSubDropdownOpen] = useState({});
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    /* ------------------ GET USER ------------------ */
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    /* ------------------ LOGOUT ------------------ */
    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setDropdownOpen(false);
        navigate("/login");
    };

    /* ------------------ CLOSE ON OUTSIDE CLICK ------------------ */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    /* -------------------- SCROLL SHADOW ONLY -------------------- */
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* -------------------- BODY SCROLL LOCK (SAFE) -------------------- */
    useEffect(() => {
        document.body.classList.toggle('menu-open', showNavbar);
        return () => document.body.classList.remove('menu-open');
    }, [showNavbar]);

    /* -------------------- DROPDOWNS -------------------- */
    const toggleDropdown = (key, e) => {
        e.stopPropagation();
        setDropdownOpen(prev => {
            const next = {};
            Object.keys(prev).forEach(k => (next[k] = false));
            next[key] = !prev[key];
            return next;
        });
        setSubDropdownOpen({});
    };

    const toggleSubDropdown = (key, e) => {
        e.stopPropagation();
        setSubDropdownOpen(prev => ({
            [key]: !prev[key]
        }));
    };

    const handleItemClick = () => {
        setShowNavbar(false);
        setDropdownOpen({});
        setSubDropdownOpen({});
    };


    const closeMenu = () => {
        setShowNavbar(false);
        setDropdownOpen({});
        setSubDropdownOpen({});
    };

    return (
        <nav className={`v-navbar ${scrolled ? 'scrolled' : ''}`}>
            {/* TOP BANNER */}
            <div className="top-banner">
                <p className='mb-0 py-1'>New batch offer live. Start your IT journey now.</p>
            </div>

            {/* MAIN NAV */}
            <div className={`navbar_links ${scrolled ? 'is-fixed' : ''}`}>
                <div className="section_container">
                    <div className="nav_parent">

                        {/* HAMBURGER */}
                        <div className="menu-icon" onClick={() => setShowNavbar(!showNavbar)}>
                            <Hamburger isOpen={showNavbar} />
                        </div>

                        {/* LOGO */}
                        <NavLink to="/">
                            <div className="logo">
                                <img src={`${BASE_IMAGE_URL}velearn-logo.png`} alt="" />
                            </div>
                        </NavLink>

                        {/* NAV LINKS */}
                        <div className={`nav-elements ${showNavbar ? 'active' : ''}`}>
                            <ul className="mb-0 p-lg-0">

                                {/* SELF-PACED */}
                                <li
                                    className={`dropdown ${dropdownOpen.selfPaced ? 'open' : ''}`}
                                    onClick={(e) => toggleDropdown('selfPaced', e)}
                                >
                                    <span className="dropdown-toggle">
                                        Self-paced Courses <i className="bi bi-chevron-down"></i>
                                    </span>

                                    <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}>

                                        {/* GROUP 1 */}
                                        <li className="sub-dropdown">
                                            <span
                                                className="sub-dropdown-toggle"
                                                onClick={(e) => toggleSubDropdown('group1', e)}
                                            >
                                                Menu Group 1 <i className="bi bi-chevron-right"></i>
                                            </span>

                                            <ul className={`sub-dropdown-menu ${subDropdownOpen.group1 ? 'open' : ''}`}>
                                                <li>
                                                    <NavLink to="/practice/ide" onClick={handleItemClick}>
                                                        Online IDE
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/practice/debugging" onClick={handleItemClick}>
                                                        Debugging
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </li>

                                        {/* GROUP 2 */}
                                        <li className="sub-dropdown">
                                            <span
                                                className="sub-dropdown-toggle"
                                                onClick={(e) => toggleSubDropdown('group2', e)}
                                            >
                                                Menu Group 2 <i className="bi bi-chevron-right"></i>
                                            </span>

                                            <ul className={`sub-dropdown-menu ${subDropdownOpen.group2 ? 'open' : ''}`}>
                                                <li>
                                                    <NavLink to="/practice/challenges" onClick={handleItemClick}>
                                                        Challenges
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/practice/projects" onClick={handleItemClick}>
                                                        Projects
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </li>

                                    </ul>
                                </li>

                                {/* LIVE COURSES */}
                                <li
                                    className={`dropdown ${dropdownOpen.liveCourses ? 'open' : ''}`}
                                    onClick={(e) => toggleDropdown('liveCourses', e)}
                                >
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

                                {/* PRACTICE */}
                                <li
                                    className={`dropdown ${dropdownOpen.practice ? 'open' : ''}`}
                                    onClick={(e) => toggleDropdown('practice', e)}
                                >
                                    <span className="dropdown-toggle">
                                        Practice <i className="bi bi-chevron-down"></i>
                                    </span>

                                    <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                        <li><NavLink to="/practice/ide" onClick={handleItemClick}>Online IDE</NavLink></li>
                                        <li><NavLink to="/practice/debugging" onClick={handleItemClick}>Debugging</NavLink></li>
                                        <li><NavLink to="/practice/challenges" onClick={handleItemClick}>Challenges</NavLink></li>
                                    </ul>
                                </li>

                                {/* RESOURCES */}
                                <li
                                    className={`dropdown ${dropdownOpen.resources ? 'open' : ''}`}
                                    onClick={(e) => toggleDropdown('resources', e)}
                                >
                                    <span className="dropdown-toggle">
                                        Resources <i className="bi bi-chevron-down"></i>
                                    </span>

                                    <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                        <li><NavLink to="/" onClick={handleItemClick}>Success stories</NavLink></li>
                                        <li><NavLink to="/" onClick={handleItemClick}>Webinars</NavLink></li>
                                        <li><NavLink to="/" onClick={handleItemClick}>E-books</NavLink></li>
                                        <li><NavLink to="/" onClick={handleItemClick}>News letters</NavLink></li>
                                        <li><NavLink to="/" onClick={handleItemClick}>Referral</NavLink></li>
                                        <li><NavLink to="/" onClick={handleItemClick}>Blog</NavLink></li>
                                        <li><NavLink to="/" onClick={handleItemClick}>Become an affiliate</NavLink></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        {/* RIGHT */}
                        <div className="d-flex right_nav_icons">

                            {/* DESKTOP SEARCH */}
                            <div className="d-lg-flex d-none align-items-center me-3">
                                <div className="search_parent position-relative">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-search"></i>
                                        <input
                                            type="search"
                                            placeholder="Search"
                                            className="nav_search_input"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex d-lg-none align-items-center me-3">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-search text-black d-flex align-items-center"></i>
                                </div>
                            </div>
                            {/* DESKTOP */}
                            <div className="d-flex align-items-center gap-2">

                                {!user ? (
                                    <>
                                        <Link to="/login" className="btn_login">Login</Link>
                                        <Link to="/signup" className="btn_signup d-lg-flex d-none">Sign Up</Link>
                                    </>
                                ) : (
                                    <div className="user-dropdown position-relative" ref={dropdownRef}>

                                        {/* AVATAR ICON */}
                                        <div
                                            className={`avatar-icon ${dropdownOpen ? "active" : ""}`}
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                        >
                                            <img
                                                src={`${BASE_IMAGE_URL}icons/user.png`}
                                                alt="User"
                                            />
                                        </div>
                                        {/* <div
                                            className="avatar-icon letter-avatar"
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                        >
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div> */}
                                        {/* DROPDOWN */}
                                        {dropdownOpen && (
                                            <div className="dropdown-menu-custom">

                                                {/* USER INFO */}
                                                <div className="user-info">
                                                    <strong>{user.name}</strong>
                                                    <small>{user.email}</small>
                                                </div>

                                                <ul>
                                                    <li>
                                                        <Link to="/profile" onClick={() => setDropdownOpen(false)}>My Profile</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/my-courses" onClick={() => setDropdownOpen(false)}>My Courses</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/change-password" onClick={() => setDropdownOpen(false)}>Change Password</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/faq" onClick={() => setDropdownOpen(false)}>FAQ</Link>
                                                    </li>
                                                    <li className="logout" onClick={handleLogout}>
                                                        Sign Out
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* MOBILE */}
                            {/* <div className="d-flex d-lg-none align-items-center">
                                {!user ? (
                                    <Link to="/login" className="btn_login">Login</Link>
                                ) : (
                                    <div className="user-dropdown position-relative" ref={dropdownRef}>
                                        <div
                                            className={`avatar-icon ${dropdownOpen ? "active" : ""}`}
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                        >
                                            <img
                                                src={`${BASE_IMAGE_URL}/assets/images/icons/user.png`}
                                                alt="User"
                                            />
                                        </div>
                                        {dropdownOpen && (
                                            <div className="dropdown-menu-custom">

                                                <div className="user-info">
                                                    <strong>{user.name}</strong>
                                                    <small>{user.email}</small>
                                                </div>

                                                <ul>
                                                    <li>
                                                        <Link to="/profile">My Profile</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/my-courses">My Courses</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/change-password">Change Password</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/faq">FAQ</Link>
                                                    </li>
                                                    <li className="logout" onClick={handleLogout}>
                                                        Sign Out
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

/* -------------------- HAMBURGER -------------------- */
const Hamburger = ({ isOpen }) => (
    <div className={`hamburger ${isOpen ? 'open' : ''}`}>
        <span />
        <span />
        <span />
    </div>
);

export default Navbar;
