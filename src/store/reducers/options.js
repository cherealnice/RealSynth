import { fromJS } from 'immutable'
import ActionTypes from 'Store/ActionTypes'

const defaultState = fromJS({
  chorus: false,
  wave: 'sine',
  octave: 1,
  shift: false,
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
