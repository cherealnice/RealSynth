import { ActionType } from '../ActionType';

export const defaultState = new Set<string>();

export type Action = {
  type: ActionType;
  payload: {
    pressed: boolean;
    key: string;
  };
};

export default function keys(state = defaultState, action: Action) {
  switch (action.type) {
    case ActionType.KEY_STATE_CHANGE:
      // Handle key repetitions
      if (action.payload.pressed && state.has(action.payload.key)) {
        return state;
      }

      action.payload.pressed
        ? state.add(action.payload.key)
        : state.delete(action.payload.key);
      return new Set(state);
    default:
      return state;
  }
}
