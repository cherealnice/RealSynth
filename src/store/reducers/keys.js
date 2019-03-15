import { Set as ISet } from 'immutable';
import ActionTypes from 'Store/ActionTypes';

const defaultState = new ISet();

export default function options(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.KEY_STATE_CHANGE:
      return action.payload.pressed
        ? state.add(action.payload.key)
        : state.remove(action.payload.key);
    default:
      return state;
  }
}
