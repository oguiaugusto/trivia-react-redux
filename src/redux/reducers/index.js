import {
  SAVE_USER,
  REQUEST_API,
  SUCCESS_TOKEN,
  FAIL_TOKEN,
  SUCCESS_QUESTIONS,
  FAIL_QUESTIONS,
  EXPIRED_TOKEN,
  SUM_SCORE,
  CHANGE_SETTINGS,
  SAVE_GRAVATAR,
} from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
    gravatarImg: '',
  },
  settings: {
    category: '',
    difficulty: '',
    type: '',
  },
  filter: false,
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
  case REQUEST_API:
    return { ...state, isFetching: true };
  case SUCCESS_TOKEN:
    return { ...state, isFetching: false, token: action.payload.token };
  case FAIL_TOKEN:
    return { ...state, isFetching: false, error: action.error };
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
  case SUM_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: action.score,
      },
    };
  case CHANGE_SETTINGS:
    return { ...state, settings: action.payload, filter: true };
  case SAVE_GRAVATAR:
    return { ...state, player: { ...state.player, gravatarImg: action.url } };
  default:
    return state;
  }
}
