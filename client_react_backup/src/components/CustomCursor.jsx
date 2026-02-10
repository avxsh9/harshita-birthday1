import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const moveCursor = (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        };
        const handleMouseDown = () => {
            cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
        };
        const handleMouseUp = () => {
            cursor.style.transform = "translate(-50%, -50%) scale(1)";
        };

        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return <div className="cursor-trail" ref={cursorRef}></div>;
};

export default CustomCursor;
