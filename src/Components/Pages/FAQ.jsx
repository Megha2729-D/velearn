import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/FAQ.css';

const FAQ = () => {
    const [activeFaqIndex, setActiveFaqIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const faqData = [
        {
            question: "What is VeLearn?",
            answer: "VeLearn is a premier e-learning platform dedicated to providing high-quality, industry-relevant training in software development, UI/UX design, digital marketing, and data science. We offer both self-paced recorded courses and live mentor-led programs."
        },
        {
            question: "Are the courses self-paced or live?",
            answer: "We offer both! Our 'Self-paced Courses' consist of pre-recorded high-quality videos that you can watch anytime. Our 'Live Courses' are real-time, mentor-led sessions with scheduled batches for interactive learning."
        },
        {
            question: "Do I get a certificate upon completion?",
            answer: "Yes, every course at VeLearn comes with a professional Certificate of Completion. Once you finish all the modules and successfully pass the related assessments or projects, your certificate will be generated automatically in your profile."
        },
        {
            question: "How long do I have access to the courses?",
            answer: "For self-paced recorded courses, you get lifetime access. For live programs, you have access to the session recordings and materials for a period specified in each course's details (typically 1-2 years)."
        },
        {
            question: "Do you provide placement assistance?",
            answer: "Yes, we provide placement support for our premium programs. This includes resume building, interview preparation, mock interviews, and connecting you with our network of hiring partners."
        },
        {
            question: "Is there any prerequisite for joining the courses?",
            answer: "Most of our foundation courses are beginner-friendly and require no prior experience. However, some advanced specialization courses might have recommended prerequisites which are clearly mentioned in the course details page."
        },
        {
            question: "Can I access the courses on mobile?",
            answer: "Absolutely! Our platform is fully responsive, meaning you can learn on your laptop, tablet, or smartphone anytime, anywhere."
        },
        {
            question: "What should I do if I have doubts during my learning?",
            answer: "We provide dedicated support for our learners. You can use our community forums, join the Slack/Discord groups (for specific programs), or attend live Q&A sessions to get your doubts cleared by experts."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major payment methods including Credit/Debit cards, UPI (GPay, PhonePe, etc.), Net Banking, and popular digital wallets."
        },
        {
            question: "Is there a refund policy?",
            answer: "Yes, we have a clear refund policy. Please refer to our 'Refund Policy' link in the footer for detailed terms and conditions regarding cancellations and refunds."
        }
    ];

    const filteredFaq = faqData.filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleFaq = (index) => {
        setActiveFaqIndex(activeFaqIndex === index ? null : index);
    };

    const BASE_IMAGE_URL = `https://brainiacchessacademy.com/assets/images/`;

    return (
        <div className="faq_page">
            {/* Header Section */}
            <section className="faq_header">
                <div className="section_container text-center">
                    <h1 className="faq_title">Have <span className="text-c2">Questions</span>? We've Got <span className="text-c2">Answers</span></h1>
                    <p className="faq_subtitle">Everything you need to know about VeLearn platform and our programs.</p>

                    <div className="faq_search_wrapper mt-4">
                        <div className="faq_search_box">
                            <i className="bi bi-search"></i>
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="faq_content py-5">
                <div className="section_container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="faq_list">
                                {filteredFaq.length > 0 ? (
                                    filteredFaq.map((item, index) => (
                                        <div
                                            className={`faq_item mb-3 ${activeFaqIndex === index ? "active" : ""}`}
                                            key={index}
                                        >
                                            <button
                                                className={`faq_question text-start justify-content-between ${activeFaqIndex === index ? "active" : ""}`}
                                                onClick={() => toggleFaq(index)}
                                            >
                                                {item.question}

                                                <span className="icon">
                                                    <img
                                                        src={
                                                            activeFaqIndex === index
                                                                ? null
                                                                : `${BASE_IMAGE_URL}icons/faq-icon.png`
                                                        }
                                                        alt="toggle"
                                                        className="faq_toggle_icon"
                                                    />
                                                </span>
                                            </button>

                                            {activeFaqIndex === index && (
                                                <div className="faq_answer">
                                                    {item.answer}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-5">
                                        <h4>No questions matched your search.</h4>
                                        <p>Try searching for something else or contact us below.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="row mt-5">
                        <div className="col-12 text-center">
                            <div className="contact_cta_box p-5">
                                <h3>Still have more questions?</h3>
                                <p className="mb-4">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                                <NavLink to="/contact-us" className="btn_contact_faq">
                                    Contact Support <i className="bi bi-arrow-right ms-2"></i>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
