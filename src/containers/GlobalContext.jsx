import { createContext } from 'react';

const noop = () => {};
export const defaultAudioContext = null;

export default createContext({
  audioContext: defaultAudioContext,
  createAudioContext: noop,
});
