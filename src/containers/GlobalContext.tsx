import { createContext } from 'react';

const noop = () => {};
export const defaultAudioContext = null;

export interface ContextType {
  audioContext: AudioContext | null;
  createAudioContext: () => void;
}

export default createContext<ContextType>({
  audioContext: defaultAudioContext,
  createAudioContext: noop,
});
