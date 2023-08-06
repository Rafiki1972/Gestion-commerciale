import React, { useEffect } from "react";
import "../public/style/Cursor.css";

const FollowCursor = () => {
    useEffect(() => {
        const trailer = document.getElementById('trailer');

        if (trailer) {
            window.onmousemove = (e) => {
                const x = e.clientX - trailer.offsetWidth / 2,
                    y = e.clientY - trailer.offsetHeight / 2;
                const keyframe = {
                    transform: `translate(${x}px ,${y}px)`
                }
                trailer.animate(keyframe,
                    {
                        duration: 800,
                        fill: 'forwards'
                    });
            }

        }
    }, []);

    return (
        <div id="trailer">
        </div>
    );
};

export default FollowCursor;
