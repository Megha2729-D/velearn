import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import "../Styles/Blog.css";

const BASE_API_URL = "https://www.velearn.in/api/";
const BASE_IMAGE_URL = `https://brainiacchessacademy.com/assets/images/`;
const BASE_DYNAMIC_IMAGE_URL = "https://velearn.in/public/uploads/";

class BlogDetailsClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: null,
            latestBlogs: [],
            allBlogs: [],
            visibleCount: 3,
            showFullContent: false,
            searchQuery: "",
            searchResults: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        const { id } = this.props;

        // Fetch single blog
        fetch(`${BASE_API_URL}blog/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    this.setState({ blog: data.data, loading: false });
                } else {
                    this.setState({ error: "Blog not found", loading: false });
                }
            })
            .catch(() => {
                this.setState({ error: "Something went wrong", loading: false });
            });

        // Fetch all blogs
        fetch(`${BASE_API_URL}blogs`)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    const filteredBlogs = data.data.filter(
                        item => item.id !== parseInt(id)
                    );

                    this.setState({
                        latestBlogs: data.data.slice(0, 3),
                        allBlogs: filteredBlogs
                    });
                }
            });
    }

    toggleContent = () => {
        this.setState(prevState => ({
            showFullContent: !prevState.showFullContent
        }));
    };
    handleSearch = (e) => {
        const query = e.target.value.toLowerCase();

        const results = this.state.allBlogs.filter(blog =>
            blog.title.toLowerCase().includes(query)
        );

        this.setState({
            searchQuery: query,
            searchResults: query ? results : []
        });
    };
    handleShowMore = () => {
        this.setState(prevState => ({
            visibleCount: prevState.visibleCount + 3
        }));
    };
    render() {
        const { blog, latestBlogs, loading, error } = this.state;

        if (loading) {
            return <div className="text-center py-5">Loading blog...</div>;
        }

        if (error) {
            return <div className="text-center text-danger py-5">{error}</div>;
        }

        if (!blog) {
            return <div className="text-center py-5">No blog found</div>;
        }

        return (
            <>
                <section className="blog_banner py-3 py-lg-0">
                    <div className="section_container">
                        <div className="row">
                            <div className="col-lg-8 d-flex align-items-center">
                                <h1 className="text-white fw-bold"> {blog.title}</h1>
                            </div>
                            <div className="col-lg-4">
                                <div className="px-lg-5 py-3">
                                    <img src={`${BASE_IMAGE_URL}blogs/blog-banner-right.png`} className="w-100" alt="" />
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
                                    <img
                                        src={`https://www.velearn.in/public${blog.image_url.replace("/../public", "")}`}
                                        className="w-100"
                                        alt={blog.title}
                                    />
                                    <div className="d-flex gap-4 pt-3 ps-lg-4">
                                        <div className="text-muted small">
                                            <i class="bi bi-calendar2-minus"></i>
                                            <span className="ps-1">
                                                {new Date(blog.published_date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric"
                                                })}
                                            </span>
                                        </div>
                                        <div className="text-muted small">
                                            <i class="bi bi-eye"></i>
                                            <span className="ps-1">132 views</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="h3 mt-5 fw-bold text-black">{blog.title}</h1>
                                        {(this.state.showFullContent
                                            ? blog.descriptions
                                            : blog.descriptions.slice(0, 2)   // show only first 2 paragraphs
                                        ).map((item) => (
                                            <p key={item.id}>
                                                {item.description}
                                            </p>
                                        ))}
                                        {blog.descriptions.length > 2 && (
                                            <div className="col-12 d-flex justify-content-center">
                                                <div
                                                    className="blog_more_butt d-flex align-items-center justify-content-center"
                                                    onClick={this.toggleContent}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <span>
                                                        {this.state.showFullContent ? "Show Less" : "Show More"}
                                                    </span>
                                                    <div>
                                                        <i className={`bi ${this.state.showFullContent ? "bi-arrow-up-short" : "bi-arrow-right-short"}`}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 blog_right_part mt-5 mt-lg-0">
                                <div className="ps-lg-5">
                                    <div className="blog_main_search">
                                        <input
                                            type="search"
                                            name="blog_search"
                                            id="blog_search"
                                            placeholder="Search..."
                                            onChange={this.handleSearch}
                                        />
                                        <div><i className="bi bi-search"></i></div>
                                    </div>
                                    {this.state.searchResults.length > 0 && (
                                        <div className="position-relative">
                                            <div className="blog_search_results_box">
                                                {this.state.searchResults.map(item => (
                                                    <Link
                                                        to={`/blog-details/${item.id}`}
                                                        key={item.id}
                                                        className="blog_search_result_item"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
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
                                            {latestBlogs.map((item) => (
                                                <div key={item.id} className="my-3">
                                                    <Link to={`/blog-details/${item.id}`}>
                                                        <div className="d-flex pe-lg-5 gap-3 latest_blog__child">
                                                            <div className="">
                                                                <img src={`https://www.velearn.in/public${item.image_url.replace("/../public", "")}`} className="" alt="" />
                                                            </div>
                                                            <div className="">
                                                                <div className="small text-muted"><i class="bi bi-calendar2-minus pe-1"></i>
                                                                    <span>
                                                                        {new Date(blog.published_date).toLocaleDateString("en-US", {
                                                                            year: "numeric",
                                                                            month: "long",
                                                                            day: "numeric"
                                                                        })}
                                                                    </span>
                                                                </div>
                                                                <p className="mb-0 mt-2 text-black">{item.title.substring(0, 50)}...</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
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
                            <h3 className="text-black text-center fw-bold mt-4">
                                Earlier Articles from Our <span className="text-c2">Blog</span>
                            </h3>

                            <div className="row justify-content-center">
                                <div className="col-lg-11">
                                    <div className="row">

                                        {this.state.allBlogs
                                            .slice(0, this.state.visibleCount)
                                            .map(item => (

                                                <div className="col-lg-4 my-3" key={item.id}>
                                                    <div className="blog_parent_card">
                                                        <div className="bg-white blog_parent_card_inner">

                                                            <div className="mb-3">
                                                                <img
                                                                    src={`https://www.velearn.in/public${item.image_url.replace("/../public", "")}`}
                                                                    className="w-100"
                                                                    alt={item.title}
                                                                />
                                                            </div>

                                                            <h5 className="text-c1 fw-bold">
                                                                {item.title}
                                                            </h5>

                                                            <p className="text-c2 fw-normal small">
                                                                <i className="bi bi-calendar2-minus pe-2"></i>
                                                                {new Date(item.published_date).toLocaleDateString("en-US", {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric"
                                                                })}
                                                            </p>

                                                            <div className="blog_description">
                                                                {item.descriptions.map((para, index) => (
                                                                    <p key={index}>{para}</p>
                                                                ))}
                                                            </div>

                                                            <div className="col-12 mt-auto d-flex justify-content-center">
                                                                <Link to={`/blog-details/${item.id}`}>
                                                                    <div className="read_more_butt mt-4 d-flex align-items-center justify-content-center">
                                                                        <span>Read more</span>
                                                                        <div>
                                                                            <i className="bi bi-arrow-right-short"></i>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            ))}

                                    </div>

                                    {/* Show More Button */}
                                    {this.state.visibleCount < this.state.allBlogs.length && (
                                        <div className="d-flex justify-content-center mt-3">
                                            <button
                                                className="blog_more_butt"
                                                onClick={this.handleShowMore}
                                            >
                                                Learn More
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default function BlogDetails() {
    const { id } = useParams();
    return <BlogDetailsClass id={id} />;
}