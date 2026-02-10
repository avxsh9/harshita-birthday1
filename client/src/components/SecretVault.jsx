import React, { useState } from 'react';
import axios from 'axios';
import useFadeIn from '../hooks/useFadeIn';

const videos = [
    "Avinash.mp4",
    "edits/1.mp4",
    "edits/2.mp4",
    "edits/3.mp4",
    "edits/4.mp4",
    "edits/WhatsApp Video 2025-12-19 at 20.42.14.mp4",
    "edits/WhatsApp Video 2025-12-19 at 20.42.15.mp4",
    "edits/WhatsApp Video 2025-12-19 at 20.42.16 (1).mp4",
    "edits/WhatsApp Video 2025-12-19 at 20.42.16.mp4",
    "edits/WhatsApp Video 2025-12-19 at 20.42.17 (1).mp4",
    "edits/WhatsApp Video 2025-12-19 at 20.42.17.mp4",
    "edits/WhatsApp Video 2025-12-19 at 20.42.18.mp4"
];

const SecretVault = () => {
    const sectionRef = useFadeIn();
    const [pin, setPin] = useState('');
    const [unlocked, setUnlocked] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUnlock = async () => {
        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || '';
            const res = await axios.post(`${API_URL}/api/verify-pin`, { pin });
            if (res.data.success) {
                setUnlocked(true);
                setError('');
            }
        } catch (err) {
            setError('Incorrect PIN. Try again.');
            setTimeout(() => setError(''), 2000);
        } finally {
            setLoading(false);
        }
    };

    const handlePlay = (e) => {
        window.dispatchEvent(new Event('pauseMusic'));

        const allVideos = document.querySelectorAll('.vault-video');
        allVideos.forEach(v => {
            if (v !== e.target) v.pause();
        });
    };

    return (
        <section id="secretVault" className="section-padding fade-in-section" ref={sectionRef} style={{ background: '#f9f9f9', borderTop: '1px solid #eaeaea' }}>
            <div className="container text-center">
                <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '20px' }}>🔒 Secret Vault</h2>
                <p style={{ marginBottom: '30px', color: '#666' }}>Enter the magic PIN to unlock a special memory.</p>

                {!unlocked ? (
                    <div id="lockContainer" style={{ maxWidth: '300px', margin: '0 auto' }}>
                        <input
                            type="password"
                            id="secretPin"
                            placeholder="Enter PIN"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                            style={{
                                width: '100%',
                                padding: '15px',
                                border: error ? '2px solid red' : '2px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '1.2rem',
                                textAlign: 'center',
                                marginBottom: '15px',
                                outline: 'none',
                                transition: 'borderColor 0.3s'
                            }}
                        />
                        <button
                            id="unlockBtn"
                            onClick={handleUnlock}
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '15px',
                                background: 'var(--accent-gold)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Unlocking...' : 'Unlock'}
                        </button>
                        <p id="errorMsg" style={{ color: 'red', marginTop: '10px', display: error ? 'block' : 'none', fontSize: '0.9rem' }}>{error}</p>
                    </div>
                ) : (
                    <div id="vaultContent" style={{ marginTop: '40px', animation: 'fadeIn 1s ease' }}>
                        <p style={{ marginBottom: '30px', fontStyle: 'italic', color: '#555' }}>"A treasure trove of memories..."</p>
                        <div id="vaultGrid" className="cinematic-grid">
                            {videos.map((src, i) => (
                                <div key={i} className="edit-card">
                                    <video
                                        className="vault-video"
                                        controls
                                        preload="metadata"
                                        onPlay={handlePlay}
                                    >
                                        <source src={`/${src}`} type="video/mp4" />
                                    </video>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SecretVault;
