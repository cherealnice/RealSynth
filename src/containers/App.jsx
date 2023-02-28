import React, { useState } from 'react';
import { Global } from '@emotion/react'
import Keyboard from 'Components/Keyboard/index.jsx'
import globalStyles from './styles';
import GlobalContext, { defaultAudioContext } from './GlobalContext.jsx';

const AudioContext = window.AudioContext || window.webkitAudioContext

const App = (props) => {
  const [audioContext, setAudioContext] = useState(defaultAudioContext);
  const createAudioContext = () => setAudioContext(new AudioContext());

  return (
    <React.Fragment>
      <Global styles={globalStyles} />
      <GlobalContext.Provider value={{ audioContext, createAudioContext }}>
        <Keyboard {...props} />
      </GlobalContext.Provider>
    </React.Fragment>
  );
};

export default App
