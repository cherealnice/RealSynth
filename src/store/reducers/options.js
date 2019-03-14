import { fromJS } from 'immutable'
import ActionTypes from 'Store/ActionTypes'

const defaultState = fromJS({
  chorus: false,
  wave: 'sine',
  octave: 5,
  shift: false,
  level: 0.4,
  filterEnvelope: {
    attack: 0.015, 
    decay: .01,
    sustain: 0.1,
    release: 0.015,
  },
})

export default function options(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_OPTIONS:
      return action.payload === null
        ? defaultState
        : Object.entries(action.payload).reduce((current, [k, v]) => (
          current.set(k, v)
        ), state)
    default:
      return state
  }
}
