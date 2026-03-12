import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../Styles/HelpCenter.css";

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = `https://brainiacchessacademy.com/assets/images/`;

const HelpCenter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState("raise"); // "raise", "track", "history"
    const [loading, setLoading] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(false);
    const isFetchingRef = useRef(false);
    
    // Raise Ticket State
    const [formData, setFormData] = useState({
        guest_name: "",
        guest_email: "",
        guest_phone: "",
        subject: "",
        category: "General Inquiry",
        description: ""
    });

    // Track Ticket State
    const [trackNo, setTrackNo] = useState("");
    const [ticketDetails, setTicketDetails] = useState(null);

    // History State
    const [ticketHistory, setTicketHistory] = useState([]);
    const [guestTickets, setGuestTickets] = useState([]);

    useEffect(() => {
        // Load Guest Tickets from localStorage
        const storedGuestTickets = localStorage.getItem("guest_tickets");
        if (storedGuestTickets) {
            setGuestTickets(JSON.parse(storedGuestTickets));
        }

        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        
        if (user && token) {
            setIsLoggedIn(true);
            const userData = JSON.parse(user);
            setFormData(prev => ({
                ...prev,
                guest_name: userData.name || "",
                guest_email: userData.email || "",
                guest_phone: userData.phonenumber || userData.phone || ""
            }));
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 'history' && isLoggedIn) {
            fetchHistory();
        }
    }, [activeTab, isLoggedIn]);

    const fetchHistory = async () => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        
        if (!token || !user.id) {
            setTicketHistory([]);
            return;
        }

        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setHistoryLoading(true);
        try {
            const response = await axios.get(`${BASE_API_URL}tickets/history`, {
                params: { user_id: user.id },
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.status) {
                setTicketHistory(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching history:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
            }
        } finally {
            setHistoryLoading(false);
            isFetchingRef.current = false;
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRaiseTicket = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
            
            const response = await axios.post(`${BASE_API_URL}tickets/create`, formData, config);
            
            if (response.data.status) {
                const newTicket = response.data.data;
                toast.success(`Ticket Raised Successfully!`);
                
                // If Guest, save to localStorage
                if (!isLoggedIn) {
                    const currentGuestTickets = JSON.parse(localStorage.getItem("guest_tickets") || "[]");
                    const updatedGuestTickets = [newTicket, ...currentGuestTickets];
                    localStorage.setItem("guest_tickets", JSON.stringify(updatedGuestTickets));
                    setGuestTickets(updatedGuestTickets);
                }

                setFormData({
                    ...formData,
                    subject: "",
                    description: ""
                });
                setTrackNo(newTicket.ticket_no);
                setTicketDetails(newTicket);
                setActiveTab("track");
                if (isLoggedIn) fetchHistory();
            } else {
                toast.error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error raising ticket:", error);
            toast.error(error.response?.data?.message || "Failed to raise ticket. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleTrackTicket = async (e) => {
        e.preventDefault();
        if (!trackNo) {
            toast.error("Please enter a ticket number");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_API_URL}tickets/track/${trackNo}`);
            if (response.data.status) {
                const updatedTicket = response.data.data;
                setTicketDetails(updatedTicket);
                toast.success("Ticket details loaded");

                // If guest, update the stored record with fresh data (status etc)
                if (!isLoggedIn) {
                    const currentGuestTickets = JSON.parse(localStorage.getItem("guest_tickets") || "[]");
                    const updatedGuestTickets = currentGuestTickets.map(t => 
                        t.ticket_no === updatedTicket.ticket_no ? updatedTicket : t
                    );
                    localStorage.setItem("guest_tickets", JSON.stringify(updatedGuestTickets));
                    setGuestTickets(updatedGuestTickets);
                }
            } else {
                toast.error("Ticket not found");
                setTicketDetails(null);
            }
        } catch (error) {
            console.error("Error tracking ticket:", error);
            toast.error(error.response?.data?.message || "Ticket not found");
            setTicketDetails(null);
        } finally {
            setLoading(false);
        }
    };

    const getBadgeClass = (status) => {
        if (!status) return "";
        const s = status.toLowerCase();
        if (s === 'open') return 'badge_open';
        if (s === 'pending') return 'badge_pending';
        if (s === 'resolved') return 'badge_resolved';
        if (s === 'closed') return 'badge_closed';
        return '';
    };

    const displayTickets = isLoggedIn ? ticketHistory : guestTickets;

    return (
        <div className="help_center_page">
            <section className="help_banner">
                <div className="section_container">
                    <div className="help_banner_content text-center animate_fade_up">
                        <h1 className="text-white">Help <span className="text-c2">Center</span></h1>
                        <p className="text-white opacity-75">
                            Our team is here to help you. Raise a new support ticket or track your existing request status in real-time.
                        </p>
                    </div>
                </div>
            </section>

            <div className="help_tab_container text-center animate_fade_up">
                <div className="help_tabs">
                    <button 
                        className={`help_tab_btn ${activeTab === 'raise' ? 'active' : ''}`}
                        onClick={() => setActiveTab('raise')}
                    >
                        <i className="bi bi-plus-circle me-2"></i> Raise a Ticket
                    </button>
                    {(isLoggedIn || guestTickets.length > 0) && (
                        <button 
                            className={`help_tab_btn ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => setActiveTab('history')}
                        >
                            <i className="bi bi-clock-history me-2"></i> My Tickets
                        </button>
                    )}
                    <button 
                        className={`help_tab_btn ${activeTab === 'track' ? 'active' : ''}`}
                        onClick={() => setActiveTab('track')}
                    >
                        <i className="bi bi-search me-2"></i> Track Ticket
                    </button>
                </div>
            </div>

            <section className="help_content_section py-5">
                <div className="section_container py-3">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            
                            {activeTab === "raise" && (
                                <div className="help_card animate_fade_up">
                                    <h3 className="help_card_title">
                                        <i className="bi bi-envelope-paper-fill"></i> New Support Request
                                    </h3>
                                    <form onSubmit={handleRaiseTicket}>
                                        <div className="row">
                                            {!isLoggedIn && (
                                                <>
                                                    <div className="col-md-6 help_form_group">
                                                        <label>Full Name</label>
                                                        <input 
                                                            type="text" 
                                                            className="help_input" 
                                                            name="guest_name" 
                                                            value={formData.guest_name} 
                                                            onChange={handleChange} 
                                                            required 
                                                            placeholder="e.g. John Doe"
                                                        />
                                                    </div>
                                                    <div className="col-md-6 help_form_group">
                                                        <label>Email Address</label>
                                                        <input 
                                                            type="email" 
                                                            className="help_input" 
                                                            name="guest_email" 
                                                            value={formData.guest_email} 
                                                            onChange={handleChange} 
                                                            required 
                                                            placeholder="e.g. john@example.com"
                                                        />
                                                    </div>
                                                    <div className="col-12 help_form_group">
                                                        <label>Phone (Optional)</label>
                                                        <input 
                                                            type="text" 
                                                            className="help_input" 
                                                            name="guest_phone" 
                                                            value={formData.guest_phone} 
                                                            onChange={handleChange} 
                                                            placeholder="+91 00000 00000"
                                                        />
                                                    </div>
                                                </>
                                            )}
                                            
                                            <div className="col-md-6 help_form_group">
                                                <label>Category</label>
                                                <select 
                                                    className="help_select" 
                                                    name="category" 
                                                    value={formData.category} 
                                                    onChange={handleChange}
                                                >
                                                    <option value="General Inquiry">General Inquiry</option>
                                                    <option value="Technical Issue">Technical Issue</option>
                                                    <option value="Billing">Billing / Payment</option>
                                                    <option value="Course Access">Course Access</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 help_form_group">
                                                <label>Subject</label>
                                                <input 
                                                    type="text" 
                                                    className="help_input" 
                                                    name="subject" 
                                                    value={formData.subject} 
                                                    onChange={handleChange} 
                                                    required 
                                                    placeholder="Short summary of issue"
                                                />
                                            </div>
                                            <div className="col-12 help_form_group">
                                                <label>Tell us more about your issue</label>
                                                <textarea 
                                                    className="help_textarea" 
                                                    name="description" 
                                                    rows="5" 
                                                    value={formData.description} 
                                                    onChange={handleChange} 
                                                    required 
                                                    placeholder="Please provide as much detail as possible..."
                                                ></textarea>
                                            </div>
                                        </div>
                                        <button 
                                            type="submit" 
                                            className="help_submit_btn"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <><span className="spinner-border spinner-border-sm me-2"></span> Submitting...</>
                                            ) : "Submit Ticket"}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {activeTab === "history" && (
                                <div className="help_card animate_fade_up">
                                    <h3 className="help_card_title">
                                        <i className="bi bi-clock-history"></i> My Previous Tickets
                                    </h3>
                                    {historyLoading ? (
                                        <div className="text-center py-5">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="mt-2 text-muted">Fetching your tickets...</p>
                                        </div>
                                    ) : displayTickets.length > 0 ? (
                                        <div className="ticket_history_list">
                                            {displayTickets.map((ticket, index) => (
                                                <div 
                                                    key={ticket.id || index} 
                                                    className="history_item border-bottom py-3 d-flex justify-content-between align-items-center cursor-pointer"
                                                    onClick={() => {
                                                        setTrackNo(ticket.ticket_no);
                                                        setTicketDetails(ticket);
                                                        setActiveTab("track");
                                                    }}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <div>
                                                        <span className={`badge ${getBadgeClass(ticket.status)} mb-2`} style={{ fontSize: '10px' }}>
                                                            {(ticket.status || 'open').toUpperCase()}
                                                        </span>
                                                        <h6 className="fw-bold mb-1">{ticket.subject}</h6>
                                                        <small className="text-muted d-block">{ticket.ticket_no} • {new Date(ticket.created_at).toLocaleDateString()}</small>
                                                    </div>
                                                    <div className="text-end">
                                                        <i className="bi bi-chevron-right text-muted"></i>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-5">
                                            <i className="bi bi-chat-left-dots text-muted" style={{ fontSize: '3rem' }}></i>
                                            <p className="mt-3 text-muted">You haven't raised any tickets yet.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "track" && (
                                <div className="help_card animate_fade_up">
                                    <h3 className="help_card_title">
                                        <i className="bi bi-clipboard-check-fill"></i> Check Ticket Status
                                    </h3>
                                    <form onSubmit={handleTrackTicket} className="mb-4">
                                        <div className="help_form_group mb-0">
                                            <div className="d-flex gap-2 align-items-end">
                                                <div className="flex-grow-1">
                                                    <label>Enter Ticket Number</label>
                                                    <input 
                                                        type="text" 
                                                        className="help_input" 
                                                        placeholder="e.g. TK-65D4B..." 
                                                        value={trackNo}
                                                        onChange={(e) => setTrackNo(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <button className="help_submit_btn mt-0" style={{ width: '140px', padding: '14px' }} type="submit" disabled={loading}>
                                                    {loading ? "..." : "Track"}
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    {ticketDetails && (
                                        <div className="ticket_status_card animate_fade_up">
                                            <div className="ticket_info_row">
                                                <div>
                                                    <span className={`ticket_badge ${getBadgeClass(ticketDetails.status)}`}>
                                                        {ticketDetails.status}
                                                    </span>
                                                    <h4 className="fw-bold mt-2 mb-0">{ticketDetails.subject}</h4>
                                                    <small className="text-muted">Ticket ID: {ticketDetails.ticket_no}</small>
                                                </div>
                                                <div className="text-end">
                                                    <small className="text-muted d-block">Created on</small>
                                                    <span className="fw-bold">{new Date(ticketDetails.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="mb-4">
                                                <p className="mb-0 text-muted small fw-bold text-uppercase">Description</p>
                                                <p className="mt-1">{ticketDetails.description}</p>
                                            </div>

                                            {ticketDetails.resolution ? (
                                                <div className="ticket_response_box animate_fade_up">
                                                    <p className="mb-0 fw-600">{ticketDetails.resolution}</p>
                                                    {ticketDetails.resolved_at && (
                                                        <small className="text-muted d-block mt-2">
                                                            Replied on: {new Date(ticketDetails.resolved_at).toLocaleString()}
                                                        </small>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="alert alert-warning border-0 rounded-4 mb-0 small">
                                                    <i className="bi bi-info-circle-fill me-2"></i> Our team is working on your request. You will see our reply here shortly.
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HelpCenter;

