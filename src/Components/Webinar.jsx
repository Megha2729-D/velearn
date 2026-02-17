import React, { Component } from "react";
import "../Components/Styles/Webinar.css"

const BASE_API_URL = "https://www.iqvideoproduction.com/api/";
const BASE_IMAGE_URL = "https://www.iqvideoproduction.com/assets/images/";

class Webinar extends Component {

    state = {
        activeCategory: "Full Stack Development",
        visibleCount: 8,

        categories: [
            "Full Stack Development",
            "Data Science",
            "UI/UX Design",
            "Digital Marketing",
            "AI/ML"
        ],

        webinars: [

            // ================= FULL STACK DEVELOPMENT (16) =================
            { id: 1, title: "How Real-World Full Stack Applications Are Built", category: "Full Stack Development", date: "Feb 3, Tuesday", time: "8:00 pm" },
            { id: 2, title: "React & Node Complete Workflow", category: "Full Stack Development", date: "Feb 5, Thursday", time: "7:00 pm" },
            { id: 3, title: "Advanced MERN Architecture", category: "Full Stack Development", date: "Feb 7, Saturday", time: "8:30 pm" },
            { id: 4, title: "Authentication & JWT Deep Dive", category: "Full Stack Development", date: "Feb 9, Monday", time: "9:00 pm" },
            { id: 5, title: "REST API Best Practices", category: "Full Stack Development", date: "Feb 10, Tuesday", time: "6:00 pm" },
            { id: 6, title: "MongoDB Optimization Techniques", category: "Full Stack Development", date: "Feb 11, Wednesday", time: "7:30 pm" },
            { id: 7, title: "State Management in React", category: "Full Stack Development", date: "Feb 12, Thursday", time: "8:00 pm" },
            { id: 8, title: "Deploying Apps to Cloud", category: "Full Stack Development", date: "Feb 13, Friday", time: "8:00 pm" },
            { id: 9, title: "Next.js Full Guide", category: "Full Stack Development", date: "Feb 14, Saturday", time: "7:00 pm" },
            { id: 10, title: "TypeScript with React", category: "Full Stack Development", date: "Feb 15, Sunday", time: "8:00 pm" },
            { id: 11, title: "Backend Scaling Strategies", category: "Full Stack Development", date: "Feb 16, Monday", time: "9:00 pm" },
            { id: 12, title: "GraphQL vs REST", category: "Full Stack Development", date: "Feb 17, Tuesday", time: "6:30 pm" },
            { id: 13, title: "Microservices Architecture", category: "Full Stack Development", date: "Feb 18, Wednesday", time: "7:00 pm" },
            { id: 14, title: "Real-time Apps with Socket.io", category: "Full Stack Development", date: "Feb 19, Thursday", time: "8:00 pm" },
            { id: 15, title: "Payment Gateway Integration", category: "Full Stack Development", date: "Feb 20, Friday", time: "7:30 pm" },
            { id: 16, title: "Production Debugging Techniques", category: "Full Stack Development", date: "Feb 21, Saturday", time: "8:00 pm" },

            // ================= DATA SCIENCE (5) =================
            { id: 17, title: "Python for Data Analysis", category: "Data Science", date: "Feb 7, Saturday", time: "8:30 pm" },
            { id: 18, title: "Machine Learning Basics", category: "Data Science", date: "Feb 9, Monday", time: "9:00 pm" },
            { id: 19, title: "Data Visualization with Python", category: "Data Science", date: "Feb 12, Thursday", time: "7:00 pm" },
            { id: 20, title: "Statistics for Data Science", category: "Data Science", date: "Feb 14, Saturday", time: "6:00 pm" },
            { id: 21, title: "Pandas & NumPy Mastery", category: "Data Science", date: "Feb 16, Monday", time: "8:00 pm" },

            // ================= UI/UX DESIGN (5) =================
            { id: 22, title: "Figma UI Masterclass", category: "UI/UX Design", date: "Feb 10, Tuesday", time: "6:00 pm" },
            { id: 23, title: "UX Research Methods", category: "UI/UX Design", date: "Feb 12, Thursday", time: "7:30 pm" },
            { id: 24, title: "Wireframing & Prototyping", category: "UI/UX Design", date: "Feb 15, Sunday", time: "6:00 pm" },
            { id: 25, title: "Design Systems Explained", category: "UI/UX Design", date: "Feb 17, Tuesday", time: "7:00 pm" },
            { id: 26, title: "Mobile UI Design Trends", category: "UI/UX Design", date: "Feb 19, Thursday", time: "8:00 pm" },

            // ================= DIGITAL MARKETING (5) =================
            { id: 27, title: "SEO Ranking Strategy", category: "Digital Marketing", date: "Feb 11, Wednesday", time: "7:30 pm" },
            { id: 28, title: "Google Ads Fundamentals", category: "Digital Marketing", date: "Feb 13, Friday", time: "6:00 pm" },
            { id: 29, title: "Social Media Growth Hacks", category: "Digital Marketing", date: "Feb 16, Monday", time: "7:00 pm" },
            { id: 30, title: "Content Marketing Strategy", category: "Digital Marketing", date: "Feb 18, Wednesday", time: "8:00 pm" },
            { id: 31, title: "Email Marketing Automation", category: "Digital Marketing", date: "Feb 20, Friday", time: "6:30 pm" },

            // ================= AI/ML (5) =================
            { id: 32, title: "Deep Learning Explained", category: "AI/ML", date: "Feb 13, Friday", time: "8:00 pm" },
            { id: 33, title: "Generative AI Tools", category: "AI/ML", date: "Feb 15, Sunday", time: "8:00 pm" },
            { id: 34, title: "Neural Networks Simplified", category: "AI/ML", date: "Feb 17, Tuesday", time: "7:00 pm" },
            { id: 35, title: "AI Model Deployment", category: "AI/ML", date: "Feb 19, Thursday", time: "8:30 pm" },
            { id: 36, title: "ChatGPT & LLM Applications", category: "AI/ML", date: "Feb 21, Saturday", time: "7:00 pm" }

        ]
    };

