import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = `https://brainiacchessacademy.com/assets/images/`;
const BASE_DYNAMIC_IMAGE_URL = "https://velearn.in/public/uploads/";

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({});
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [subDropdownOpen, setSubDropdownOpen] = useState({});
    const [user, setUser] = useState(null);
    const [paidCourses, setPaidCourses] = useState([]);
    const [freeCourses, setFreeCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);

    const LIVE_COURSE_ROUTES = {
        "Full Stack Web Development": "/live-course/full-stack-development",
        "UI UX Design": "/live-course/ui-ux-design",
        "Digital Marketing": "/live-course/digital-marketing",
        "Data Science": "/live-course/data-science"
    };
    /* ------------------ GET USER ------------------ */
    useEffect(() => {
        const loadUser = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);

                // Fetch enrolled courses
                axios.get(`${BASE_API_URL}my-courses/${parsedUser.id}`)
                    .then(res => {
                        if (res.data.status) {
                            setEnrolledCourses(res.data.data.all || []);
                        }
                    })
                    .catch(err => console.log("Enrollment fetch error", err));
            } else {
                setUser(null);
                setEnrolledCourses([]);
            }
        };

        loadUser();

        // Listen for localStorage changes (for same-tab updates)
        window.addEventListener('storage-update', loadUser);
        window.addEventListener('storage', loadUser);

        return () => {
            window.removeEventListener('storage-update', loadUser);
            window.removeEventListener('storage', loadUser);
        };
    }, []);

    const getProfileImage = () => {
        if (!user?.image) return `${BASE_IMAGE_URL}icons/user.png`;

        // If it's already a full URL (starts with http)
        if (user.image.startsWith('http')) return user.image;

        // Clean up the image string to get just the filename
        const imageName = user.image.split('/').pop();

        return `https://velearn.in/public/uploads/students/${imageName}`;
    };

    /* ------------------ FETCH COURSES ------------------ */
    useEffect(() => {
        axios.get(`${BASE_API_URL}recorded-course`)
            .then(res => {
                if (res.data.status) {
                    const courses = res.data.data;
                    setPaidCourses(courses.filter(c => parseFloat(c.buy_price) > 0).slice(0, 5));
                    setFreeCourses(courses.filter(c => parseFloat(c.buy_price) === 0).slice(0, 5));
                }
            })
            .catch(err => console.log("Course fetch error", err));
    }, []);

    /* ------------------ LOGOUT ------------------ */
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setUserDropdownOpen(false);
        navigate("/login");
    };

    /* ------------------ CLICK OUTSIDE ------------------ */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setUserDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* ------------------ SCROLL SHADOW ------------------ */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ------------------ BODY SCROLL LOCK ------------------ */
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
        setSubDropdownOpen(prev => ({ [key]: !prev[key] }));
    };

    const handleItemClick = () => {
        setShowNavbar(false);
        setDropdownOpen({});
        setSubDropdownOpen({});
    };

    /* -------------------- SEARCH -------------------- */
    const normalize = str => str.toLowerCase().replace(/\s+/g, '');

    const handleSearch = async (value) => {
        setSearchQuery(value);

        if (value.trim() === "") {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        try {
            // Fetch recorded courses only
            const recordedRes = await axios.get(`${BASE_API_URL}recorded-course`);
            let recordedCourses = recordedRes.data?.data || [];

            // Map recorded courses
            const recorded = recordedCourses.map(c => ({
                id: c.id,
                title: c.title,
                slug: c.slug,
                type: "recorded"
            }));

            // Map static live courses from LIVE_COURSE_ROUTES
            const live = Object.keys(LIVE_COURSE_ROUTES).map(key => ({
                id: key,
                title: key.replace(/([a-z])([A-Z])/g, '$1 $2'), // convert camelCase to words
                type: "live",
                route: LIVE_COURSE_ROUTES[key]
            }));

            // Merge
            const allCourses = [...recorded, ...live];

            // Filter based on search input
            const filtered = allCourses.filter(course =>
                normalize(course.title).includes(normalize(value))
            );

            console.log("All courses titles:", allCourses.map(c => c.title));
            console.log("Filtered results:", filtered.map(c => c.title));

            setSearchResults(filtered.slice(0, 8));
            setShowResults(true);

        } catch (error) {
            console.log("Search error", error);
        }
    };
    const handleUserMenuClick = () => {
        setUserDropdownOpen(false);
    };
    const isNavbarTwo =
        location.pathname === "/live-course/digital-marketing" ||
        location.pathname === "/live-course/data-science";

    return (
        <nav className={`v-navbar ${scrolled ? 'scrolled' : ''} ${isNavbarTwo ? 'navbar_two' : ''}`}>
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
                                <img
                                    src={isNavbarTwo ? `${BASE_IMAGE_URL}logo-white.png` : `${BASE_IMAGE_URL}velearn-logo.png`}
                                    alt="Velearn Logo"
                                />
                            </div>
                        </NavLink>

                        {/* NAV LINKS */}
                        <div className={`nav-elements ${showNavbar ? 'active' : ''}`}>
                            <ul className="mb-0 p-lg-0">
                                {/* SELF-PACED */}
                                <li className={`dropdown ${dropdownOpen.selfPaced ? 'open' : ''}`} onClick={(e) => toggleDropdown('selfPaced', e)}>
                                    <span className="dropdown-toggle">
                                        Self-paced Courses <i className="bi bi-chevron-down"></i>
                                    </span>
                                    <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                        {/* Paid Courses */}
                                        <li className="sub-dropdown">
                                            <span className="sub-dropdown-toggle" onClick={(e) => toggleSubDropdown('group1', e)}>
                                                Paid Courses <i className="bi bi-chevron-right"></i>
                                            </span>
                                            <ul className={`sub-dropdown-menu ${subDropdownOpen.group1 ? 'open' : ''}`}>
                                                {paidCourses.map(course => {
                                                    const isEnrolled = enrolledCourses.some(c => c.id === course.id);
                                                    return (
                                                        <li key={course.id}>
                                                            <NavLink
                                                                to={isEnrolled ? `/learn/${course.slug}` : `/course-details/${course.slug}`}
                                                                state={{ courseId: course.id, courseType: course.course_type }}
                                                                onClick={handleItemClick}
                                                            >
                                                                {course.title}
                                                            </NavLink>
                                                        </li>
                                                    );
                                                })}
                                                <li>
                                                    <NavLink to="/recorded-course" onClick={handleItemClick}>All Courses</NavLink>
                                                </li>
                                            </ul>
                                        </li>

                                        {/* Free Courses */}
                                        <li className="sub-dropdown">
                                            <span className="sub-dropdown-toggle" onClick={(e) => toggleSubDropdown('group2', e)}>
                                                Free Courses <i className="bi bi-chevron-right"></i>
                                            </span>
                                            <ul className={`sub-dropdown-menu ${subDropdownOpen.group2 ? 'open' : ''}`}>
                                                {freeCourses.map(course => {
                                                    const isEnrolled = enrolledCourses.some(c => c.id === course.id);
                                                    return (
                                                        <li key={course.id}>
                                                            <NavLink
                                                                to={isEnrolled ? `/learn/${course.slug}` : `/course-details/${course.slug}`}
                                                                state={{ courseId: course.id, courseType: course.course_type }}
                                                                onClick={handleItemClick}
                                                            >
                                                                {course.title}
                                                            </NavLink>
                                                        </li>
                                                    );
                                                })}
                                                <li>
                                                    <NavLink to="/recorded-course" onClick={handleItemClick}>All Courses</NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>

                                {/* LIVE COURSES */}
                                <li className={`dropdown ${dropdownOpen.liveCourses ? 'open' : ''}`} onClick={(e) => toggleDropdown('liveCourses', e)}>
                                    <span className="dropdown-toggle">
                                        Live Courses <i className="bi bi-chevron-down"></i>
                                    </span>
                                    <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                        {Object.entries(LIVE_COURSE_ROUTES).map(([title, route]) => (
                                            <li key={title}>
                                                <NavLink to={route} onClick={handleItemClick}>{title}</NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                                {/* PRACTICE */}
                                <li className={`dropdown ${dropdownOpen.practice ? 'open' : ''}`} onClick={(e) => toggleDropdown('practice', e)}>
                                    <span className="dropdown-toggle">Practice <i className="bi bi-chevron-down"></i></span>
                                    <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                        <li><NavLink to="/ide" onClick={handleItemClick}>Online IDE</NavLink></li>
                                        <li><NavLink to="/debugging" onClick={handleItemClick}>Debugging</NavLink></li>
                                        <li><NavLink to="/practice/challenges" onClick={handleItemClick}>Challenges</NavLink></li>
                                    </ul>
                                </li>

                                {/* RESOURCES */}
                                <li className={`dropdown ${dropdownOpen.resources ? 'open' : ''}`} onClick={(e) => toggleDropdown('resources', e)}>
                                    <span className="dropdown-toggle">Resources <i className="bi bi-chevron-down"></i></span>
                                    <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                        <li><NavLink to="/webinar" onClick={handleItemClick}>Webinars</NavLink></li>
                                        <li><NavLink to="/" onClick={handleItemClick}>Referral</NavLink></li>
                                        <li><NavLink to="/blogs" onClick={handleItemClick}>Blog</NavLink></li>
                                        <li><NavLink to="/faq" onClick={handleItemClick}>FAQ</NavLink></li>
                                        <li><NavLink to="/" onClick={handleItemClick}>Become an affiliate</NavLink></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        {/* RIGHT */}
                        <div className="d-flex right_nav_icons">
                            {/* DESKTOP SEARCH */}
                            <div className="d-lg-flex d-none align-items-center me-3" ref={searchRef}>
                                <div className="search_parent position-relative">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-search"></i>
                                        <input
                                            type="search"
                                            placeholder="Search for course..."
                                            className="nav_search_input"
                                            value={searchQuery}
                                            onChange={(e) => handleSearch(e.target.value)}
                                            onFocus={() => searchResults.length && setShowResults(true)}
                                        />
                                    </div>

                                    {showResults && (
                                        <div className="position-relative">
                                            <div className="blog_search_results_box">
                                                {searchResults.length > 0 ? searchResults.map(item => {
                                                    const isEnrolled = item.type === "recorded" && enrolledCourses.some(c => c.id === item.id);
                                                    return (
                                                        <Link
                                                            key={item.id}
                                                            to={item.type === "recorded" ? (isEnrolled ? `/learn/${item.slug}` : `/course-details/${item.slug}`) : item.route}
                                                            state={item.type === "recorded" ? { courseId: item.id, courseType: item.course_type || "recorded" } : null}
                                                            className="blog_search_result_item"
                                                            onClick={() => setShowResults(false)}
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    );
                                                }) : (
                                                    <div className="blog_search_result_item">No courses found</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* USER */}
                            <div className="d-flex align-items-center gap-2">
                                {!user ? (
                                    <>
                                        <Link to="/login" className="btn_login">Login</Link>
                                        <Link to="/signup" className="btn_signup d-lg-flex d-none">Sign Up</Link>
                                    </>
                                ) : (
                                    <div className="user-dropdown position-relative" ref={dropdownRef}>
                                        <div className={`avatar-icon ${userDropdownOpen ? "active" : ""}`} onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
                                            <img src={getProfileImage()} alt="User" />
                                        </div>
                                        {userDropdownOpen && (
                                            <div className="dropdown-menu-custom">
                                                <div className="user-info">
                                                    <strong>{user.name}</strong>
                                                    <small>{user.email}</small>
                                                </div>
                                                <ul>
                                                    <li><Link to="/profile" onClick={() => handleUserMenuClick(false)}>My Profile</Link></li>
                                                    <li><Link to="/my-courses" onClick={() => handleUserMenuClick(false)}>My Courses</Link></li>
                                                    <li><Link to="/live-course-history" onClick={() => handleUserMenuClick(false)}>Live Course History</Link></li>
                                                    <li><Link to="/change-password" onClick={() => handleUserMenuClick(false)}>Change Password</Link></li>
                                                    <li><Link to="/faq" onClick={() => handleUserMenuClick(false)}>FAQ</Link></li>
                                                    <li className="logout" onClick={handleLogout}>Sign Out</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
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