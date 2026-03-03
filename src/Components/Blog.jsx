import React, { Component } from "react";
import "../Components/Styles/Blog.css";
import { Link } from "react-router-dom";

const blogsData = [
    {
        id: 1,
        title: "The Role of an AI Engineer and the Path to Becoming One",
        date: "September 8, 2025",
        image: `${process.env.PUBLIC_URL}/assets/images/blogs/blog-header.png`,
        description: [
            "An AI Engineer designs, builds, and deploys intelligent systems using machine learning and data-driven models.",
            "The role requires strong foundations in programming, algorithms, and data handling.",
            "AI Engineers work closely with cross-functional teams."
        ]
    },
    {
        id: 2,
        title: "Why Full Stack Development is in High Demand",
        date: "September 10, 2025",
        image: `${process.env.PUBLIC_URL}/assets/images/blogs/blog-header.png`,
        description: [
            "Full Stack Developers are skilled professionals who work on both frontend and backend technologies to build complete web applications.",
            "They understand user interfaces, databases, APIs, and server-side logic, making them highly versatile in modern development teams.",
            "Because companies prefer developers who can handle multiple layers of a project, full stack development continues to be one of the most in-demand career paths."
        ]
    },
    {
        id: 3,
        title: "Top Skills Required for Data Scientists",
        date: "September 12, 2025",
        image: `${process.env.PUBLIC_URL}/assets/images/blogs/blog-header.png`,
        description: [
            "Data Scientists analyze complex data to extract meaningful insights that help businesses make informed decisions.",
            "Strong knowledge of statistics, probability, and programming languages like Python or R is essential in this field.",
            "In addition to technical skills, the ability to communicate insights clearly is what truly sets successful data professionals apart."
        ]
    },
    {
        id: 4,
        title: "Cloud Computing Career Opportunities",
        date: "September 14, 2025",
        image: `${process.env.PUBLIC_URL}/assets/images/blogs/blog-header.png`,
        description: [
            "Cloud Computing has transformed how businesses store, manage, and process data in scalable environments.",
            "Professionals skilled in platforms like AWS, Microsoft Azure, and Google Cloud are highly valued across industries.",
            "With digital transformation accelerating globally, cloud-related roles offer strong growth potential and competitive salaries."
        ]
    },
    {
        id: 5,
        title: "Cybersecurity Trends in 2026",
        date: "September 16, 2025",
        image: `${process.env.PUBLIC_URL}/assets/images/blogs/blog-header.png`,
        description: [
            "Cybersecurity professionals protect organizations from digital threats, data breaches, and cyber attacks.",
            "As technology evolves, new security challenges emerge, requiring experts in network security, ethical hacking, and risk management.",
            "With increasing online transactions and cloud adoption, cybersecurity remains one of the fastest-growing IT career domains."
        ]
    },
    {
        id: 6,
        title: "How to Start a Career in UI/UX Design",
        date: "September 18, 2025",
        image: `${process.env.PUBLIC_URL}/assets/images/blogs/blog-header.png`,
        description: [
            "UI/UX Designers focus on creating user-friendly and visually appealing digital experiences.",
            "They research user behavior, design wireframes, and build interactive prototypes to improve usability.",
            "With businesses prioritizing customer experience, UI/UX design has become a powerful and creative career choice."
        ]
    },
    {
        id: 7,
        title: "Machine Learning Roadmap for Beginners",
        date: "September 20, 2025",
        image: `${process.env.PUBLIC_URL}/assets/images/blogs/blog-header.png`,
        description: [
            "Machine Learning enables systems to learn from data and improve performance without explicit programming.",
            "Beginners should start with Python, basic mathematics, and an understanding of supervised and unsupervised learning.",
            "Building small projects and experimenting with datasets is the best way to gain practical ML experience."
        ]
    },
    {
        id: 8,
        title: "DevOps: The Future of Software Deployment",
        date: "September 22, 2025",
        image: `${process.env.PUBLIC_URL}/assets/images/blogs/blog-header.png`,
        description: [
            "DevOps combines development and operations to improve software delivery speed and reliability.",
            "It focuses on automation, continuous integration, and efficient collaboration between teams.",
            "As organizations aim for faster deployments and stable systems, DevOps skills are becoming increasingly valuable."
        ]
    },
    {
        id: 9,
        title: "Top Programming Languages in 2026",
        date: "September 25, 2025",
        image: `${process.env.PUBLIC_URL}/assets/images/blogs/blog-header.png`,
        description: [
            "Programming languages continue to evolve based on industry demands and technological advancements.",
            "Languages like Python and JavaScript remain dominant, while newer languages such as Rust and Go are gaining popularity.",
            "Choosing the right language depends on your career goals, industry focus, and long-term growth plans."
        ]
    }
];

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleCount: 6
        };
    }

    handleShowMore = () => {
        this.setState((prevState) => ({
            visibleCount: prevState.visibleCount + 3
        }));
    };

    render() {
        const { visibleCount } = this.state;
        const visibleBlogs = blogsData.slice(0, visibleCount);

        return (
            <>
                {/* Banner Section */}
                <section className="blog_banner py-3 py-lg-0">
                    <div className="section_container">
                        <div className="row">
                            <div className="col-lg-8 d-flex align-items-center">
                                <h1 className="text-white fw-bold">
                                    Staying relevant in tech today - Win tomorrow’s career.
                                </h1>
                            </div>
                            <div className="col-lg-4">
                                <div className="px-lg-5 py-3">
                                    <img
                                        src={`${process.env.PUBLIC_URL}/assets/images/blogs/blog-banner-right.png`}
                                        className="w-100"
                                        alt="Blog Banner"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blog Cards Section */}
                <section className="blog_parent_body py-4">
                    <div className="section_container">
                        <div className="row justify-content-center">
                            <div className="col-lg-11">
                                <div className="row">

                                    {visibleBlogs.map((blog) => (
                                        <div className="col-lg-4 my-3" key={blog.id}>
                                            <div className="blog_parent_card">
                                                <div className="bg-white blog_parent_card_inner">
                                                    <div className="mb-3">
                                                        <img
                                                            src={blog.image}
                                                            className="w-100"
                                                            alt={blog.title}
                                                        />
                                                    </div>

                                                    <h5 className="text-c1 fw-bold">
                                                        {blog.title}
                                                    </h5>

                                                    <p className="text-c2 fw-normal small">
                                                        <i className="bi bi-calendar2-minus pe-2"></i>
                                                        {blog.date}
                                                    </p>

                                                    <div className="blog_description">
                                                        {blog.description.map((para, index) => (
                                                            <p key={index}>{para}</p>
                                                        ))}
                                                    </div>
                                                    <div className="col-12 mt-auto d-flex justify-content-center">
                                                        <Link to={"/blog-details"}>
                                                            <div className="read_more_butt mt-4 d-flex align-items-conter justify-content-center">
                                                                <span>Read more</span>
                                                                <div><i className="bi bi-arrow-right-short"></i></div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Show More Button */}
                                {visibleCount < blogsData.length && (
                                    <div className="d-flex justify-content-center mt-3">
                                        <button
                                            className="blog_more_butt"
                                            onClick={this.handleShowMore}
                                        >
                                            Show More
                                        </button>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default Blog;