import { PureComponent } from 'dio.js'
import { KEY_CODES, NOTES, WAVES } from 'Utils/constants'
import ActionTypes from 'Store/ActionTypes';

import Key from 'Components/Key'

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
      shift,
      octave,
      wave,
      chorus,
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
        <ul style={shiftOpacity} className='keys group'>
          {
            NOTES.map((noteName, i) => (
              <Key
                keys={keys}
                options={options}
                key={`note_${noteName + octave}`}
                index={i}
                noteName={noteName + octave}
              />
            ))
          }
          <Key
            keys={keys}
            options={options}
            index={12}
            noteName={"C" + (octave + 1)}
          />
        </ul>
      </div>
    )
  }
}
