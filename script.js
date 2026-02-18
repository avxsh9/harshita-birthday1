/*
------------------------------------------
GLOBAL UTILS
------------------------------------------
*/
const SITE_HASH = "f68f4b5483ab6804ad2da1fe5f25782f1a2c1d42151d2235039e92449be7ca98"; // SHA-256 of "loveubabu"

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// List of images for the blurred background (Mix of everything)
const backgroundImages = [
    "IMG_5508 2 9.28.06 PM.jpg", "IMG_5496 2.jpg", "harshita.JPG",
    "IMG_0650.jpg", "IMG_5456 2 9.28.07 PM.jpg", "IMG_5527 2.jpg",
    "IMG_5480 2.jpg", "IMG_5504 2 9.28.06 PM.jpg", "IMG_5178 3.JPG",
    "IMG_5182 3.JPG", "IMG_5201 3.JPG", "IMG_5224 3.JPG",
    "IMG_5266 3.JPG", "IMG_5539 2 9.28.06 PM.jpg", "IMG_5507 2 9.28.06 PM.jpg",
    "IMG_5495 2 9.28.06 PM.jpg", "IMG_5489 2.JPG", "IMG_5476 2.JPG",
    "IMG_4070 9.28.07 PM.JPG", "IMG_3424 9.28.07 PM.JPG"
];

function createBlurredBackground() {
    const grid = document.getElementById('lockBackgroundGrid');
    if (!grid) return;

    // Shuffle and pick enough images to fill the grid (approx 50 for desktop)
    const shuffled = [...backgroundImages].sort(() => 0.5 - Math.random());
    // Duplicate to ensure we have enough
    const finalImages = [...shuffled, ...shuffled, ...shuffled].slice(0, 40);

    finalImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "";
        img.style.animationDelay = `${Math.random() * 5}s`;
        grid.appendChild(img);
    });
}

/*
------------------------------------------
SITE-WIDE PIN PROTECTION
------------------------------------------
*/
(async function () {
    const checkPin = async () => {
        const input = document.getElementById('site-pin').value;
        const hash = await sha256(input);

        if (hash === SITE_HASH) {
            document.getElementById('site-lock-overlay').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('site-lock-overlay').style.display = 'none';
            }, 500);
            // Persistence removed: PIN required on every refresh
        } else {
            const errorMsg = document.getElementById('site-error-msg');
            errorMsg.style.display = 'block';
            errorMsg.innerText = "Incorrect PIN!";
            setTimeout(() => { errorMsg.style.display = 'none'; }, 2000);
        }
    };

    // Wait for DOM to load only for the overlay elements
    window.onload = () => {
        createBlurredBackground();
        // Persistence logic removed: Always show overlay on load

        const btn = document.getElementById('site-unlock-btn');
        const input = document.getElementById('site-pin');

        if (btn) btn.addEventListener('click', checkPin);
        if (input) input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkPin();
        });
    };
})();

