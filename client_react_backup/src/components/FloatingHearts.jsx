import React, { useEffect, useState } from 'react';

const FloatingHearts = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Date.now();
            const startLeft = Math.random() * 100;
            const duration = Math.random() * 5 + 5;
            const scale = Math.random() * 0.5 + 0.5;

            setHearts(prev => [...prev, { id, startLeft, duration, scale }]);

            // Cleanup
            setTimeout(() => {
                setHearts(prev => prev.filter(h => h.id !== id));
            }, duration * 1000);
        }, 600);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    className="heart"
                    style={{
                        left: `${heart.startLeft}vw`,
                        animationDuration: `${heart.duration}s`,
                        transform: `scale(${heart.scale})`
                    }}
                >
                    ❤️
                </div>
            ))}
        </>
    );
};

export default FloatingHearts;
