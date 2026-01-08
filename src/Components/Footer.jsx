import { Component } from "react";
import { Link } from 'react-router-dom';

class Footer extends Component {

    render() {
        return (
            <>
                <div className="footer_sec position-relative">
                    <div className="footer_blur_text"><h5>Velearn</h5></div>
                    <div className="section_container p-xl">
                        <div className="row page_links">
                            {/* Desktop View */}
                            <div className="d-none d-lg-block">
                                <div className="d-flex justify-content-center">
                                    <div className="col-lg-11 px-lg-0">
                                        <div className="row justify-content-between">
                                            <div className="col-lg-3 mb-3">
                                                <div>
                                                    <h3>Live Classes</h3>
                                                    <ul className="p-0">
                                                        <li><Link to="">Full Stack Development</Link></li>
                                                        <li><Link to="">Data Science</Link></li>
                                                        <li><Link to="">UI/UX Design Course</Link></li>
                                                        <li><Link to="">Digital Marketing</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 mb-3">
                                                <div>
                                                    <h3>Trending Courses</h3>
                                                    <ul className="p-0">
                                                        <li><Link to="">Python For Data Science</Link></li>
                                                        <li><Link to="">C Programming</Link></li>
                                                        <li><Link to="">Ethical Hacking</Link></li>
                                                        <li><Link to="">AWS</Link></li>
                                                        <li><Link to="">All Courses</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 mb-3">
                                                <div>
                                                    <h3>Self Paced Courses</h3>
                                                    <ul className="p-0">
                                                        <li><Link to="">Paid Courses</Link></li>
                                                        <li><Link to="">Free Courses</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-between">
                                            <div className="col-lg-3 mb-3">
                                                <div>
                                                    <h3>Resources</h3>
                                                    <ul className="p-0">
                                                        <li><Link to="">Webinars</Link></li>
                                                        <li><Link to="">Blogs</Link></li>
                                                        <li><Link to="">Rewards & Referrals</Link></li>
                                                        <li><Link to="">Become An Affilliate</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 mb-3">
                                                <div>
                                                    <h3>Practice</h3>
                                                    <ul className="p-0">
                                                        <li><Link to="">IDE</Link></li>
                                                        <li><Link to="">Debugging</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 mb-3">
                                                <div>
                                                    <h3>Company</h3>
                                                    <ul className="p-0">
                                                        <li><Link to="">Refund Policy</Link></li>
                                                        <li><Link to="">FAQs</Link></li>
                                                        <li><Link to="">About Us</Link></li>
                                                        <li><Link to="">Contact Us</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Mobile Accordion */}
                            <div className="accordion d-lg-none" id="footerAccordion">
                                {/* Courses */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingCourses">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseCourses"
                                        >
                                            Popular Courses
                                        </button>
                                    </h2>
                                    <div id="collapseCourses" className="accordion-collapse collapse" data-bs-parent="#footerAccordion">
                                        <div className="accordion-body">
                                            <ul className="p-0">
                                                <li><Link to="">Web Development</Link></li>
                                                <li><Link to="">Python Programming</Link></li>
                                                <li><Link to="">Data Science</Link></li>
                                                <li><Link to="">Cloud Computing (AWS & Azure)</Link></li>
                                                <li><Link to="">Cyber Security & Ethical Hacking</Link></li>
                                                <li><Link to="">UI/UX Design</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Resources */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingResources">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseResources"
                                        >
                                            Resources
                                        </button>
                                    </h2>
                                    <div id="collapseResources" className="accordion-collapse collapse" data-bs-parent="#footerAccordion">
                                        <div className="accordion-body">
                                            <ul className="p-0">
                                                <li><Link to="">Blogs & Articles</Link></li>
                                                <li><Link to="">Free eBooks</Link></li>
                                                <li><Link to="">Video Tutorials</Link></li>
                                                <li><Link to="">FAQs</Link></li>
                                                <li><Link to="">Student Support</Link></li>
                                                <li><Link to="">Downloads</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Company */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingCompany">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseCompany"
                                        >
                                            Company
                                        </button>
                                    </h2>
                                    <div id="collapseCompany" className="accordion-collapse collapse" data-bs-parent="#footerAccordion">
                                        <div className="accordion-body">
                                            <ul className="p-0">
                                                <li><Link to="">About Us</Link></li>
                                                <li><Link to="">Careers</Link></li>
                                                <li><Link to="">Contact Us</Link></li>
                                                <li><Link to="">Become an Instructor</Link></li>
                                                <li><Link to="">Partners & Affiliates</Link></li>
                                                <li><Link to="">Feedback</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Practice */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingPractice">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapsePractice"
                                        >
                                            Practice Platform
                                        </button>
                                    </h2>
                                    <div id="collapsePractice" className="accordion-collapse collapse" data-bs-parent="#footerAccordion">
                                        <div className="accordion-body">
                                            <ul className="p-0">
                                                <li><Link to="">Code Lab</Link></li>
                                                <li><Link to="">Quiz Zone</Link></li>
                                                <li><Link to="">Mock Tests</Link></li>
                                                <li><Link to="">Mini Projects</Link></li>
                                                <li><Link to="">Assignments</Link></li>
                                                <li><Link to="">Certifications</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-12 d-flex justify-content-center">
                            <div className="col-lg-11">
                                {/* About & Social */}
                                <div className="row bottom_social_media">
                                    <div className="col-lg-7">
                                        <Link to="/">
                                            <span className="h1 footerLogo fw-bolder text-white">Velearn</span>
                                        </Link>
                                        <p className="mt-3 lh-lg">
                                            Velearn, a trusted online IT education provider, specializes in delivering industry-aligned courses designed by experienced trainers. Since its inception, Veleam has focused on practical learning job-oriented skills, and accessible training for all aspiring tech professionals. With a growing leamer community, Veleom continues to support career transformation through quality leaming.
                                        </p>
                                    </div>

                                    <div className="col-lg-2 col-6">
                                        <h3 className="mt-3">Follow Us</h3>
                                        <div className="col-12 mb-3 mt-4">
                                            <div className="d-flex gap-3">
                                                <div className="footer_icons">
                                                    <a href="https://facebook.com/velearn" target="_blank" rel="noreferrer">
                                                        <img src={`${process.env.PUBLIC_URL}/assets/images/icons/facebook.png`} alt="Facebook" />
                                                    </a>
                                                </div>
                                                <div className="footer_icons">
                                                    <a href="https://twitter.com/velearn" target="_blank" rel="noreferrer">
                                                        <img src={`${process.env.PUBLIC_URL}/assets/images/icons/twitter.png`} alt="Twitter" />
                                                    </a>
                                                </div>
                                                <div className="footer_icons">
                                                    <a href="https://instagram.com/velearn" target="_blank" rel="noreferrer">
                                                        <img src={`${process.env.PUBLIC_URL}/assets/images/icons/instagram.png`} alt="Instagram" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <div className="d-flex gap-3">
                                                <div className="footer_icons">
                                                    <a href="https://linkedin.com/company/velearn" target="_blank" rel="noreferrer">
                                                        <img src={`${process.env.PUBLIC_URL}/assets/images/icons/linkedin.png`} alt="LinkedIn" />
                                                    </a>
                                                </div>
                                                <div className="footer_icons">
                                                    <a href="https://youtube.com/@velearn" target="_blank" rel="noreferrer">
                                                        <img src={`${process.env.PUBLIC_URL}/assets/images/icons/youtube.png`} alt="YouTube" />
                                                    </a>
                                                </div>
                                                <div className="footer_icons">
                                                    <a href="https://t.me/velearn" target="_blank" rel="noreferrer">
                                                        <img src={`${process.env.PUBLIC_URL}/assets/images/icons/telegram.png`} alt="Telegram" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-6 d-flex flex-column align-items-center app_img">
                                        <div className="one mt-3">
                                            <a href="" target="_blank" rel="noreferrer">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/icons/google-play.png`} alt="google-play" />
                                            </a>
                                        </div>
                                        <div className="one">
                                            <a href="" target="_blank" rel="noreferrer">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/icons/apple-store.png`} alt="apple-store" />
                                            </a>
                                        </div>
                                        <div className="one">
                                            <a href="" target="_blank" rel="noreferrer">
                                                <p className="mb-0"> Refer & Earn</p>
                                            </a>
                                        </div>
                                        <div className="two">
                                            <a href="" target="_blank" rel="noreferrer">
                                                <p className="mb-0">Became an affilate</p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                {/* Bottom Bar */}
                                <div className="row d-flex flex-lg-row flex-column-reverse">
                                    <div className="col-lg-4">
                                        <div className="col-12 pt-2 d-flex justify-content-lg-start justify-content-center">
                                            <span>© {new Date().getFullYear()} All Rights Reserved by </span>
                                            <Link to="/">Velearn</Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="col-12 pt-2 d-flex justify-content-center">
                                            <Link to="/terms">Terms & Conditions</Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="col-12 pt-2 d-flex justify-content-lg-end justify-content-center">
                                            <Link to="/privacy-policy">Privacy Policy</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Footer;