    changeCategory = (cat) => {
        this.setState({
            activeCategory: cat,
            visibleCount: 12
        });
    };

    loadMore = () => {
        this.setState(prev => ({
            visibleCount: prev.visibleCount + 4
        }));
    };

    render() {

        const filteredWebinars = this.state.webinars.filter(
            w => w.category === this.state.activeCategory
        );

        const visibleWebinars = filteredWebinars.slice(0, this.state.visibleCount);
        const hasMore = this.state.visibleCount < filteredWebinars.length;

        return (
            <>
                {/* Banner */}
                <section className="webinar_banner py-4 py-lg-0">
                    <div className="section_container">
                        <div className="row">
                            <div className="col-lg-8 d-flex align-items-center">
                                <h1 className="text-white fw-bold lh-base">
                                    Unlock your full potential! <br />
                                    “Gain practical insights through this live webinar.”
                                </h1>
                            </div>
                            <div className="col-lg-4">
                                <div className="px-lg-5 py-3">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/webinar/webinar-bannner-end.png`} className="w-100" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Webinar Section */}
                <section>
                    <div className="section_container">
                        <div className="webinar_main py-5">

                            <h3 className="fw-bold text-center text-black mb-4">
                                Upcoming <span className="text-c2"> Webinars</span>
                            </h3>

                            <div className="row">

                                {/* LEFT TABS */}
                                <div className="col-lg-3">
                                    <div className="webinar_category">
                                        <h5 className="text-black fw-bold text-center">Course Units</h5>
                                        <ul>
                                            {this.state.categories.map((cat, index) => (
                                                <li
                                                    key={index}
                                                    className={this.state.activeCategory === cat ? "active" : ""}
                                                    onClick={() => this.changeCategory(cat)}
                                                >
                                                    {cat}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* RIGHT CARDS */}
                                <div className="col-lg-9">
                                    <div className="row g-4 mt-3">

                                        {visibleWebinars.map((webinar, index) => {

                                            const isPreviewRow = index >= 8;
                                            return (
                                                <div className="col-md-3 col-sm-6 d-flex" key={webinar.id}>
                                                    <div className="webinar_card mt-3 mb-5 d-flex flex-column justify-content-center align-items-center">
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}/assets/images/webinar/webinar-main.png`}
                                                            alt=""
                                                            className="webinar_img"
                                                        />
                                                        <div className="webinar_card_body d-flex flex-column">
                                                            <h5 className="my-3">{webinar.title}</h5>
                                                            <div className="d-flex px-4 flex-column align-items-start small mb-3">
                                                                <div className="d-flex gap-2 my-1">
                                                                    <i className="bi bi-calendar-fill text-c1"></i>
                                                                    <span className="text-black">{webinar.date}</span>
                                                                </div>
                                                                <div className="d-flex gap-2 my-1">
                                                                    <i className="bi bi-clock-fill text-c1"></i>
                                                                    <span className="text-black">{webinar.time}</span>
                                                                </div>
                                                            </div>
                                                            <div className="mt-auto">
                                                                <button className="register_btn w-100">Register now</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        {filteredWebinars.length === 0 && (
                                            <div className="text-center py-5">
                                                <h5>No webinars available</h5>
                                            </div>
                                        )}
                                        {hasMore && (
                                            <div className="text-center mt-2 mb-5">
                                                <button className="load_more_arrow" onClick={this.loadMore}>
                                                    <i className="bi bi-chevron-down"></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section_container">
                    <div className="row justify-content-center webinar_subscribe_box">
                        <div className="col-lg-10">
                            <div className="py-5">
                                <h3 className="text-black text-center fw-bold">Subscribe now!</h3>
                                <div className="row justify-content-center">
                                    <div className="col-lg-6">
                                        <form action="#">
                                            <div className="my-4">
                                                <input type="text" name="name" id="name" placeholder="Your Name" />
                                            </div>
                                            <div className="my-4">
                                                <input type="email" name="email" id="email" placeholder="E-mail ID" />
                                            </div>
                                            <div className="my-4">
                                                <input type="number" name="phone" id="phone" placeholder="Phone no" />
                                            </div>
                                            <div className="col-12 d-flex justify-content-center">
                                                <button>Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section_container py-5">
                    <div>
                        <h3 className="text-black text-center fw-bold">Key Highlights for a <span className="text-c2"> Productivity Webinar</span></h3>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-11">
                            <div className="row webinar_highlights_parent mt-4">
                                <div className="col-lg-2 col-6 my-2">
                                    <div className="webinar_highlights_sub">
                                        <div className="px-3 d-flex justify-content-center align-items-center">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/webinar/key-highlights/highlights-1.png`} alt="" />
                                        </div>
                                        <p className="mb-0 text-black">Learn proven techniques to manage your time effectively</p>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-6 my-2">
                                    <div className="webinar_highlights_sub">
                                        <div className="px-3 d-flex justify-content-center align-items-center">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/webinar/key-highlights/highlights-2.png`} alt="" />
                                        </div>
                                        <p className="mb-0 text-black">Discover tools to boost focus and efficiency</p>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-6 my-2">
                                    <div className="webinar_highlights_sub">
                                        <div className="px-3 d-flex justify-content-center align-items-center">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/webinar/key-highlights/highlights-3.png`} alt="" />
                                        </div>
                                        <p className="mb-0 text-black">Strategies to overcome common productivity challenges</p>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-6 my-2">
                                    <div className="webinar_highlights_sub">
                                        <div className="px-3 d-flex justify-content-center align-items-center">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/webinar/key-highlights/highlights-4.png`} alt="" />
                                        </div>
                                        <p className="mb-0 text-black">Live Q&A with productivity experts</p>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-6 my-2">
                                    <div className="webinar_highlights_sub">
                                        <div className="px-3 d-flex justify-content-center align-items-center">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/webinar/key-highlights/highlights-5.png`} alt="" />
                                        </div>
                                        <p className="mb-0 text-black">Practical techniques you can start using right away</p>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-6 my-2">
                                    <div className="webinar_highlights_sub">
                                        <div className="px-3 d-flex justify-content-center align-items-center">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/webinar/key-highlights/highlights-6.png`} alt="" />
                                        </div>
                                        <p className="mb-0 text-black">Learn through real-world case studies in the webinar</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-4 webinar_cta mb-4">
                    <div className="section_container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="d-flex justify-content-center align-items-center flex-column">
                                    <p className="text-white text-center">Sign up to transform the way you organize, prioritize, and execute tasks.</p>
                                    <button>Register now <i className="bi bi-arrow-right ps-2"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default Webinar;
