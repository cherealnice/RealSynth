import { TONES } from '../../utils/constants';
import Note from '../../utils/audioUtils/Note';
import type { Props as KeyProps } from './Key';
import { ContextType } from '../../containers/GlobalContext';

export function createNotes(
  props: Pick<KeyProps, 'noteName' | 'options' | 'filterEnvelope' | 'level'> & {
    ctx: NonNullable<ContextType['audioContext']>;
  }
) {
  const noteName = props.noteName;
  const wave = props.options.wave;
  const freq = TONES[noteName];
  const notes = [];
  for (let i = 0; i < 4; i++) {
    const note = new Note(
      freq,
      wave,
      props.filterEnvelope,
      props.level,
      props.ctx
    );
    notes.push(note);
  }

  return notes;
}
