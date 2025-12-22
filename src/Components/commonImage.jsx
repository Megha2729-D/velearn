import React, { useState } from "react";

const CommonImage = ({ src, alt = "", className = "", ...rest }) => {
    const [loaded, setLoaded] = useState(false);

    if (!src) return null; // <-- prevents empty src warning

    return (
        <div>
            {!loaded && (
                <span
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                />
            )}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className={className}
                onLoad={() => setLoaded(true)}
                style={{
                    opacity: loaded ? 1 : 0,
                    display: "block",
                }}
                {...rest}
            />
        </div>
    );
};

export default CommonImage;
