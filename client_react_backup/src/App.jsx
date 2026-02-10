import React from 'react';
import Hero from './components/Hero';
import Note from './components/Note';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';
import Essence from './components/Essence';
import SecretVault from './components/SecretVault';
import Surprise from './components/Surprise';
import Footer from './components/Footer';
import FloatingHearts from './components/FloatingHearts';
import CustomCursor from './components/CustomCursor';
import AudioPlayer from './components/AudioPlayer';

import './index.css';

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <FloatingHearts />
      <Hero />
      <Note />
      {/* Countdown Section was removed previously */}
      <Gallery />
      <Timeline />
      {/* Cinematic Edits Section was empty/reserved */}
      <SecretVault />
      <Essence />
      <Surprise />
      <Footer />
      <AudioPlayer />
    </div>
  );
}

export default App;
