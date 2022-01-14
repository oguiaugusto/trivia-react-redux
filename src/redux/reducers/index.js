import {
  SAVE_USER,
  REQUEST_TOKEN,
  SUCCESS_TOKEN,
  FAIL_TOKEN,
  REQUEST_QUESTIONS,
  SUCCESS_QUESTIONS,
  FAIL_QUESTIONS,
  EXPIRED_TOKEN,
} from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
  questions: [],
  expiredToken: false,
  isFetching: false,
  token: '',
  error: '',
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      player: {
        ...state.player,
        gravatarEmail: action.gravatarEmail,
        name: action.name,
      },
    };
  case REQUEST_TOKEN:
    return { ...state, isFetching: true };
  case SUCCESS_TOKEN:
    return { ...state, isFetching: false, token: action.payload.token };
  case FAIL_TOKEN:
    return { ...state, isFetching: false, error: action.error };
  case REQUEST_QUESTIONS:
    return { ...state, isFetching: true };
  case SUCCESS_QUESTIONS:
    return {
      ...state,
      isFetching: false,
      questions: action.payload.results,
      expiredToken: false,
    };
  case FAIL_QUESTIONS:
    return { ...state, isFetching: false, error: action.error, expiredToken: false };
  case EXPIRED_TOKEN:
    return { ...state, isFetching: false, expiredToken: true };
  default:
    return state;
  }
}
