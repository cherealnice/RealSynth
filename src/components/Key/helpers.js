import { TONES } from 'Utils/constants'
import Note from 'Utils/audioUtils/Note'

const createNotes = function (props) {
  const noteName = props.noteName
  const wave = props.options.get('wave')
  const freq = TONES[noteName]
  const notes = []
  for (let i = 0; i < 4; i++) {
    const note = new Note(freq, wave, props.filterEnvelope, props.level, props.ctx)
    notes.push(note)
  }

  return notes
}

export default {
  createNotes,
}
