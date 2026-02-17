import React, { Component } from "react";
import "../Components/Styles/ContactUs.css"

const BASE_API_URL = "https://www.iqvideoproduction.com/api/";
const BASE_IMAGE_URL = "https://www.iqvideoproduction.com/assets/images/";

class ContactUs extends Component {
    state = {
        activeFaqIndex: 0,
    };

    faqData = [
        {
            question: "Who is this Live Full Stack course designed for?",
            answer: (
                <>
                    <p>
                        This course is designed for students, freshers, career switchers, and working professionals who want to learn full stack development through live training, gain real-world project experience, become job-ready developers with strong practical skills, and build a professional portfolio for interviews and receive career and placement guidance.
                    </p>
                </>
            )
        },
        {
            question: "Do I need prior coding experience to join this course?",
            answer: (
                <>
                    <p>
                        Velearn offers future-ready IT training programs designed to build strong careers in today’s tech industry. Our live courses cover key areas like software development, data-driven technologies, AI skills, and digital tools, helping students stay job-ready.
                    </p>
                    <p>
                        We also provide recorded IT programs in programming basics, web technologies, IT infrastructure, and other upskilling modules. Every course includes practical training, updated content, and job-focused learning to support your overall IT career growth.
                    </p>

                </>
            )
        },
        {
            question: "What kind of projects will I work on?",
            answer: (
                <>
                    <p>You can easily attend a free demo class for any course at Velearn. Just submit the demo request form or click the Contact Us button on the website. In the free demo, you will get a complete understanding of the course syllabus, trainer experience, placement process, project training, and learning style. This helps you choose the right IT course before enrolling.</p>
                </>
            )
        },
        {
            question: "Will this course help me get a job?",
            answer: (
                <>
                    <p>Velearn provides full student support throughout the training. You will get access to a personal support executive who helps you with:</p>
                    <ul>
                        <li>Technical doubts</li>
                        <li>Class issues</li>
                        <li>Batch allocation</li>
                        <li>Rescheduling or shifting batches</li>
                        <li>Assignment guidance</li>
                    </ul>
                    <p>
                        Along with this, you get mentor support, WhatsApp help, and doubt-clearing assistance, making the learning experience smooth and stress-free.
                    </p>
                </>
            )
        },
        {
            question: "How can I interact with mentors?",
            answer: (
                <>
                    <p>You can interact with Velearn mentors anytime through live doubt-clearing sessions, chat support, and WhatsApp guidance. Students can ask questions directly during class or through the support chat whenever needed. Mentors ensure every doubt is solved quickly so your IT learning journey stays smooth and clear.</p>
                </>
            )
        }
    ];

    toggleFaq = (index) => {
        this.setState({
            activeFaqIndex:
                this.state.activeFaqIndex === index ? null : index
        });
    };

