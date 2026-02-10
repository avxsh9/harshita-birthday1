import React from 'react';
import useFadeIn from '../hooks/useFadeIn';

const Gallery = () => {
    const sectionRef = useFadeIn();

    return (
        <section className="section-padding fade-in-section" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title text-center">Captured Moments</h2>
                <div className="gold-divider"></div>

                <div className="gallery-grid">
                    <div className="gallery-item h-stretch v-stretch">
                        <img src="/IMG_5539 2 9.28.06 PM.jpg" alt="Memory" loading="lazy" />
                    </div>
                    <div className="gallery-item">
                        <img src="/IMG_5199 3.JPG" alt="Memory" loading="lazy" />
                    </div>
                    <div className="gallery-item v-stretch">
                        <img src="/IMG_5203 3.JPG" alt="Memory" loading="lazy" />
                    </div>
                    <div className="gallery-item">
                        <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', pointerEvents: 'none' }}>
                            <source src="/filtered-1BBB5397-FF3C-4222-8CB1-9ACF19D56429 9.28.07 PM.MP4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="gallery-item">
                        <img src="/IMG_5263 3.JPG" alt="Memory" loading="lazy" />
                    </div>
                    <div className="gallery-item">
                        <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', pointerEvents: 'none' }}>
                            <source src="/AC09AE71-9ACE-42E8-9CF7-28546B867664 2.MP4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="gallery-item h-stretch">
                        <img src="/IMG_5482 2 9.28.06 PM.jpg" alt="Memory" loading="lazy" />
                    </div>
                    <div className="gallery-item">
                        <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', pointerEvents: 'none' }}>
                            <source src="/8DEF881C-F9CD-4366-9F6A-3DAF5C1D9E2D 3.MP4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="gallery-item">
                        <img src="/IMG_0649 9.28.07 PM.jpg" alt="Memory" loading="lazy" />
                    </div>
                    <div className="gallery-item">
                        <img src="/harshita.JPG" alt="Memory" loading="lazy" />
                    </div>
                    <div className="gallery-item">
                        <img src="/IMG_5186 3.JPG" alt="Memory" loading="lazy" />
                    </div>
                    <div className="gallery-item">
                        <img src="/IMG_5490 2 9.28.07 PM.JPG" alt="Memory" loading="lazy" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
