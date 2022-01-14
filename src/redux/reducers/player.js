import { USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER:
    return {
      ...state,
      gravatarEmail: action.gravatarEmail,
      name: action.name,
    };
  default:
    return state;
  }
}