    render() {
        return (
            <>
                <section className="contact_banner">
                    <div className="section_container py-5">
                        <div className="row">
                            <div className="col-lg-7">
                                <h1 className="fw-bold text-white">Get in touch with us</h1>
                                <p className="text-white mb-1">
                                    Find answers to questions we always receive.
                                </p>
                                <p className="text-white mb-2">
                                    If your query is not there, send us a message!
                                </p>
                                <p className="text-white mb-0">We’re here to help.</p>
                            </div>
                            <div className="col-lg-5 contact_banner_side_parent">
                                <div className="contact_banner_side"></div>
                                {/* <img src={`${process.env.PUBLIC_URL}/assets/images/contact-banner.jpg`} className="w-100" alt="" /> */}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="contact_form">
                    <div className="section_container">
                        <div className="py-5">
                            <div className="row justify-content-center">
                                <div className="col-lg-10">
                                    <h2 className="fw-bold text-c1">Get in touch with <span className="text-c2">sales</span></h2>
                                    <p>Get guidance on learning plans and pricing—our team will contact you shortly.</p>
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="row justify-content-center">
                                    <div className="col-lg-10">
                                        <form action="#">
                                            <div className="row">
                                                <div className="col-lg-6 d-flex flex-column py-2">
                                                    <label name="userName" className="mb-2">Name</label>
                                                    <input type="text" id="userName" name="userName" placeholder="Enter your name" />
                                                </div>
                                                <div className="col-lg-6 d-flex flex-column py-2">
                                                    <label name="phone" className="mb-2">Phone</label>
                                                    <input type="number" name="phone" id="phone" placeholder="Enter your phone number" />
                                                </div>
                                                <div className="col-lg-6 d-flex flex-column py-2">
                                                    <label name="email" className="mb-2">Email</label>
                                                    <input type="email" name="email" id="email" placeholder="Enter your mail" />
                                                </div>
                                                <div className="col-lg-6 d-flex flex-column py-2">
                                                    <label name="course" className="mb-2">Course</label>
                                                    <input type="email" name="course" id="course" placeholder="Enter your course" />
                                                </div>
                                                <div className="col-lg-12 d-flex flex-column py-2">
                                                    <label name="message" className="mb-2">Message</label>
                                                    <textarea name="message" id="message" placeholder="Write your message here"></textarea>
                                                </div>
                                            </div>
                                            <div className="col-12 d-flex justify-content-center mt-4">
                                                <button>Send a message</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="contact_details bg-c1 py-4">
                    <div className="section_container">
                        <h3 className="text-white text-center fw-bold mb-4">Contact Us</h3>
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="d-flex flex-wrap gap-5 justify-content-center mt-5">
                                    <div className="contact_details_sub">
                                        <div className="contact_details_sub_icon">
                                            <i className="bi bi-headset"></i>
                                        </div>
                                        <div>
                                            <h5 className="text-white fw-bold text-center">Help & Support</h5>
                                            <p className="mb-0 text-white text-center"><a href="tel:919988776655">+91 99887 76655</a></p>
                                        </div>
                                    </div>
                                    <div className="contact_details_sub">
                                        <div className="contact_details_sub_icon">
                                            <i className="bi bi-chat-left-dots"></i>
                                        </div>
                                        <div>
                                            <h5 className="text-white fw-bold text-center">Sms / Whatsapp</h5>
                                            <p className="mb-0 text-white text-center"><a href="tel:919988776655">+91 99887 76655</a></p>
                                        </div>
                                    </div>
                                    <div className="contact_details_sub">
                                        <div className="contact_details_sub_icon">
                                            <i className="bi bi-envelope-paper"></i>
                                        </div>
                                        <div>
                                            <h5 className="text-white fw-bold text-center">E-mail</h5>
                                            <p className="mb-0 text-white text-center"><a href="mailto:velearn@gmail.com">velearn@gmail.com</a></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center my-5">
                                    <button>Reach Out Us</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="faq_section py-5">
                    <div className="section_container p-xl text-center">
                        <h3 className="section_base_heading">
                            Frequently Asked <span className="text-c2"> Questions</span>
                        </h3>

                        <div className="row mt-5 align-items-center">
                            {/* FAQ Accordion */}
                            <div className="col-lg-12 text-start">
                                {this.faqData.map((item, index) => (
                                    <div className={`faq_item mb-3  ${this.state.activeFaqIndex === index ? "active" : ""
                                        }`} key={index}>
                                        <button
                                            className={`faq_question justify-content-between ${this.state.activeFaqIndex === index ? "active" : ""
                                                }`}
                                            onClick={() => this.toggleFaq(index)}
                                        >
                                            {item.question}
                                            <span className="icon">
                                                <img
                                                    src={
                                                        this.state.activeFaqIndex === index
                                                            ? null
                                                            : `${BASE_IMAGE_URL}icons/faq-icon.png`
                                                    }
                                                    alt="toggle"
                                                    className="faq_toggle_icon"
                                                />
                                            </span>
                                        </button>

                                        {this.state.activeFaqIndex === index && (
                                            <div className="faq_answer">
                                                {item.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default ContactUs;
