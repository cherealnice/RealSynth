import { createStore } from 'redux'
import defaultState from './defaultState';

function store(state = defaultState, action) {
  switch (action.type) {
  default:
    return state
  }
}

export default createStore(store);
