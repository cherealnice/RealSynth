import { createGainNode, createOscillator } from './helpers';
import { TONES } from '../constants';
import { State } from '../../store/reducers/options';

export default class Note {
  oscillatorNode: OscillatorNode;
  gainNode: GainNode;
  filterEnvelope: State['filterEnvelope'];
  level: number;
  ctx: AudioContext;
  constructor(
    freq: number,
    wave: OscillatorType,
    filterEnvelope: State['filterEnvelope'],
    level: number,
    ctx: AudioContext
  ) {
    this.oscillatorNode = createOscillator(freq, wave, ctx);
    this.gainNode = createGainNode(ctx);
    this.oscillatorNode.connect(this.gainNode);
    this.filterEnvelope = filterEnvelope;
    this.level = level;
    this.ctx = ctx;
  }

  updateFilterEnvelope = (filterEnvelope: State['filterEnvelope']) =>
    (this.filterEnvelope = filterEnvelope);

  updateLevel = (level: number) => {
    this.level = level;
  };

  start = () => {
    const { gainNode, filterEnvelope, level } = this;

    // Attack to level
    gainNode.gain.setTargetAtTime(
      level,
      this.ctx.currentTime,
      filterEnvelope.attack
    );

    // After decay time, go to sustain level
    setTimeout(() => {
      if (gainNode.gain.value > 0) {
        gainNode.gain.setTargetAtTime(
          filterEnvelope.sustain,
          this.ctx.currentTime,
          filterEnvelope.decay
        );
      }
    }, filterEnvelope.attack);
  };

  stop = () => {
    const { gainNode, filterEnvelope } = this;

    gainNode.gain.setTargetAtTime(
      0,
      this.ctx.currentTime,
      filterEnvelope.release
    );
  };

  updateOptions = (options: State, noteName: keyof typeof TONES) => {
    (this.oscillatorNode.type = options.wave),
      (this.oscillatorNode.detune.value = options.chorus
        ? Math.floor(30 * Math.random()) - 15
        : 0);
    this.oscillatorNode.frequency.value = TONES[noteName];
  };
}
