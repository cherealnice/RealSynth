import { ActionType } from '../ActionType';

export const defaultState = {
  chorus: false,
  wave: 'square' as OscillatorType,
  octave: 5,
  isKeyboardEnabled: true,
  level: 0.2,
  filterEnvelope: {
    attack: 0.015,
    decay: 0.01,
    sustain: 0.1,
    release: 0.015,
  },
};

export type State = {
  isKeyboardEnabled: boolean;
  level: number;
  filterEnvelope: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  };
  octave: number;
  chorus: boolean;
  wave: OscillatorType;
};

export type Action = {
  type: ActionType;
  payload: Partial<State> | null;
};

export default function options(state = defaultState, action: Action) {
  switch (action.type) {
    case ActionType.UPDATE_OPTIONS:
      return action.payload === null
        ? defaultState
        : {
            ...state,
            ...action.payload,
          };
    default:
      return state;
  }
}
