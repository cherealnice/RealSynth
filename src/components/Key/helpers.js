import { TONES } from 'Utils/constants';
import Note from 'Utils/audioUtils/Note';

const createNotes = props => {
  const { noteName, options, filterEnvelope, level, ctx } = props;
  const wave = options.get('wave');
  const freq = TONES[noteName];
  const notes = [];
  for (let i = 0; i < 4; i++) {
    const note = new Note(freq, wave, filterEnvelope, level, ctx);
    notes.push(note);
  }

  return notes;
};

export default {
  createNotes,
};
