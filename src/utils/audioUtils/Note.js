import { createGainNode, createOscillator } from './helpers'
import { TONES } from 'Utils/constants'

const AudioContext = window.AudioContext || window.webkitAudioContext
const ctx = new AudioContext()

export default class Note {
  constructor(freq, wave, filterEnvelope, level) {
    this.oscillatorNode = createOscillator(freq, wave, ctx)
    this.gainNode = createGainNode(ctx)
    this.oscillatorNode.connect(this.gainNode)
    this.filterEnvelope = filterEnvelope;
    this.level = level;
  }

  updateFilterEnvelope = filterEnvelope => this.filterEnvelope = filterEnvelope;

  updateLevel = level => {
    this.level = level
  }

  start = () => {
    const { gainNode, filterEnvelope, level } = this;

    // Attack to level
    gainNode.gain.setTargetAtTime(level, ctx.currentTime, filterEnvelope.get('attack'));

    // After decay time, go to sustaion level
    gainNode.gain.setTargetAtTime(
      filterEnvelope.get('sustain'),
      ctx.currentTime + filterEnvelope.get('attack'),
      filterEnvelope.get('decay'),
    )
  }

  stop = () => {
    const { gainNode, filterEnvelope } = this;

    gainNode.gain.setTargetAtTime(0, ctx.currentTime, filterEnvelope.get('release'));
  }

  updateOptions = (options, noteName) => {
    this.oscillatorNode.type = options.get('wave')
    this.oscillatorNode.detune.value =
      options.get('chorus') ? Math.floor( 30 * Math.random() ) - 15 : 0
    this.oscillatorNode.frequency.value = TONES[noteName]
  }
}
