import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../Styles/Webinar.css"

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = `https://brainiacchessacademy.com/assets/images/`;
const BASE_DYNAMIC_IMAGE_URL = "https://velearn.in/public/uploads/";

class Webinar extends Component {

    state = {
        activeCategory: "Full Stack Development",
        visibleCount: 8,
        selectedWebinar: null,
        showRegisterModal: false,
        showSuccessModal: false,
        registeredWebinars: [],
        isClosing: false,
        webinars: [],
        loading: true,

        formData: {
            name: "",
            email: "",
            phone: "",
        },
        auth_id: null,
        loadingSubmit: false,
        
        // Subscription form state
        subscribeName: "",
        subscribeEmail: "",
        subscribePhone: "",
        isSubscribed: false,
        loadingSubscribe: false,

        categories: [
            "Full Stack Development",
            "Data Science",
            "UI/UX Design",
            "Digital Marketing",
            "AI/ML"
        ]
    };
    componentDidMount() {
        this.fetchWebinars();
        // Pre-fill form with logged-in user details
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const token = localStorage.getItem('token') || localStorage.getItem('authToken');
            if (token && user) {
                const authId = user.id || user.auth_id;
                this.setState({
                    auth_id: authId,
                    formData: {
                        name:  user.name  || user.user_name     || "",
                        email: user.email || user.email_id      || "",
                        phone: user.phonenumber || user.phone || user.phone_number  || "",
                    }
                });
                // Fetch registered webinars for this user
                this.fetchMyWebinars(authId);
            }
        } catch (e) {}
    }

    fetchMyWebinars = async (authId) => {
        try {
            const response = await fetch(`${BASE_API_URL}my-webinars/${authId}`);
            const data = await response.json();
            if (data.status) {
                this.setState({
                    registeredWebinars: data.data.map(w => w.id)
                });
            }
        } catch (error) {
            console.error("Error fetching my webinars:", error);
        }
    };

    fetchWebinars = async () => {
        try {
            const response = await fetch("https://www.velearn.in/api/webinars");
            const data = await response.json();

            if (data.status) {
                this.setState({
                    webinars: data.data,
                    loading: false
                });
            }
        } catch (error) {
            console.error("Error fetching webinars:", error);
            this.setState({ loading: false });
        }
    };
    handleBackdropClick = (e) => {
        // Close only if clicking on backdrop, not modal-content
        if (e.target.classList.contains("register_webinar_modal")) {
            this.closeRegisterModal();
        }
    };
    // Open Register Modal
    openRegisterModal = (webinar) => {
        this.setState({
            selectedWebinar: webinar,
            showRegisterModal: true,
        });
    };

    // Close Register Modal
    closeRegisterModal = () => {
        // this.setState({
        //     showRegisterModal: false,
        // });

        this.setState({ isClosing: true });

        setTimeout(() => {
            this.setState({
                showRegisterModal: false,
                isClosing: false
            });
        }, 400);
    };

    // Handle Input Change
    handleChange = (e) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [e.target.name]: e.target.value,
            },
        });
    };

    // Submit Form
    handleSubmit = async (e) => {
        e.preventDefault();

        const { formData, selectedWebinar, auth_id } = this.state;
        this.setState({ loadingSubmit: true });

        try {
            const response = await fetch(`${BASE_API_URL}webinar-register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    webinar_id: selectedWebinar.id,
                    auth_id: auth_id, // optional
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone
                }),
            });

            const data = await response.json();

            if (data.status) {
                this.setState({
                    showRegisterModal: false,
                    showSuccessModal: true,
                    formData: { name: "", email: "", phone: "" },
                    loadingSubmit: false,
                    registeredWebinars: [...this.state.registeredWebinars, selectedWebinar.id]
                });
            } else {
                alert(data.message || "Registration failed. Please try again.");
                this.setState({ loadingSubmit: false });
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Something went wrong. Please try again later.");
            this.setState({ loadingSubmit: false });
        }
    };
    handleSubscribeChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubscribeSubmit = async (e) => {
        e.preventDefault();
        const { subscribeName, subscribeEmail, subscribePhone } = this.state;

        if (!subscribeName || !subscribeEmail || !subscribePhone) {
            toast.error("Please fill in all fields");
            return;
        }

        this.setState({ loadingSubscribe: true });

        try {
            let recaptcha_token = "";
            if (window.grecaptcha) {
                recaptcha_token = await new Promise((resolve) => {
                    window.grecaptcha.ready(() => {
                        window.grecaptcha.execute('6LcbtYYsAAAAAJW-RyO1ZLIWHZ-RyWS6H3gAGgCj', { action: 'webinar_subscribe' }).then(resolve);
                    });
                });
            }

            const response = await axios.post(`${BASE_API_URL}contacts/send-mail`, {
                name: subscribeName,
                phone_number: subscribePhone,
                email_id: subscribeEmail,
                course: "Webinar Subscription",
                message: "I want to subscribe for upcoming webinar updates.",
                country_code: "+91",
                recaptcha_token
            });

            if (response.data.status || response.data.id) {
                toast.success("Subscribed successfully! We will notify you about upcoming webinars.");
                this.setState({
                    subscribeName: "",
                    subscribeEmail: "",
                    subscribePhone: "",
                    isSubscribed: true
                });
            } else {
                toast.error(response.data.message || "Failed to subscribe");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
            console.error("Webinar subscribe error:", error);
        } finally {
            this.setState({ loadingSubscribe: false });
        }
    };

    // Close Success Modal
    closeSuccessModal = () => {
        this.setState({
            showSuccessModal: false,
        });

        this.setState({ isClosing: true });

        setTimeout(() => {
            this.setState({
                showSuccessModal: false,
                isClosing: false
            });
        }, 400);
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
    componentDidUpdate(prevProps, prevState) {
        const anyModalOpen =
            this.state.showRegisterModal || this.state.showSuccessModal;

        const wasAnyModalOpen =
            prevState.showRegisterModal || prevState.showSuccessModal;

        if (!wasAnyModalOpen && anyModalOpen) {
            this.disablePageScroll();
        }

        if (wasAnyModalOpen && !anyModalOpen) {
            this.enablePageScroll();
        }
    }

    disablePageScroll = () => {
        document.body.classList.add("modal-open-custom");
        document.documentElement.classList.add("modal-open-custom");
    };

    enablePageScroll = () => {
        document.body.classList.remove("modal-open-custom");
        document.documentElement.classList.remove("modal-open-custom");
    };

    formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            weekday: "short"
        });
    };

    formatTime = (time) => {
        const [h, m] = time.split(":");
        const date = new Date();
        date.setHours(h);
        date.setMinutes(m);

        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    render() {
        const {
            categories,
            webinars,
            activeCategory,
            selectedWebinar,
            showRegisterModal,
            showSuccessModal,
            formData,
        } = this.state;
        const filteredWebinars = webinars.filter(
            w => w.category === activeCategory
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
                                    <img src={`${BASE_IMAGE_URL}webinar/webinar-bannner-end.png`} className="w-100" alt="" />
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

                                        {filteredWebinars.map((webinar, index) => {

                                            const isPreviewRow = index >= 8;
                                            return (
                                                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 d-flex" key={webinar.id}>
                                                    <div className="webinar_card mt-3 mb-5 d-flex flex-column justify-content-center align-items-center">
                                                        <img
                                                            src={`${BASE_DYNAMIC_IMAGE_URL}webinars/${webinar.image}`}
                                                            alt={webinar.title}
                                                            className="webinar_img"
                                                        />
                                                        <div className="webinar_card_body d-flex flex-column">
                                                            <div className="px-3">
                                                                <h5 className="mt-3 mb-2 webinar_title_truncated">{webinar.title}</h5>
                                                                <div className="d-flex flex-column align-items-start gap-1 pb-4 ps-1">
                                                                    <div className="webinar_info_row">
                                                                        <i className="bi bi-calendar-week-fill"></i>
                                                                        <span>{this.formatDate(webinar.date)}</span>
                                                                    </div>
                                                                    <div className="webinar_info_row">
                                                                        <i className="bi bi-clock-fill"></i>
                                                                        <span>{this.formatTime(webinar.from_time)} - {this.formatTime(webinar.to_time)}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-auto">
                                                                {this.state.registeredWebinars.includes(webinar.id) ? (
                                                                    <button
                                                                        className="register_btn registered_btn w-100"
                                                                        disabled
                                                                    >
                                                                        Already Registered
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        className="register_btn w-100"
                                                                        onClick={() => this.openRegisterModal(webinar)}
                                                                    >
                                                                        Register now
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        {/* ================= REGISTER MODAL ================= */}
                                        {showRegisterModal && (
                                            <div className="modal fade m-0 show d-block register_webinar_modal" onClick={this.handleBackdropClick}>
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className={`modal-content ${this.state.isClosing ? "modal-slide-up" : "modal-slide-down"}`} onClick={(e) => e.stopPropagation()}>

                                                        {/* Premium gradient header strip */}
                                                        <div className="wbr_modal_header">
                                                            <div className="wbr_header_left">
                                                                <div className="wbr_modal_icon">
                                                                    <i className="bi bi-camera-video-fill"></i>
                                                                </div>
                                                                <div className="wbr_header_text">
                                                                    <span className="wbr_header_label">Register for</span>
                                                                    <span className="wbr_header_title">{selectedWebinar?.title}</span>
                                                                </div>
                                                            </div>
                                                            <button className="wbr_close_btn" type="button" onClick={this.closeRegisterModal}>
                                                                <i className="bi bi-x-lg"></i>
                                                            </button>
                                                        </div>

                                                        {/* Modal Body */}
                                                        <div className="wbr_modal_body">
                                                            <form onSubmit={this.handleSubmit}>
                                                                <div className="wbr_input_group">
                                                                    <span className="wbr_input_icon"><i className="bi bi-person"></i></span>
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        className="wbr_input"
                                                                        placeholder="Full Name"
                                                                        value={formData.name}
                                                                        onChange={this.handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="wbr_input_group">
                                                                    <span className="wbr_input_icon"><i className="bi bi-envelope"></i></span>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        className="wbr_input"
                                                                        placeholder="Email Address"
                                                                        value={formData.email}
                                                                        onChange={this.handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="wbr_input_group">
                                                                    <span className="wbr_input_icon"><i className="bi bi-telephone"></i></span>
                                                                    <input
                                                                        type="tel"
                                                                        name="phone"
                                                                        className="wbr_input"
                                                                        placeholder="Phone Number"
                                                                        value={formData.phone}
                                                                        onChange={this.handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                                    <button type="submit" className="wbr_submit_btn" disabled={this.state.loadingSubmit}>
                                                                    {this.state.loadingSubmit ? (
                                                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                                                    ) : (
                                                                        <i className="bi bi-check2-circle me-2"></i>
                                                                    )} 
                                                                    {this.state.loadingSubmit ? "Processing..." : "Confirm Registration"}
                                                                </button>
                                                            </form>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* ================= SUCCESS MODAL ================= */}
                                        {/* ================= SUCCESS MODAL ================= */}
                                        {showSuccessModal && (
                                            <div
                                                className="success_modal_overlay"
                                                onClick={this.closeSuccessModal}
                                            >
                                                <div
                                                    className="modalbox success animate"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <div className="icon">
                                                        <span>✓</span>
                                                    </div>

                                                    <h1>Success!</h1>

                                                    <p>
                                                        You've successfully registered for <br />
                                                        <strong>{selectedWebinar?.title}</strong>
                                                    </p>

                                                    <button
                                                        type="button"
                                                        className="redo btn"
                                                        onClick={this.closeSuccessModal}
                                                    >
                                                        OK
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Overlay Background */}
                                        {/* {(showRegisterModal || showSuccessModal) && (
                                            <div
                                                className="modal-backdrop fade show"
                                                onClick={this.closeRegisterModal}
                                            ></div>
                                        )} */}
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
                                        <form onSubmit={this.handleSubscribeSubmit}>
                                            <div className="my-4">
                                                <input 
                                                    type="text" 
                                                    name="subscribeName" 
                                                    id="subscribeName" 
                                                    placeholder="Your Name" 
                                                    value={this.state.subscribeName} 
                                                    onChange={this.handleSubscribeChange} 
                                                    required 
                                                />
                                            </div>
                                            <div className="my-4">
                                                <input 
                                                    type="email" 
                                                    name="subscribeEmail" 
                                                    id="subscribeEmail" 
                                                    placeholder="E-mail ID" 
                                                    value={this.state.subscribeEmail} 
                                                    onChange={this.handleSubscribeChange} 
                                                    required 
                                                 />
                                            </div>
                                            <div className="my-4">
                                                <input 
                                                    type="number" 
                                                    name="subscribePhone" 
                                                    id="subscribePhone" 
                                                    placeholder="Phone no" 
                                                    value={this.state.subscribePhone} 
                                                    onChange={this.handleSubscribeChange} 
                                                    required 
                                                />
                                            </div>
                                            <div className="col-12 d-flex justify-content-center">
                                                <button type="submit" disabled={this.state.loadingSubscribe}>
                                                    {this.state.loadingSubscribe ? "Subscribing..." : "Submit"}
                                                </button>
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
                                <div className="col-xl-2 col-lg-4 col-md-4 col-6 my-2  webinar_highlights_inner">
                                    <div className="webinar_highlights_sub">
                                        <div className="px-3 d-flex justify-content-center align-items-center">
                                            <img src={`${BASE_IMAGE_URL}webinar/key-highlights/highlights-1.png`} alt="" />
                                        </div>
                                        <p className="mb-0 text-black">Learn proven techniques to manage your time effectively</p>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-4 col-md-4 col-6 my-2  webinar_highlights_inner">
                                    <div className="webinar_highlights_sub">
                                        <div className="px-3 d-flex justify-content-center align-items-center">
                                            <img src={`${BASE_IMAGE_URL}webinar/key-highlights/highlights-2.png`} alt="" />
                                        </div>
                                        <p className="mb-0 text-black">Discover tools to boost focus and efficiency</p>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-4 col-md-4 col-6 my-2  webinar_highlights_inner">
                                    <div className="webinar_highlights_sub">
                                        <div className="px-3 d-flex justify-content-center align-items-center">
                                            <img src={`${BASE_IMAGE_URL}webinar/key-highlights/highlights-3.png`} alt="" />
                                        </div>
                                        <p className="mb-0 text-black">Strategies to overcome common productivity challenges</p>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-4 col-md-4 col-6 my-2  webinar_highlights_inner">
                                    <div className="webinar_highlights_sub">
                                        <div className="px-3 d-flex justify-content-center align-items-center">
                                            <img src={`${BASE_IMAGE_URL}webinar/key-highlights/highlights-4.png`} alt="" />
                                        </div>
                                        <p className="mb-0 text-black">Live Q&A with productivity experts</p>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-4 col-md-4 col-6 my-2  webinar_highlights_inner">
                                    <div className="webinar_highlights_sub">
                                        <div className="px-3 d-flex justify-content-center align-items-center">
                                            <img src={`${BASE_IMAGE_URL}webinar/key-highlights/highlights-5.png`} alt="" />
                                        </div>
                                        <p className="mb-0 text-black">Practical techniques you can start using right away</p>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-4 col-md-4 col-6 my-2  webinar_highlights_inner">
                                    <div className="webinar_highlights_sub">
                                        <div className="px-3 d-flex justify-content-center align-items-center">
                                            <img src={`${BASE_IMAGE_URL}webinar/key-highlights/highlights-6.png`} alt="" />
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
                                    <Link to="/contact-us"> <button>Register now <i className="bi bi-arrow-right ps-2"></i></button></Link>
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
