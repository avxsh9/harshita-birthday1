import React from 'react';
import useFadeIn from '../hooks/useFadeIn';

const Essence = () => {
    const sectionRef = useFadeIn();

    return (
        <section className="section-padding fade-in-section" ref={sectionRef} style={{ background: '#fafafa' }}>
            <div className="container">
                <h2 className="section-title text-center">The Essence of You</h2>
                <div className="gold-divider"></div>

                <div className="love-grid">

                    <div className="love-item glass-card">
                        <div className="love-icon-bg">✨</div>
                        <h3>Vibe</h3>
                        <p className="love-text">Infectious energy that lights up the room.</p>
                    </div>

                    <div className="love-item glass-card">
                        <div className="love-icon-bg">🧠</div>
                        <h3>Mind</h3>
                        <p className="love-text">Brilliant, sharp, and beautifully creative.</p>
                    </div>

                    <div className="love-item glass-card">
                        <div className="love-icon-bg">🤍</div>
                        <h3>Heart</h3>
                        <p className="love-text">Kindness and compassion.</p>
                    </div>

                    <div className="love-item">
                        <div className="love-icon-bg">👀</div>
                        <h3>Eyes</h3>
                        <p className="love-text">The way they sparkle when you smile.</p>
                    </div>

                    <div className="love-item">
                        <div className="love-icon-bg">👗</div>
                        <h3>Style</h3>
                        <p className="love-text">Effortlessly chic and always on point.</p>
                    </div>

                    <div className="love-item">
                        <div className="love-icon-bg">🌟</div>
                        <h3>You</h3>
                        <p className="love-text">Simply because you are you.</p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Essence;
