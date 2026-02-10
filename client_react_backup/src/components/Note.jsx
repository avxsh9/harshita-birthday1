import React, { useEffect, useRef, useState } from 'react';
import useFadeIn from '../hooks/useFadeIn';

const Note = () => {
    const sectionRef = useFadeIn();
    const noteRef = useRef(null);
    const [hasTyped, setHasTyped] = useState(false);

    const noteContent = `Today is special, because today the girl was born who became the most important part of my life
without even trying.
You’re not just my best friend — you’re that comfort where my mind feels calm and my heart feels
lighter.<br><br>

There’s something magical in your smile and a strange kind of peace in your words.
Whenever life feels a little too heavy, just your name is enough to make things feel okay.<br><br>

We fight, we argue, we get upset sometimes — but honestly, I love even that part,
because after every fight, you feel even more mine.
You’ve become my habit, babu — without thinking, without planning.<br><br>

I won’t promise that everything will always be perfect,
but I can promise this:
no matter what the situation is,
your Suar will always stand by you — no conditions, no reasons.<br><br>

Just stay the way you are — real, a little crazy, a little stubborn,
and completely my Harshita 💫<br><br>

Once again, Happy Birthday, babu 🎂<br>
You exist, and that alone makes everything feel right.`;

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasTyped && noteRef.current) {
                setHasTyped(true);
                startTypewriter(noteContent, noteRef.current);
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        if (noteRef.current) observer.observe(noteRef.current);

        return () => observer.disconnect();
    }, [hasTyped]);

    const startTypewriter = (text, element) => {
        element.innerHTML = "";
        let i = 0;
        let isTag = false;
        let textBuffer = "";

        const type = () => {
            if (i < text.length) {
                let char = text.charAt(i);
                if (char === "<") isTag = true;
                if (char === ">") isTag = false;

                textBuffer += char;
                i++;

                if (isTag) {
                    type();
                } else {
                    element.innerHTML = textBuffer;
                    setTimeout(type, 30);
                }
            }
        };
        type();
    };

    return (
        <section id="note" className="fade-in-section" ref={sectionRef}>
            <div className="container">
                <div className="note-card glass-card">
                    <h2 className="section-title">A Note</h2>
                    <div className="gold-divider"></div>
                    <p
                        id="typewriter-note"
                        className="note-text"
                        style={{ textAlign: 'left', lineHeight: 1.6, marginBottom: '20px', minHeight: '300px' }}
                        ref={noteRef}
                    ></p>
                    <div className="note-signature" style={{ textAlign: 'right', marginTop: '20px' }}>
                        — Your Suar 🐷❤️
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Note;