document.addEventListener('DOMContentLoaded', () => {

    /*
    ------------------------------------------
    CONTENT PROTECTION (Disable Right-Click)
    ------------------------------------------
    */
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('dragstart', event => event.preventDefault());
    document.addEventListener('selectstart', event => {
        if (!['INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
            event.preventDefault();
        }
    });

    /*
    ------------------------------------------
    DYNAMIC DATE LOGIC (Must run before Typewriter)
    ------------------------------------------
    */
    const updateDynamicDate = () => {
        const dateElement = document.getElementById('dynamic-date');
        const dateElement2 = document.getElementById('dynamic-date-2');
        if (dateElement) {
            const startDate = new Date('2026-02-12T00:00:00');
            const today = new Date();

            startDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            const diffTime = today - startDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let dateText = "Today";
            let dateText2 = "today";

            if (diffDays > 0) {
                dateText = `${diffDays} days ago`;
                dateText2 = `${diffDays} days ago`;
            } else if (diffDays < 0) {
                dateText = `In ${Math.abs(diffDays)} days`;
                dateText2 = `in ${Math.abs(diffDays)} days`;
            }

            dateElement.innerText = dateText;
            if (dateElement2) dateElement2.innerText = dateText2;
        }
    };
    updateDynamicDate();

    /*
    ------------------------------------------
    NEXT BIRTHDAY COUNTDOWN
    ------------------------------------------
    */
    const initCountdown = () => {
        const countdownEl = document.getElementById('countdown');
        if (!countdownEl) return;

        const targetDate = new Date('2027-02-12T00:00:00');

        const updateTimer = () => {
            const now = new Date();
            const diff = targetDate - now;

            if (diff <= 0) {
                countdownEl.innerText = "Happy Birthday! 🎂";
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            countdownEl.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        };

        updateTimer(); // Initial call
        setInterval(updateTimer, 1000); // Update every second
    };
    initCountdown();

    /*
    ------------------------------------------
    SCROLLING PHOTO MARQUEE INJECTOR
    ------------------------------------------
    */
    // List of images to use in the marquee
    const marqueeImages = [
        "IMG_5508 2 9.28.06 PM.jpg",
        "IMG_5496 2.jpg",
        "IMG_5504 2 9.28.06 PM.jpg",
        "IMG_5500 2 9.28.06 PM.jpg",
        "IMG_5480 2.jpg",
        "IMG_5456 2 9.28.07 PM.jpg",
        "IMG_5455 2 9.28.07 PM.jpg",
        "IMG_0650.jpg",
        "IMG_0649 9.28.07 PM.jpg",
        "IMG_0648.jpg",
        "IMG_5453 2 9.28.07 PM.jpg",
        "IMG_5527 2.jpg",
        "harshita.JPG",
        "IMG_5178 3.JPG",
        "IMG_5182 3.JPG",
        "IMG_5186 3.JPG",
        "IMG_5201 3.JPG",
        "IMG_5204 3.JPG",
        "IMG_5224 3.JPG",
        "IMG_5236 3.JPG",
        "IMG_5248 3.JPG",
        "IMG_5263 3.JPG",
        "IMG_5266 3.JPG",
        "IMG_5286 3.JPG",
        "IMG_5539 2 9.28.06 PM.jpg",
        "IMG_5538 2 9.28.06 PM.jpg",
        "IMG_5528 2 9.28.06 PM.jpg",
        "IMG_5522 2.jpg",
        "IMG_5507 2 9.28.06 PM.jpg",
        "IMG_5506 2 9.28.06 PM.jpg",
        "IMG_5505 2 9.28.06 PM.jpg",
        "IMG_5503 2 9.28.06 PM.jpg",
        "IMG_5502 2 9.28.06 PM.jpg",
        "IMG_5501 2 9.28.06 PM.jpg",
        "IMG_5498 2 9.28.06 PM.jpg",
        "IMG_5497 2.jpg",
        "IMG_5495 2 9.28.06 PM.jpg",
        "IMG_5492 2 9.28.07 PM.JPG",
        "IMG_5490 2 9.28.07 PM.JPG",
        "IMG_5489 2.JPG",
        "IMG_5488 2.JPG",
        "IMG_5482 2 9.28.06 PM.jpg",
        "IMG_5481 2 9.28.06 PM.jpg",
        "IMG_5476 2.JPG",
        "IMG_5473 2.JPG",
        "IMG_5468 2 9.28.07 PM.JPG",
        "IMG_4070 9.28.07 PM.JPG",
        "IMG_4069.JPG",
        "IMG_3424 9.28.07 PM.JPG",
        "IMG_3423 9.28.07 PM.JPG",
        "IMG_3422 9.28.07 PM.JPG",
        "IMG_3420 9.28.07 PM.JPG",
        "0FBEB51C-54FC-401A-862E-B0A667700788.JPG",
        "1735F2C9-0FD2-475C-B0BB-9DC0596AEF8D.JPG",
        "23F20FD3-897F-4489-8E58-1E9CC186D19A 9.28.07 PM.JPG",
        "398D2729-E56D-476E-B2CD-61BE913E5EEB 9.28.07 PM.JPG",
        "3B3D8013-6037-4EA7-A743-6E37733A9B5D 2 9.28.07 PM.JPG"
    ];

    function createMarquee() {
        const wrapper = document.createElement('div');
        wrapper.className = 'scrolling-grid-wrapper';

        // Fisher-Yates Shuffle
        const shuffleArray = (array) => {
            const newArr = [...array];
            for (let i = newArr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
            }
            return newArr;
        };

        // Helper to create a single track with randomized images
        const createTrack = () => {
            const track = document.createElement('div');
            track.className = 'scrolling-grid-track';

            // Shuffle images for THIS track
            const shuffledImages = shuffleArray(marqueeImages);

            // Duplicate content 4 times for seamless scrolling
            let imagesHTML = shuffledImages.map(src => `<img src="${src}" alt="Memory" loading="lazy">`).join('');
            track.innerHTML = imagesHTML + imagesHTML + imagesHTML + imagesHTML;
            return track;
        };

        // Create 3 rows to fill the screen
        wrapper.appendChild(createTrack());
        wrapper.appendChild(createTrack());
        wrapper.appendChild(createTrack());

        return wrapper;
    }

    // Target ONLY the header for the full-screen background grid
    const targets = document.querySelectorAll('header');

    targets.forEach(target => {
        target.style.position = "relative";
        target.appendChild(createMarquee());
    });


    /*
    ------------------------------------------
    FADE IN ANIMATION (Existing)
    ------------------------------------------
    */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    /*
    ------------------------------------------
    SURPRISE BUTTON (Existing)
    ------------------------------------------
    */
    const surpriseBtn = document.getElementById('surpriseBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');

    if (surpriseBtn && hiddenMessage) {
        surpriseBtn.addEventListener('click', () => {
            hiddenMessage.classList.add('revealed');
            surpriseBtn.textContent = "Happy Birthday";
            surpriseBtn.style.pointerEvents = "none";
            surpriseBtn.style.borderColor = "transparent";
            surpriseBtn.style.backgroundColor = "var(--accent-pink)";
            surpriseBtn.style.color = "var(--white)";
        });
    }

    /*
    ------------------------------------------
    BACKGROUND MUSIC PLAYER
    ------------------------------------------
    */
    // Create Audio Element
    const audio = new Audio('music.mp3');
    audio.loop = true;
    audio.volume = 0.5;

    // Create Control Button
    const musicBtn = document.createElement('div');
    musicBtn.className = 'music-control';
    musicBtn.innerHTML = '<span class="music-icon">🎵</span>';
    musicBtn.title = "Play Music";
    document.body.appendChild(musicBtn);

    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        // Check if any video is playing
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
            audio.pause();
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '<span class="music-icon">🔇</span>';
            musicBtn.title = "Play Music";
        } else {
            audio.play().then(() => {
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<span class="music-icon">🎵</span>';
                musicBtn.title = "Pause Music";
            }).catch(e => {
                console.log("Audio play failed:", e);
                alert("Please click anywhere on the page to allow music playback first, or check if 'music.mp3' exists.");
            });
        }
        isPlaying = !isPlaying;
    });

    // Music Consent Logic
    const musicModal = document.getElementById('musicModal');
    const musicYesBtn = document.getElementById('musicYes');
    const musicNoBtn = document.getElementById('musicNo');

    // Show modal on load
    setTimeout(() => {
        if (musicModal) musicModal.classList.add('show');
    }, 1000);

    if (musicYesBtn) {
        musicYesBtn.addEventListener('click', () => {
            audio.play().then(() => {
                isPlaying = true;
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<span class="music-icon">🎵</span>';
                musicBtn.title = "Pause Music";
            }).catch(console.error);
            if (musicModal) musicModal.classList.remove('show');
            setTimeout(() => { if (musicModal) musicModal.style.display = 'none'; }, 500);
        });
    }

    if (musicNoBtn) {
        musicNoBtn.addEventListener('click', () => {
            // Do not play logic
            if (musicModal) musicModal.classList.remove('show');
            setTimeout(() => { if (musicModal) musicModal.style.display = 'none'; }, 500);
        });
    }


    /*
    ------------------------------------------
    FLOATING HEARTS GENERATOR
    ------------------------------------------
    */
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️'; // Neutral sparkle

        // Randomize position and animation properties
        const startLeft = Math.random() * 100; // 0 to 100vw
        const duration = Math.random() * 5 + 5; // 5s to 10s
        const scale = Math.random() * 0.5 + 0.5; // size variation

        heart.style.left = startLeft + 'vw';
        heart.style.animationDuration = duration + 's';
        heart.style.transform = `scale(${scale})`; // Only applies initial scale, keyframes act on translate

        document.body.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Spawn a heart every 500ms
    setInterval(createFloatingHeart, 600);


    /*
    ------------------------------------------
    SCROLL ANIMATIONS FOR IMAGES
    ------------------------------------------
    */
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                imgObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const animatedImages = document.querySelectorAll('.animate-img');
    animatedImages.forEach(img => imgObserver.observe(img));

    // Safety fallback: ensure all images become visible eventually
    setTimeout(() => {
        animatedImages.forEach(img => img.classList.add('is-visible'));
    }, 2000);

    /*
    ------------------------------------------
    SECRET VAULT LOGIC (SECURE)
    ------------------------------------------
    */
    const unlockBtn = document.getElementById('unlockBtn');
    const secretPin = document.getElementById('secretPin');
    const errorMsg = document.getElementById('errorMsg');
    const lockContainer = document.getElementById('lockContainer');
    const videoContainer = document.getElementById('videoContainer');
    const secretVideoFrame = document.getElementById('secretVideoFrame');

    async function attemptUnlock() {
        if (!secretPin) return; // Guard clause

        const pin = secretPin.value;
        const hash = await sha256(pin); // Use the global sha256 function

        if (hash === SITE_HASH) { // Check against the same "loveubabu" hash
            // Success
            if (lockContainer) lockContainer.style.display = 'none';
            if (videoContainer) videoContainer.style.display = 'none'; // Ensure old logic is handled if element exists
            const vaultContent = document.getElementById('vaultContent');
            if (vaultContent) {
                vaultContent.style.display = 'block';
                initializeVaultVideos(); // Helper function to setup videos
            }
        } else {
            showError();
        }
    }

    function showError() {
        if (errorMsg) errorMsg.style.display = 'block';
        if (secretPin) secretPin.style.borderColor = 'red';
        setTimeout(() => {
            if (secretPin) secretPin.style.borderColor = '#ddd';
            if (errorMsg) errorMsg.style.display = 'none';
        }, 2000);
    }

    function initializeVaultVideos() {
        // Dynamic Video Injection
        const vaultGrid = document.getElementById('vaultGrid');
        if (vaultGrid) {
            vaultGrid.innerHTML = ''; // Clear existing content to force re-render
            const secretVideos = [
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

            secretVideos.forEach(src => {
                const card = document.createElement('div');
                card.className = 'edit-card';

                const video = document.createElement('video');
                video.className = 'vault-video';
                video.controls = true;
                video.preload = 'metadata';

                const source = document.createElement('source');
                source.src = src;
                source.type = 'video/mp4';

                video.appendChild(source);
                card.appendChild(video);
                vaultGrid.appendChild(card);
            });

            // Add Single Play Logic to newly created videos
            const vaultVideos = document.querySelectorAll('.vault-video');
            vaultVideos.forEach(video => {
                video.addEventListener('play', () => {
                    // Pause background music if playing
                    if (typeof isPlaying !== 'undefined' && isPlaying) {
                        const audio = document.querySelector('audio'); // Re-select if needed or use global
                        if (audio) audio.pause();
                        // We need to access the global isPlaying/musicBtn if possible, 
                        // but variables inside DOMContentLoaded scope are hard to reach.
                        // For now, let's just trigger a click on musicBtn if it's playing?
                        // Or dispatch a custom event.
                        const musicBtn = document.querySelector('.music-control');
                        if (musicBtn && musicBtn.classList.contains('playing')) {
                            musicBtn.click();
                        }
                    }

                    vaultVideos.forEach(otherVideo => {
                        if (otherVideo !== video) {
                            otherVideo.pause();
                        }
                    });
                });
            });
        }
    }

    if (unlockBtn) {
        unlockBtn.addEventListener('click', attemptUnlock);
        if (secretPin) {
            secretPin.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') attemptUnlock();
            });
        }
    }

    /* 
    ------------------------------------------
    INTERACTIVE FEATURES: CONFETTI & TYPEWRITER
    ------------------------------------------
    */

    // 1. Confetti Explosion on Load
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // 2. Typewriter Effect for Note
    const noteElement = document.getElementById('typewriter-note');
    if (noteElement) {
        const fullText = noteElement.innerHTML; // Get HTML content including <br>
        noteElement.innerHTML = ""; // Clear content initially
        let i = 0;
        let isTag = false;
        let textBuffer = "";

        function typeWriter() {
            if (i < fullText.length) {
                let char = fullText.charAt(i);

                if (char === "<") isTag = true;
                if (char === ">") isTag = false;

                textBuffer += char;
                i++;

                if (isTag) {
                    typeWriter();
                } else {
                    noteElement.innerHTML = textBuffer;
                    setTimeout(typeWriter, 30);
                }
            }
        }

        // Trigger typing when scrolled into view
        const noteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    noteObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        noteObserver.observe(noteElement);
    }



    /* 
    ------------------------------------------
    CUSTOM CURSOR TRAIL
    ------------------------------------------
    */
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add pulsing effect on click
    document.addEventListener('mousedown', () => {
        cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
    });

});
