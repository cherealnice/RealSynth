# React Synthesizer

[Live Demo](https://cherealnice.github.io/RealSynth/)

A web-based keyboard implementing ReactJS.

### Features

This synthesizer uses the Web Audio API to allow you to play in real-time, and also edit attributes of the sound.  The keyboard is only active after SHIFT lock is pressed, and disabled after another SHIFT key press.

### React Components

* Organ
* Key

### Editable Attributes

##### Type of wave selected (sine, square, triangle, or sawtooth)

* Toggles AudioContext Oscillator #type

##### Chorus (on or off)

* Uses AudioContext Oscillator #detune to apply slight variations of tuning over 4 Oscillators

##### Octave

* Effects AudioContext Osillator #frequency, referencing a global object which maps frequencies to note values

##### ADSR Envelope

* Effects AudioContext level over time


### How to Run This Code

* Download this repository
* yarn
* yarn start
* Open localhost:1234 in browser
* Jam out on some funky tunes!
