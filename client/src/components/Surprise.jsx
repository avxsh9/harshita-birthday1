import React, { useState } from 'react';
import useFadeIn from '../hooks/useFadeIn';

const Surprise = () => {
    const sectionRef = useFadeIn();
    const [revealed, setRevealed] = useState(false);

    const handleReveal = () => {
        setRevealed(true);
    };

    return (
        <section className="surprise-section fade-in-section" ref={sectionRef}>
            <div className="container text-center">
                <button
                    id="surpriseBtn"
                    className="surprise-btn"
                    onClick={handleReveal}
                    style={revealed ? { pointerEvents: 'none', borderColor: 'transparent', backgroundColor: 'var(--accent-pink)', color: 'var(--white)' } : {}}
                >
                    {revealed ? "Happy Birthday" : "Click to view"}
                </button>

                <div id="hiddenMessage" className={`hidden-message ${revealed ? 'revealed' : ''}`}>
                    <p className="hidden-text">"Wishing you a happy birthday."</p>
                    <div style={{ marginTop: '40px' }}>
                        <img
                            src="/IMG_5508 2 9.28.06 PM.jpg" alt="Surprise"
                            style={{ maxHeight: '400px', display: 'inline-block', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Surprise;
