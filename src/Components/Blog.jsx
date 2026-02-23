import React, { Component } from "react";
import "../Components/Styles/Blog.css"

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = `${process.env.PUBLIC_URL}/assets/images/`;
const BASE_DYNAMIC_IMAGE_URL = "https://velearn.in/public/uploads/";

class Blog extends Component {

    render() {
        return (
            <>
                <section className="blog_banner py-3 py-lg-0">
                    <div className="section_container">
                        <div className="row">
                            <div className="col-lg-8 d-flex align-items-center">
                                <h1 className="text-white fw-bold">Staying relevant in tech today-Win tomorrow’s career.</h1>
                            </div>
                            <div className="col-lg-4">
                                <div className="px-lg-5 py-3">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/blogs/blog-banner-right.png`} className="w-100" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="blog_parent_body py-4">
                    <div className="section_container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="pe-lg-5">
                                    <h3 className="text-black text-center fw-bold mb-4">Explore our latest <span className="text-c2"> Blogs</span></h3>
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/blogs/blog-main.png`} className="w-100" alt="" />
                                    <div className="d-flex gap-4 pt-3 ps-lg-4">
                                        <div className="text-muted small">
                                            <i class="bi bi-calendar2-minus"></i>
                                            <span className="ps-1">20 July, 2026</span>
                                        </div>
                                        <div className="text-muted small">
                                            <i class="bi bi-eye"></i>
                                            <span className="ps-1">132 views</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="h3 mt-5 fw-bold text-black">How To Become idiculously Self-Aware In 20 Minutes</h1>
                                        <p>
                                            Self-awareness is not about overthinking yourself—it’s about noticing patterns. Start by sitting quietly for two minutes and observing your thoughts without judging them. Next, write down what you’re feeling right now and why. Ask yourself three simple questions: What triggered this? How did I react? What could I do better next time?
                                        </p>
                                        <p>
                                            Spend five minutes reviewing your recent actions—conversations, decisions, and habits. Identify one repeated behavior. Finally, note one strength and one weakness you observed today. This quick reflection process sharpens clarity, improves emotional control, and helps you respond instead of reacting. Practiced daily, self-awareness becomes a powerful life skill.
                                        </p>
                                        <div className="col-12 d-flex justify-content-center">
                                            <div className="blog_more_butt d-flex align-items-conter justify-content-center">
                                                <span>Show more</span>
                                                <div><i className="bi bi-arrow-right-short"></i></div>
                                            </div>
                                            {/* <button>Show more <span><i className="bi bi-arrow-right-short"></i></span></button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 blog_right_part mt-5 mt-lg-0">
                                <div className="ps-lg-5">
                                    <div className="blog_main_search">
                                        <input type="search" name="blog_search" id="blog_search" placeholder="Search..." />
                                        <div><i className="bi bi-search"></i></div>
                                    </div>
                                    <div className="pt-5 pb-3">
                                        <h5 className="text-c1 fw-bold">Categories</h5>
                                        <ul className="p-0">
                                            <li className="py-1"><i className="bi bi-chevron-right text-c2 small"></i> Art & Design</li>
                                            <li className="py-1"><i className="bi bi-chevron-right text-c2 small"></i> Business</li>
                                            <li className="py-1"><i className="bi bi-chevron-right text-c2 small"></i> Data Science</li>
                                            <li className="py-1"><i className="bi bi-chevron-right text-c2 small"></i> Development</li>
                                            <li className="py-1"><i className="bi bi-chevron-right text-c2 small"></i> Finance</li>
                                            <li className="py-1"><i className="bi bi-chevron-right text-c2 small"></i> Health & Fitness</li>
                                            <li className="py-1"><i className="bi bi-chevron-right text-c2 small"></i> Lifestyle</li>
                                        </ul>
                                    </div>
                                    <div className="py-3 latest_blog_parent">
                                        <h5 className="text-c1 fw-bold">Latest Post</h5>
                                        <div>
                                            <div className="d-flex pe-lg-5 gap-3 latest_blog__child">
                                                <div className="">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/blogs/latest-blog-1.png`} className="" alt="" />
                                                </div>
                                                <div className="">
                                                    <div className="small text-muted"><i class="bi bi-calendar2-minus pe-1"></i><span>April 13, 2026</span></div>
                                                    <p className="mb-0 mt-2">the Right Learning Path for your</p>
                                                </div>
                                            </div>
                                            <div className="d-flex pe-lg-5 gap-3 latest_blog__child">
                                                <div className="">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/blogs/latest-blog-2.png`} className="" alt="" />
                                                </div>
                                                <div className="">
                                                    <div className="small text-muted"><i class="bi bi-calendar2-minus pe-1"></i><span>April 13, 2026</span></div>
                                                    <p className="mb-0 mt-2">The Growing Need Management</p>
                                                </div>
                                            </div>
                                            <div className="d-flex pe-lg-5 gap-3 latest_blog__child">
                                                <div className="">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/blogs/latest-blog-3.png`} className="" alt="" />
                                                </div>
                                                <div className="">
                                                    <div className="small text-muted"><i class="bi bi-calendar2-minus pe-1"></i><span>April 13, 2026</span></div>
                                                    <p className="mb-0 mt-2">the Right Learning Path for your</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-3 blog_tags">
                                        <h5 className="text-c1 fw-bold">Tags</h5>
                                        <div className="blog_tags_child">
                                            <p className="text-c2">Education</p>
                                            <p className="text-c2">Training</p>
                                            <p className="text-c2">Online</p>
                                            <p className="text-c2">Learn</p>
                                            <p className="text-c2">Course</p>
                                            <p className="text-c2">LMS</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="section_container mb-5">
                        <div className="col-lg-12">
                            <h3 className="text-black text-center fw-bold">Earlier Articles from Our <span className="text-c2"> Blog</span></h3>
                            <div className="row justify-content-center">
                                <div className="col-lg-11">
                                    <div className="row">
                                        <div className="col-lg-4 my-3">
                                            <div className="blog_parent_card">
                                                <div className="bg-white blog_parent_card_inner">
                                                    <div className="mb-3">
                                                        <img src={`${process.env.PUBLIC_URL}/assets/images/blogs/blog-header.png`} className="w-100" alt="" />
                                                    </div>
                                                    <h5 className="text-c1 fw-bold">The Role of an AI Engineer and the Path to Becoming One </h5>
                                                    <p className="text-c2 fw-normal small"><i class="bi bi-calendar2-minus pe-2"></i> September 8, 2025</p>
                                                    <div className="blog_description">
                                                        <p>An AI Engineer designs, builds, and deploys intelligent systems using machine learning and data-driven models. </p>
                                                        <p>The role requires strong foundations in programming, algorithms, and data handling</p>
                                                        <p>An AI Engineer designs, builds, and deploys intelligent systems using machine learning and data-driven models. </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 my-3">
                                            <div className="blog_parent_card">
                                                <div className="bg-white blog_parent_card_inner">
                                                    <div className="mb-3">
                                                        <img src={`${process.env.PUBLIC_URL}/assets/images/blogs/blog-header.png`} className="w-100" alt="" />
                                                    </div>
                                                    <h5 className="text-c1 fw-bold">The Role of an AI Engineer and the Path to Becoming One </h5>
                                                    <p className="text-c2 fw-normal small"><i class="bi bi-calendar2-minus pe-2"></i> September 8, 2025</p>
                                                    <div className="blog_description">
                                                        <p>An AI Engineer designs, builds, and deploys intelligent systems using machine learning and data-driven models. </p>
                                                        <p>The role requires strong foundations in programming, algorithms, and data handling</p>
                                                        <p>An AI Engineer designs, builds, and deploys intelligent systems using machine learning and data-driven models. </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 my-3">
                                            <div className="blog_parent_card">
                                                <div className="bg-white blog_parent_card_inner">
                                                    <div className="mb-3">
                                                        <img src={`${process.env.PUBLIC_URL}/assets/images/blogs/blog-header.png`} className="w-100" alt="" />
                                                    </div>
                                                    <h5 className="text-c1 fw-bold">The Role of an AI Engineer and the Path to Becoming One </h5>
                                                    <p className="text-c2 fw-normal small"><i class="bi bi-calendar2-minus pe-2"></i> September 8, 2025</p>
                                                    <div className="blog_description">
                                                        <p>An AI Engineer designs, builds, and deploys intelligent systems using machine learning and data-driven models. </p>
                                                        <p>The role requires strong foundations in programming, algorithms, and data handling</p>
                                                        <p>An AI Engineer designs, builds, and deploys intelligent systems using machine learning and data-driven models. </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 my-3">
                                            <div className="blog_parent_card">
                                                <div className="bg-white blog_parent_card_inner">
                                                    <div className="mb-3">
                                                        <img src={`${process.env.PUBLIC_URL}/assets/images/blogs/blog-header.png`} className="w-100" alt="" />
                                                    </div>
                                                    <h5 className="text-c1 fw-bold">The Role of an AI Engineer and the Path to Becoming One </h5>
                                                    <p className="text-c2 fw-normal small"><i class="bi bi-calendar2-minus pe-2"></i> September 8, 2025</p>
                                                    <div className="blog_description">
                                                        <p>An AI Engineer designs, builds, and deploys intelligent systems using machine learning and data-driven models. </p>
                                                        <p>The role requires strong foundations in programming, algorithms, and data handling</p>
                                                        <p>An AI Engineer designs, builds, and deploys intelligent systems using machine learning and data-driven models. </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 my-3">
                                            <div className="blog_parent_card">
                                                <div className="bg-white blog_parent_card_inner">
                                                    <div className="mb-3">
                                                        <img src={`${process.env.PUBLIC_URL}/assets/images/blogs/blog-header.png`} className="w-100" alt="" />
                                                    </div>
                                                    <h5 className="text-c1 fw-bold">The Role of an AI Engineer and the Path to Becoming One </h5>
                                                    <p className="text-c2 fw-normal small"><i class="bi bi-calendar2-minus pe-2"></i> September 8, 2025</p>
                                                    <div className="blog_description">
                                                        <p>An AI Engineer designs, builds, and deploys intelligent systems using machine learning and data-driven models. </p>
                                                        <p>The role requires strong foundations in programming, algorithms, and data handling</p>
                                                        <p>An AI Engineer designs, builds, and deploys intelligent systems using machine learning and data-driven models. </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 my-3">
                                            <div className="blog_parent_card">
                                                <div className="bg-white blog_parent_card_inner">
                                                    <div className="mb-3">
                                                        <img src={`${process.env.PUBLIC_URL}/assets/images/blogs/blog-header.png`} className="w-100" alt="" />
                                                    </div>
                                                    <h5 className="text-c1 fw-bold">The Role of an AI Engineer and the Path to Becoming One </h5>
                                                    <p className="text-c2 fw-normal small"><i class="bi bi-calendar2-minus pe-2"></i> September 8, 2025</p>
                                                    <div className="blog_description">
                                                        <p>An AI Engineer designs, builds, and deploys intelligent systems using machine learning and data-driven models. </p>
                                                        <p>The role requires strong foundations in programming, algorithms, and data handling</p>
                                                        <p>An AI Engineer designs, builds, and deploys intelligent systems using machine learning and data-driven models. </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mt-3">
                                        <button className="blog_more_butt">Learn More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default Blog;
