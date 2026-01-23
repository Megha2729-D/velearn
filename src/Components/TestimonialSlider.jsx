import React, { Component } from "react";

class TestimonialSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: this.props.testimonials.length,
        };

        this.autoInterval = null;
    }

    componentDidMount() {
        this.startAutoSlide();
    }

    componentWillUnmount() {
        clearInterval(this.autoInterval);
    }

    startAutoSlide = () => {
        this.autoInterval = setInterval(() => {
            this.next();
        }, 2500);
    };

    next = () => {
        this.setState(
            (prev) => ({ currentIndex: prev.currentIndex + 1 }),
            () => {
                const { testimonials } = this.props;
                const repeated = this.getRepeated();

                if (this.state.currentIndex >= repeated.length - testimonials.length) {
                    setTimeout(() => {
                        this.setState({ currentIndex: testimonials.length });
                    }, 300);
                }
            }
        );
    };

    prev = () => {
        this.setState(
            (prev) => ({ currentIndex: prev.currentIndex - 1 }),
            () => {
                const { testimonials } = this.props;
                const repeated = this.getRepeated();

                if (this.state.currentIndex <= testimonials.length - 1) {
                    setTimeout(() => {
                        this.setState({
                            currentIndex: repeated.length - testimonials.length * 2,
                        });
                    }, 300);
                }
            }
        );
    };

    getRepeated = () => {
        const { testimonials } = this.props;
        return [...testimonials, ...testimonials, ...testimonials];
    };

    render() {
        const { currentIndex } = this.state;
        const repeated = this.getRepeated();

        return (
            <div className="testimonial-slider">
                <button className="nav-btn left" onClick={this.prev}>‹</button>

                <div className="slider-track-wrapper">
                    <div
                        className="slider-track"
                        style={{
                            transform: `translateX(-${currentIndex * 300}px)`,
                            transition: "transform 0.4s ease",
                        }}
                    >
                        {repeated.map((item, i) => {
                            const isCenter = i === currentIndex;
                            return (
                                <div
                                    key={i}
                                    className={`slide-item ${isCenter ? "active" : ""}`}
                                    style={{
                                        background: `linear-gradient(135deg, ${item.color1}, ${item.color2})`,
                                    }}
                                >
                                    <img src={item.img} alt={item.name} className="slide-img" />
                                    {isCenter && (
                                        <div className="slide-content">
                                            <p>{item.text}</p>
                                            <span className="person-name">{item.name}</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button className="nav-btn right" onClick={this.next}>›</button>
            </div>
        );
    }
}

export default TestimonialSlider;
