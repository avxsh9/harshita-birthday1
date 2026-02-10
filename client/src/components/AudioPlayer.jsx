import React, { useState, useEffect, useRef } from 'react';

const AudioPlayer = () => {
    const audioRef = useRef(new Audio('/music.mp3'));
    const [isPlaying, setIsPlaying] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        const handlePause = () => {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        };

        window.addEventListener('pauseMusic', handlePause);

        const timer = setTimeout(() => setShowModal(true), 1000);

        return () => {
            window.removeEventListener('pauseMusic', handlePause);
            clearTimeout(timer);
            audioRef.current.pause();
        };
    }, []);

    const toggleMusic = () => {
        const videos = document.querySelectorAll('video');
        let videoPlaying = false;
        videos.forEach(v => {
            if (!v.paused && !v.ended && !v.muted) {
                videoPlaying = true;
            }
        });

        if (videoPlaying) {
            alert("Music can't play now because a video is running! 🎥");
            return;
        }

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(e => {
                    console.error(e);
                    alert("Please interact with the document first.");
                });
        }
    };

    const handleConsent = (consent) => {
        setShowModal(false);
        if (consent) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
        }
    };

    return (
        <>
            <div
                className={`music-control ${isPlaying ? 'playing' : ''}`}
                onClick={toggleMusic}
                title={isPlaying ? "Pause Music" : "Play Music"}
            >
                <span className="music-icon">{isPlaying ? '🎵' : '🔇'}</span>
            </div>

            {showModal && (
                <div id="musicModal" className={`music-modal-overlay ${showModal ? 'show' : ''}`}>
                    <div className="music-modal-content">
                        <p>Would you like to play background music?</p>
                        <div className="music-modal-buttons">
                            <button className="music-btn yes" onClick={() => handleConsent(true)}>Yes 🎵</button>
                            <button className="music-btn no" onClick={() => handleConsent(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AudioPlayer;
