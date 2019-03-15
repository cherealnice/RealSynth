export function createOscillator(freq, wave, ctx) {
  const osc = ctx.createOscillator();
  osc.type = wave;
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);

  return osc;
}

export function createGainNode(ctx) {
  const gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(ctx.destination);

  return gainNode;
}
