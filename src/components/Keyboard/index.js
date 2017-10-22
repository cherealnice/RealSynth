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

  componentDidMount = () => {
    global.document.addEventListener('keydown', this._onKeyDown)
    global.document.addEventListener('keyup', this._onKeyUp)
  }

  componentWillUnmount = () => {
    global.document.removeEventListener('keydown', this._onKeyDown)
    global.document.removeEventListener('keyup', this._onKeyUp)
  }

  _resetOptions = () => {
    // var newOptions = root.OptionsStore.all();
    // var wave = newOptions.wave;
    // var chorus = newOptions.chorus;
    // var octave = newOptions.octave;
    // this.setState({
      // wave: wave,
      // chorus: chorus,
      // octave: (octave)
    // });
  }

  _onKeyDown = (e) => {
    if (this.options.get('shift')) {
      if (e.keyCode === 16) {
        this.updateOptions({ shift: false })
      } else {
        e.preventDefault()
        var key = KEY_CODES[e.keyCode]
        if (key === 'C2') {
          key = 'C' + (this.options.get('octave') + 1)
        } else {
          key = key + this.options.get('octave')
        }
        this.onKeyChange(true, key)
      }
    } else if (e.keyCode === 16) {
      this.updateOptions({ shift: true })
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
    const idx = WAVES.indexOf(this.options.get('wave'))
    const newIdx = (idx + 1) % 4
    this.updateOptions({ wave: WAVES[newIdx] })
  }

  _handleChorusChange = () => {
    this.updateOptions({ chorus: !this.options.get('chorus') })
  }

  _handleOctaveUp = () => {
    if (this.options.get('octave') <= 6) {
      this.updateOptions({ octave: (this.options.get('octave') + 1) })
    }
  }

  _handleOctaveDown = () => {
    if (this.options.get('octave') >= 3) {
      this.updateOptions({ octave: (this.options.get('octave') - 1) })
    }
  }

  _onKeyUp = (e) => {
    e.preventDefault()
    let key = KEY_CODES[e.keyCode]
    if (key === 'C2') {
      key = 'C' + (this.options.get('octave') + 1)
    } else {
      key = key + this.options.get('octave')
    }
    this.onKeyChange(false, key)
  }

  render = () => {
    const { options } = this
    const chorusText = options.get('chorus') ? ' on' : ' off'
    const shiftOpacity = options.get('shift')
      ? { opacity: 1 }
      : { opacity: 0.4 }
    const octave = options.get('octave')
    return (
      <div className='organ group'>
        <button className='wave-button organ-options-button'
          onClick={this._handleWaveChange}>
            {options.wave}
        </button>
        <button className='chorus-button organ-options-button'
          onClick={this._handleChorusChange}>
            {"Chorus:" + chorusText}
        </button>
        <button className='octave-button octave-down organ-options-button'
          onClick={this._handleOctaveDown}>
            -
        </button>
        <p className="octave">{'OCTAVE: ' + (octave - 5)}</p>
        <button className='octave-button octave-up organ-options-button'
          onClick={this._handleOctaveUp}>
            +
        </button>
        <ul style={shiftOpacity} className='keys group'>
          {
            NOTES.map((noteName, i) => (
              <Key
                options={options}
                key={`note_${noteName + octave}`}
                index={i}
                noteName={noteName + octave}
              />
            ))
          }
          <Key options={options} index={12} noteName={"C" + (octave + 1)} />
        </ul>

      </div>
    )
  }
}
