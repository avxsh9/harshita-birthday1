import React from 'react';
import MarqueeGrid from './MarqueeGrid';

const Hero = () => {
    const scrollToNote = () => {
        const note = document.getElementById('note');
        if (note) {
            note.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header style={{ position: 'relative', overflow: 'hidden' }}>
            <MarqueeGrid />

            <div className="hero-overlay"></div>

            <div className="hero-content container">
                <h1 className="hero-title">Happy Birthday Harshita</h1>
                <p className="hero-subtitle">"Count your life by smiles, not tears. Count your age by friends, not years."</p>
            </div>

            <div className="scroll-indicator" onClick={scrollToNote}>
                <div className="mouse-icon">
                    <div className="mouse-wheel"></div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
