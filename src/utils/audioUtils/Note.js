import { createGainNode, createOscillator } from './helpers'
import { TONES } from 'Utils/constants'

const AudioContext = window.AudioContext || window.webkitAudioContext
const ctx = new AudioContext()

export default class Note {
  constructor(freq, wave) {
    this.oscillatorNode = createOscillator(freq, wave, ctx)
    this.gainNode = createGainNode(ctx)
    this.oscillatorNode.connect(this.gainNode)
  }

  start = () => {
    this.gainNode.gain.value = 0.4
  }

  stop = () => {
    this.gainNode.gain.value = 0
  }

  updateOptions = (options, noteName) => {
    this.oscillatorNode.type = options.get('wave')
    this.oscillatorNode.detune.value =
      options.get('chorus') ? Math.floor( 30 * Math.random() ) - 15 : 0
    this.oscillatorNode.frequency.value = TONES[noteName]
  }
}
