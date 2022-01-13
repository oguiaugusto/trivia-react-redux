import { REQUEST_TOKEN, SUCCESS_TOKEN, FAIL_TOKEN } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
  isFetching: false,
  token: '',
  error: '',
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_TOKEN:
    return { ...state, isFetching: true };
  case SUCCESS_TOKEN:
    return { ...state, isFetching: false, token: action.payload.token };
  case FAIL_TOKEN:
    return { ...state, isFetching: false, error: action.error };
  default:
    return state;
  }
}
