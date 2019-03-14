import { fromJS } from 'immutable';
import { PureComponent } from 'dio.js'
import { KEY_CODES, NOTES, WAVES } from 'Utils/constants'
import ActionTypes from 'Store/ActionTypes';

import Key from 'Components/Key'

const level = 0.4;

export default class Keyboard extends PureComponent {
  get options() {
    return this.props.state.options
  }

  get keys() {
    return this.props.state.keys
  }

  get octave() {
    return this.options.get('octave')
  }

  get wave() {
    return this.options.get('wave')
  }

  get shift() {
    return this.options.get('shift')
  }

  get filterEnvelope() {
    return this.options.get('filterEnvelope')
  }

  get level() {
    return this.options.get('level')
  }

  componentDidMount = () => {
    global.document.addEventListener('keydown', this._onKeyDown)
    global.document.addEventListener('keyup', this._onKeyUp)
  }

  componentWillUnmount = () => {
    global.document.removeEventListener('keydown', this._onKeyDown)
    global.document.removeEventListener('keyup', this._onKeyUp)
  }

  _onKeyDown = (e) => {
    const { updateOptions, options, onKeyChange, shift, octave } = this
    if (shift) {
      if (e.keyCode === 16) {
        updateOptions({ shift: false })
      } else {
        e.preventDefault()
        let key = KEY_CODES[e.keyCode]
        if (key === 'C2') {
          key = 'C' + (octave + 1)
        } else {
          key = `${key}${octave}` 
        }
        onKeyChange(true, key)
      }
    } else if (e.keyCode === 16) {
      updateOptions({ shift: true })
    }
  }

  onKeyChange = (pressed = false, key = '') => {
    this.props.dispatch({
      type: ActionTypes.KEY_STATE_CHANGE,
      payload: { pressed, key },
    })
  }

  updateOptions = (state = {}, clear = false) => {
    this.props.dispatch({
      type: ActionTypes.UPDATE_OPTIONS,
      payload: clear ? null : state
    })
  }

  _handleWaveChange = () => {
    const idx = WAVES.indexOf(this.wave)
    const newIdx = (idx + 1) % 4
    this.updateOptions({ wave: WAVES[newIdx] })
  }

  _handleChorusChange = () => {
    this.updateOptions({ chorus: !this.chorus })
  }

  _handleOctaveUp = () => {
    if (this.octave <= 6) {
      this.updateOptions({ octave: (this.octave + 1) })
    }
  }

  _handleOctaveDown = () => {
    if (this.options.get('octave') >= 3) {
      this.updateOptions({ octave: (this.octave - 1) })
    }
  }

  _handleFilterEnvelopeChange = type => e => {
    const filterEnvelope = this.filterEnvelope.set(type, Number(e.target.value))

    this.updateOptions({ filterEnvelope })
  }

  _handleLevelChange = e => {
    this.updateOptions({
      level: e.target.value,
    })
  }

  _onKeyUp = (e) => {
    const { octave, onKeyChange } = this
    e.preventDefault()
    let key = KEY_CODES[e.keyCode]
    if (key === 'C2') {
      key = 'C' + (octave + 1)
    } else {
      key = key + octave
    }
    onKeyChange(false, key)
  }

  render = () => {
    const {
      options,
      keys,
      _handleWaveChange,
      _handleChorusChange,
      _handleOctaveDown,
      _handleOctaveUp,
      _handleFilterEnvelopeChange,
      _handleLevelChange,
      shift,
      octave,
      wave,
      chorus,
      filterEnvelope,
      level,
    } = this
    const shiftOpacity = { opacity: shift ? 1 : 0.4 }

    return (
      <div className='organ group'>
        <button className='wave-button organ-options-button'
          onClick={_handleWaveChange}>
            {wave}
        </button>
        <button className='chorus-button organ-options-button'
          onClick={_handleChorusChange}>
            {`Chorus: ${chorus ? 'on' : 'off'}`}
        </button>
        <button className='octave-button octave-down organ-options-button'
          onClick={_handleOctaveDown}>
            -
        </button>
        <p className="octave">{'OCTAVE: ' + (octave - 5)}</p>
        <button className='octave-button octave-up organ-options-button'
          onClick={_handleOctaveUp}>
            +
        </button>
        <div>
          Level:
          <input
            type="range"
            value={level}
            onChange={_handleLevelChange}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <div>
          Attack:
          <input
            type="range"
            value={filterEnvelope.get('attack')}
            onChange={_handleFilterEnvelopeChange('attack')}
            min={0}
            max={1}
            step={0.001}
          />
        </div>
        <div>
          Decay:
          <input
            type="range"
            value={filterEnvelope.get('decay')}
            onChange={_handleFilterEnvelopeChange('decay')}
            min={0}
            max={2}
            step={0.001}
          />
        </div>
        <div>
          Sustain:
          <input
            type="range"
            value={filterEnvelope.get('sustain')}
            onChange={_handleFilterEnvelopeChange('sustain')}
            min={0}
            max={1}
            step={0.001}
          />
        </div>
        <div>
          Release:
          <input
            type="range"
            value={filterEnvelope.get('release')}
            onChange={_handleFilterEnvelopeChange('release')}
            min={0}
            max={0.5}
            step={0.01}
          />
        </div>
        <ul style={shiftOpacity} className='keys group'>
          {
            NOTES.map((noteName, i) => (
              <Key
                keys={keys}
                options={options}
                key={`note_${noteName + octave}`}
                index={i}
                noteName={noteName + octave}
                filterEnvelope={filterEnvelope}
                level={level}
              />
            ))
          }
          <Key
            keys={keys}
            options={options}
            index={12}
            noteName={"C" + (octave + 1)}
            filterEnvelope={filterEnvelope}
            level={level}
          />
        </ul>
      </div>
    )
  }
}
