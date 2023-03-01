import React, { ChangeEvent, useContext, useEffect, useReducer } from 'react';
import { KEY_CODES, NOTES, TONES, WAVES } from '../../utils/constants';
import { ActionType } from '../../store/ActionType';
import Envelope from '../Envelope';
import Key from '../Key/Key';
import {
  Button,
  LeftControls,
  Paragraph,
  SplashWrapper,
  StyledUl,
  TopControls,
  Wrapper,
} from './styles.js';
import options, {
  defaultState as optionsDefaultState,
  State,
} from '../../store/reducers/options';
import keys, {
  defaultState as keysDefaultState,
} from '../../store/reducers/keys';
import GlobalContext from '../../containers/GlobalContext';

export default function Keyboard() {
  const context = useContext(GlobalContext);
  const [optionsState, optionsDispatch] = useReducer(
    options,
    optionsDefaultState
  );
  const [keysState, keysDispatch] = useReducer(keys, keysDefaultState);

  const updateOptions = (state = {}, clear = false) => {
    optionsDispatch({
      type: ActionType.UPDATE_OPTIONS,
      payload: clear ? null : state,
    });
  };

  const _onKeyDown = (e: KeyboardEvent) => {
    if (isKeyboardEnabled && !e.metaKey) {
      e.preventDefault();
      let key = KEY_CODES[e.key as keyof typeof KEY_CODES];
      if (key === 'C2') {
        key = 'C' + (octave + 1);
      } else {
        key = `${key}${octave}`;
      }
      onKeyChange(true, key);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', _onKeyDown);
    document.addEventListener('keyup', _onKeyUp);

    return () => {
      document.removeEventListener('keydown', _onKeyDown);
      document.removeEventListener('keyup', _onKeyUp);
    };
  }, [optionsState]);

  const { octave, wave, chorus, isKeyboardEnabled, filterEnvelope, level } =
    optionsState;

  const onKeyChange = (pressed = false, key = '') => {
    keysDispatch({
      type: ActionType.KEY_STATE_CHANGE,
      payload: { pressed, key },
    });
  };

  const _handleWaveChange = () => {
    const idx = WAVES.indexOf(wave);
    const newIdx = (idx + 1) % 4;
    updateOptions({ wave: WAVES[newIdx] });
  };

  const _handleChorusChange = () => {
    updateOptions({ chorus: !chorus });
  };

  const _handleOctaveUp = () => {
    if (octave <= 6) {
      updateOptions({ octave: octave + 1 });
    }
  };

  const _handleOctaveDown = () => {
    if (octave >= 3) {
      updateOptions({ octave: octave - 1 });
    }
  };

  const _handleFilterEnvelopeChange =
    (type: keyof State['filterEnvelope']) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      updateOptions({
        filterEnvelope: {
          ...filterEnvelope,
          [type]: Number(e.target.value),
        },
      });
    };

  const _handlePlay = () => {
    if (!context.audioContext) {
      context.createAudioContext();
    }
  };

  const handleKeyPressed = (key: string, pressed: boolean) => () => {
    onKeyChange(pressed, key);
  };

  const _onKeyUp = (e: KeyboardEvent) => {
    e.preventDefault();
    let key = KEY_CODES[e.key as keyof typeof KEY_CODES];
    if (key === 'C2') {
      key = 'C' + (octave + 1);
    } else {
      key = key + octave;
    }
    onKeyChange(false, key);
  };

  if (!context.audioContext) {
    return (
      <SplashWrapper>
        <Paragraph>
          This is a web-based synthesizer using your browser's AudioContext. For
          more information, see{' '}
          <a href="https://github.com/cherealnice/RealSynth/blob/main/README.md">
            the docs
          </a>
          .
        </Paragraph>
        <Button onClick={_handlePlay}>Let's Play Some Tunes</Button>
      </SplashWrapper>
    );
  }

  return !context.audioContext ? null : (
    <Wrapper>
      <div>
        <TopControls>
          <LeftControls>
            <Button min-width="90px" onClick={_handleWaveChange}>
              {wave}
            </Button>
            <Button onClick={_handleChorusChange}>
              {`Chorus: ${chorus ? 'on' : 'off'}`}
            </Button>
            <Button onClick={_handleOctaveDown}>-</Button>
            <Paragraph>{'Octave: ' + (octave - 5)}</Paragraph>
            <Button onClick={_handleOctaveUp}>+</Button>
          </LeftControls>
          <Envelope
            envelopeData={filterEnvelope}
            onChange={_handleFilterEnvelopeChange}
          />
        </TopControls>
      </div>
      <StyledUl opacity={isKeyboardEnabled ? 1 : 0.4}>
        {NOTES.map((noteName, i) => (
          <Key
            onKeyPressed={handleKeyPressed}
            keys={keysState}
            options={optionsState}
            key={`note_${noteName + octave}`}
            index={i}
            noteName={(noteName + octave) as keyof typeof TONES}
            filterEnvelope={filterEnvelope}
            level={level}
          />
        ))}
        <Key
          onKeyPressed={handleKeyPressed}
          keys={keysState}
          options={optionsState}
          index={12}
          noteName={('C' + (octave + 1)) as keyof typeof TONES}
          filterEnvelope={filterEnvelope}
          level={level}
        />
      </StyledUl>
    </Wrapper>
  );
}
