import React from 'react';

const memories = [
    { date: "Feb 2023", img: "memories/feb2023_1.jpg", text: "Where it all began... Our 11th class school trip ✨" },
    { date: "Feb 2023", img: "memories/feb2023_2.jpg", text: "First birthday with us 🎂" },
    { date: "June 2023", img: "memories/june2023.jpg", text: "The Annual Function day 💃🌟" },
    { date: "Sept 2023", img: "memories/sept2023.jpg", text: "Celebrating Preeti Ma'am's birthday 🎂" },
    { date: "Dec 2023", img: "memories/dec2023.jpg", text: "That sweet farewell of 11th class... unforgettable days ❤️" },
    { date: "Sept 2024", img: "memories/sept2024.png", text: "Your 1st day at college 🎓✨" },
    { date: "March 2025", img: "memories/march2025_updated.jpg", text: "Shivam's wedding reception night 💍✨" },
    { date: "March 2025", img: "memories/march2025.png", text: "Holi night Oreo shake run 🥤✨" },
    { date: "July 2025", img: "memories/july2025.jpg", text: "Scooty learning sessions (more eating, less learning) 🛵🍕" },
    { date: "Oct 2025", img: "memories/oct2025.jpg", text: "That evening at the Mela 🎡✨" },
    { date: "Dec 2025", img: "memories/dec2025.png", text: "Random pizza outing 🍕✨" },
    { date: "Jan 2026", img: "memories/jan2026.png", text: "Starting the New Year together 🎉❤️" }
];

const Timeline = () => {
    return (
        <section className="section-padding memories-section" style={{ opacity: 1, visibility: 'visible' }}>
            <div className="container">
                <h2 className="section-title text-center">Beautiful Memories</h2>
                <div className="gold-divider"></div>

                <div className="timeline">
                    {memories.map((mem, index) => (
                        <div key={index} className="memory-item">
                            <div className="memory-date">{mem.date}</div>
                            <div className="memory-content glass-card">
                                <img src={`/${mem.img}`} alt={`${mem.date} Memory`} />
                                <p className="memory-text">{mem.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
