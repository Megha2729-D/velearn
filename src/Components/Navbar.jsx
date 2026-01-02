import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({});
    const [subDropdownOpen, setSubDropdownOpen] = useState({});

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
                                <img src={`${process.env.PUBLIC_URL}/assets/images/velearn-logo.png`} alt="" />
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
                                        <li><NavLink to="/resources/blogs" onClick={handleItemClick}>Blogs</NavLink></li>
                                        <li><NavLink to="/resources/docs" onClick={handleItemClick}>Docs</NavLink></li>
                                        <li><NavLink to="/resources/tools" onClick={handleItemClick}>Tools</NavLink></li>
                                    </ul>
                                </li>

                            </ul>

                        </div>

                        {/* RIGHT */}
                        <div className="d-flex gap-4 right_nav_icons">

                            {/* DESKTOP SEARCH */}
                            <div className="d-lg-flex d-none align-items-center">
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

                            {/* DESKTOP LOGIN / SIGNUP */}
                            <div className="d-lg-flex d-none gap-2 align-items-center">
                                <Link to="/login" className="btn_login">Login</Link>
                                <Link to="/signup" className="btn_signup">Sign Up</Link>
                            </div>

                            {/* MOBILE ICONS */}
                            <div className="d-flex d-lg-none align-items-center nav_mbl_icons">
                                <button className="mbl_search_btn bg-transparent border-0">
                                    <i className="bi bi-search d-flex"></i>
                                </button>

                                <Link to="/login" className="btn_login ms-2">
                                    Login
                                </Link>
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
