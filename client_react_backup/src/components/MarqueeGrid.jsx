import React, { useEffect, useState } from 'react';

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

const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

const MarqueeTrack = ({ images }) => {
    // Duplicate 4 times for seamless scrolling (as per original logic)
    const duplicatedImages = [...images, ...images, ...images, ...images];

    return (
        <div className="scrolling-grid-track">
            {duplicatedImages.map((src, i) => (
                <img key={i} src={`/${src}`} alt="Memory" loading="lazy" />
            ))}
        </div>
    );
};

const MarqueeGrid = () => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        setTracks([
            shuffleArray(marqueeImages),
            shuffleArray(marqueeImages),
            shuffleArray(marqueeImages)
        ]);
    }, []);

    if (tracks.length === 0) return null;

    return (
        <div className="scrolling-grid-wrapper">
            {tracks.map((trackImages, i) => (
                <MarqueeTrack key={i} images={trackImages} />
            ))}
        </div>
    );
};

export default MarqueeGrid;
