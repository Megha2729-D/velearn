import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const [active, setActive] = useState(false);

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setActive(true);
            } else {
                setActive(false);
            }
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
        }

        // Cleanup just in case
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [showNavbar]);
    return (
        <nav className="v-navbar flex-column w-100">
            <div className={`navbar_links ${active ? "active" : ""}`}>
                <div className="container container-p">
                    <div className="nav_parent py-3">
                        <div className="menu-icon" onClick={handleShowNavbar}>
                            <Hamburger isOpen={showNavbar} />
                        </div>
                        <div className="logo">
                            <NavLink to="/">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/velearn-logo.png`} alt="" />
                            </NavLink>
                        </div>
                        <div className={`nav-elements  ${showNavbar && "active"}`}>
                            <ul className="mb-0">
                                <li>
                                    <NavLink to="/">Self-Paced Course</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/sample">Live Course</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/sample">Practice</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/sample">Resources</NavLink>
                                </li>
                            </ul>
                            <div className="col-lg-12 d-flex gap-2 d-lg-none px-4 my-3">
                                <a href="/">
                                    <div className="ab-lgo-bx">
                                        <i className="bi bi-instagram"></i>
                                    </div>
                                </a>
                                <a href="/">
                                    <div className="ab-lgo-bx">
                                        <i className="bi bi-facebook"></i>
                                    </div>
                                </a>
                                <a href="/">
                                    <div className="ab-lgo-bx">
                                        <i className="bi bi-twitter-x"></i>
                                    </div>
                                </a>
                                <a href="/">
                                    <div className="ab-lgo-bx">
                                        <i className="bi bi-whatsapp"></i>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="d-flex gap-4 right_nav_icons">
                            <div className="d-flex gap-4 text-white">
                                <span className='d-none d-lg-block'>
                                    <Link to='/login' className="text-dark text-decoration-none">Login</Link>
                                </span>
                                <span>
                                    <Link to="/signup" className="text-decoration-none signUpBut px-4">Sign Up</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container container-p search_parent">
                <div className="col-12 d-flex justify-content-end align-items-center gap-4 py-2">
                    <div className="w-100 d-flex justify-content-end">
                        <input type="search" style={{ width: "40%" }} placeholder='Search....' />
                    </div>
                    <div className="d-flex gap-2 ">
                        <span>
                            <Link to="/" className="text-decoration-none signUpBut px-4">Contact</Link>
                        </span>
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
                <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
                    <rect
                        id="Rectangle_3"
                        data-name="Rectangle 3"
                        width="30"
                        height="2"
                        rx="2"
                        transform="translate(304 47)"
                        fill="#574c4c"
                    />
                    <rect
                        id="Rectangle_5"
                        data-name="Rectangle 5"
                        width="30"
                        height="2"
                        rx="2"
                        transform="translate(304 67)"
                        fill="#574c4c"
                    />
                    <rect
                        id="Rectangle_4"
                        data-name="Rectangle 4"
                        width="40"
                        height="2"
                        rx="2"
                        transform="translate(294 57)"
                        fill="#574c4c"
                    />
                </g>
            </svg>

            {/* X icon */}
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
