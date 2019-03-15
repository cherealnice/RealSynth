import React from 'react';
import { fromJS } from 'immutable';
import { PureComponent } from 'react'
import { prop } from 'ramda';
import { KEY_CODES, NOTES, WAVES } from 'Utils/constants'
import ActionTypes from 'Store/ActionTypes';
import Envelope from 'Components/Envelope';
import Key from 'Components/Key'
import GlobalContext from '../../containers/GlobalContext';
import {
	LeftControls,
	Paragraph,
	Button,
	TopControls,
	TopWrapper,
	SplashWrapper,
	Wrapper,
	StyledUl,
} from './styles';

export default class Keyboard extends PureComponent {
  static contextType = GlobalContext;

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

  get chorus() {
    return this.options.get('chorus')
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

  _handlePlay = () => {
    if (!this.context.audioContext) {
      this.context.createAudioContext();
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
			_handleFilterEnvelopeChange,
			_handleLevelChange,
			_handlePlay,
			shift,
			octave,
			wave,
			chorus,
			filterEnvelope,
			level,
		} = this
		const shiftOpacity = shift ? 1 : 0.4;

		if (!this.context.audioContext) {
			return (
				<SplashWrapper>
					<Button onClick={_handlePlay}>Let's Play Some Tunez</Button>
				</SplashWrapper>
		);
		}

		return (
			<React.Fragment>
        <TopWrapper>
					<Paragraph margin="auto" height="40px">
						SHIFT Key Engages Keyboard
					</Paragraph>
				</TopWrapper>
				<Wrapper>
					<div>
						<TopControls>
							<LeftControls>
								<Button
									min-width="90px"
									onClick={_handleWaveChange}>
									{wave}
								</Button>
								<Button
									onClick={_handleChorusChange}>
									{`Chorus: ${chorus ? 'on' : 'off'}`}
								</Button>
								<Button
									onClick={_handleOctaveDown}>
									-
								</Button>
								<Paragraph>
									{'OCTAVE: ' + (octave - 5)}
								</Paragraph>
								<Button
									onClick={_handleOctaveUp}>
									+
								</Button>
							</LeftControls>
							<Envelope
								envelopeData={filterEnvelope}
								onChange={_handleFilterEnvelopeChange}
							/>
						</TopControls>
					</div>
					<StyledUl opacity={shiftOpacity}>
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
									ctx={this.context.audioContext}
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
							ctx={this.context.audioContext}
						/>
					</StyledUl>
				</Wrapper>
			</React.Fragment>
    )
  }
}
