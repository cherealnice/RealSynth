import React, { useState } from 'react';
import { Global } from '@emotion/react';
import Keyboard from '../components/Keyboard/Keyboard';
import globalStyles from './styles';
import GlobalContext, { defaultAudioContext } from './GlobalContext.js';

const AudioContext = window.AudioContext;

const App = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(
    defaultAudioContext
  );
  const createAudioContext = () => setAudioContext(new AudioContext());

  return (
    <React.Fragment>
      <Global styles={globalStyles} />
      <GlobalContext.Provider value={{ audioContext, createAudioContext }}>
        <Keyboard />
      </GlobalContext.Provider>
    </React.Fragment>
  );
};

export default App;
