import React from 'react';
import { Global } from '@emotion/core'
import Keyboard from 'Components/Keyboard'
import globalStyles from './styles';

const App = (props) => 
  <React.Fragment>
    <Global styles={globalStyles} />
    <Keyboard {...props} />
  </React.Fragment>

export default App
