import { Component } from "react";
import "../Styles/ReferEarn.css";

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = `https://brainiacchessacademy.com/assets/images/`;
const BASE_DYNAMIC_IMAGE_URL = "https://velearn.in/public/uploads/";

class ReferAndEarn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFaqIndex: 0,
        };
    }

    faqData = [
        {
            question: "Who should enroll in this UI/UX Design course?",
            answer: (
                <>
                    <p>
                        This UI/UX Design course is ideal for students, fresh graduates, working professionals, developers, graphic designers, and career switchers who want to build a strong foundation in user interface (UI) and user experience (UX) design. No prior design experience is required, making it beginner-friendly and career-oriented.
                    </p>
                </>
            )
        },
        {
            question: "Will I get hands-on experience during the course?",
            answer: (
                <>
                    <p>No. You do not need any prior coding experience to join this course.</p>
                    <p>
                        Our training starts from the basics and gradually moves toward advanced concepts.
                        Beginners, students, and non-IT professionals can easily learn.
                    </p>
                    <p>
                        For those who already have some coding knowledge, we provide fast-track options,
                        challenging tasks, and advanced modules to match your skill level.
                    </p>
                </>
            )
        },
        {
            question: "What career support do you offer after the UI/UX course?",
            answer: (
                <>
                    <p>
                        You will work on real-time, industry-relevant projects based on the specific course
                        you choose. These projects help you build strong practical skills and a job-ready portfolio.
                    </p>
                    <p>Example project types include:</p>
                    <ul>
                        <li>Web and mobile application development</li>
                        <li>API & backend systems</li>
                        <li>Data visualization dashboards</li>
                        <li>Machine learning mini-projects</li>
                        <li>Cloud deployment & automation tasks</li>
                    </ul>
                    <p>
                        At the end of the course, you will also complete a capstone project to showcase your skills.
                    </p>
                </>
            )
        },
        {
            question: "Is this UI/UX course suitable for non-design backgrounds?",
            answer: (
                <>
                    <p>Yes. This course is designed to make you job-ready through:</p>
                    <ul>
                        <li>Practical training & real-world projects</li>
                        <li>Portfolio and resume development</li>
                        <li>Interview preparation & mock interviews</li>
                        <li>Placement support & company referrals</li>
                    </ul>
                    <p>
                        Many students start as interns, junior developers, analysts, or IT support roles depending
                        on their course. Our placement team helps you throughout the job application process.
                    </p>
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
                <section className="referBanner">
                    <div className="section_container">
                        <div>
                            <h1 className="d-flex flex-column gap-4">
                                <span className="text-black">Friends -Ah Invite pannu...</span>
                                <span className="text-black">Rewards - ah Collect Pannu!</span>
                            </h1>
                            <p className="text-black mt-2">The More you Refer, The More You Earn</p>
                            <button className="mt-4">Refer Now</button>
                        </div>
                        {/* <div className="re_right_banner"></div> */}
                    </div>
                </section>
                <section className="refer_bottom_content py-5">
                    <div className="section_container">
                        <div className="row justify-content-center">
                            <div className="col-lg-9">
                                <h3 className="fw-bold text-white text-center">
                                    Invite your friends to join and learn.
                                    <span className="text-c2"> Every successful referral earns </span>
                                    you rewards and benefits.
                                </h3>
                                <div className="col-12 d-flex justify-content-center my-5">
                                    <button className="refer_butt">Login to refer</button>
                                </div>
                                <h3 className="fw-bold text-white text-center">
                                    <span className="text-c2"> Refer Friends </span> and
                                    <span className="text-c2"> Earn Rewards </span>
                                    in 4 Simple Steps
                                </h3>
                                <div className="row justify-content-center mt-4">
                                    <div className="col-lg-10">
                                        <div className="row justify-content-between">
                                            <div className="col-lg-6 my-3">
                                                <div className="refer_steps">
                                                    <div className="row">
                                                        <div className="col-1">
                                                            <div className="refer_count_steps">1</div>
                                                        </div>
                                                        <div className="col-11">
                                                            <div className="px-2">
                                                                <h5 className="text-white fw-bold">Refer Friends and Earn Rewards in 4 Simple Steps</h5>
                                                                <p className="text-white mb-0">
                                                                    Sign in and generate your unique referral code from your account.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 my-3">
                                                <div className="refer_steps">
                                                    <div className="row">
                                                        <div className="col-1">
                                                            <div className="refer_count_steps">2</div>
                                                        </div>
                                                        <div className="col-11">
                                                            <div className="px-2">
                                                                <h5 className="text-white fw-bold">Share With Friends</h5>
                                                                <p className="text-white mb-0">
                                                                    Send your referral code or referral link to your friends through WhatsApp, social media, or email.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 my-3">
                                                <div className="refer_steps">
                                                    <div className="row justify-content-between">
                                                        <div className="col-lg-6">
                                                            <div className="row">
                                                                <div className="col-1">
                                                                    <div className="refer_count_steps">3</div>
                                                                </div>
                                                                <div className="col-11">
                                                                    <div className="px-2">
                                                                        <h5 className="text-white fw-bold">Join & Learn</h5>
                                                                        <p className="text-white mb-0">
                                                                            Send your referral code or referral link to your friends through WhatsApp, social media, or email.
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="row">
                                                                <div className="col-1">
                                                                    <div className="refer_count_steps">4</div>
                                                                </div>
                                                                <div className="col-11">
                                                                    <div className="px-2">
                                                                        <h5 className="text-white fw-bold">Earn Rewards</h5>
                                                                        <p className="text-white mb-0">
                                                                            Once the referral is successful, the reward will be added to your account. These four steps are simple and easy for users to understand on a Refer & Earn page.
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 d-flex justify-content-center my-3">
                                    <button className="refer_butt">View Rules</button>
                                </div>

                                <div className="refer_benefits">
                                    <h3 className="fw-bold text-white text-center my-4">Enjoy <span className="text-c2"> Benefits Together</span></h3>
                                    <div className="row">
                                        <div className="col-lg-6 my-3">
                                            <div className="refer_benefits_child px-lg-3">
                                                <h5 className="mb-4">Benefits for Referrer</h5>
                                                <div className="refer_benefits_child_one">
                                                    <p>Earn ₹1000 Reward Get a reward of ₹1000 when your friend successfully enrolls in a course using your referral code.</p>
                                                </div>
                                                <div className="refer_benefits_child_two">
                                                    <p>Extra Earnings Opportunities Refer more friends and earn rewards for every successful referral.</p>
                                                </div>
                                                <div className="refer_benefits_child_three">
                                                    <p>Easy to Share Simply share your referral code with friends through social media, WhatsApp, or email.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 my-3">
                                            <div className="refer_benefits_child px-lg-3">
                                                <h5 className="mb-4">Benefits for Referrer</h5>
                                                <div className="refer_benefits_child_one">
                                                    <p>10% Course Discount Your friend gets an instant 10% discount on the course when using your referral code.</p>
                                                </div>
                                                <div className="refer_benefits_child_two">
                                                    <p>Access to Quality Learning They can join courses and start learning valuable skills.</p>
                                                </div>
                                                <div className="refer_benefits_child_three">
                                                    <p>Save Money While Learning Enjoy learning new courses while paying less with the referral discount.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="faq_section pt-5">
                                    <h3 className="text-center fw-bold text-white pb-3">
                                        Frequently Asked <span className="text-c2"> Questions</span>
                                    </h3>
                                    <div className="row mt-2 justify-content-center align-items-center">
                                        {/* FAQ Accordion */}
                                        <div className="col-lg-12 text-start">
                                            {this.faqData.map((item, index) => (
                                                <div className={`faq_item rounded-3 mb-3  ${this.state.activeFaqIndex === index ? "active" : ""
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
                                                        <div className="faq_answer text-white">
                                                            {item.answer}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default ReferAndEarn;