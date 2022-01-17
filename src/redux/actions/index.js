import {
  fetchToken,
  fetchQuestionsFiltered,
  fetchQuestions,
} from '../../services/fetchTrivia';
import { saveTokenToStorage } from '../../services/localStorage';
import store from '../store';

export const SAVE_USER = 'SAVE_USER';
export const REQUEST_API = 'REQUEST_API';
export const SUCCESS_TOKEN = 'SUCCESS_TOKEN';
export const FAIL_TOKEN = 'FAIL_TOKEN';
export const SUCCESS_QUESTIONS = 'SUCCESS_QUESTIONS';
export const FAIL_QUESTIONS = 'REQUEST_QUESTIONS';
export const EXPIRED_TOKEN = 'EXPIRED_TOKEN';
export const SUM_SCORE = 'SUM_SCORE';
export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';
export const SAVE_GRAVATAR = 'SAVE_GRAVATAR';
export const SUM_ANSWERS = 'SUM_ANSWERS';

const requestApi = () => ({ type: REQUEST_API });
const successToken = (payload) => ({ type: SUCCESS_TOKEN, payload });
const failToken = (err) => ({ type: FAIL_TOKEN, err });
const expiredToken = () => ({ type: EXPIRED_TOKEN });

const successQuestions = (payload) => ({ type: SUCCESS_QUESTIONS, payload });
const failQuestions = (err) => ({ type: FAIL_QUESTIONS, err });

export const fetchTokenAct = () => (dispatch) => {
  dispatch(requestApi());
  return fetchToken()
    .then((r) => {
      saveTokenToStorage(r.token);
      dispatch(successToken(r));
    })
    .catch((err) => dispatch(failToken(err)));
};

export const fetchQuestionsAct = (cat, diff, type, token) => (dispatch) => {
  dispatch(requestApi());

  if (store.getState().filter) {
    return fetchQuestionsFiltered(cat, diff, type, token)
      .then((r) => {
        const EXPIRED_TOKEN_CODE_FILTERED = 3;
        if (r.response_code === EXPIRED_TOKEN_CODE_FILTERED) {
          dispatch(expiredToken());
        } else {
          dispatch(successQuestions(r));
        }
      })
      .catch((err) => dispatch(failQuestions(err)));
  }

  return fetchQuestions(token)
    .then((r) => {
      const EXPIRED_TOKEN_CODE = 3;
      if (r.response_code === EXPIRED_TOKEN_CODE) {
        dispatch(expiredToken());
      } else {
        dispatch(successQuestions(r));
      }
    })
    .catch((err) => dispatch(failQuestions(err)));
};

export const saveUserAct = (name, gravatarEmail) => ({
  type: SAVE_USER,
  name,
  gravatarEmail,
});

export const sumScoreAct = (score) => ({ type: SUM_SCORE, score });
export const changeSettingsAct = (payload) => ({ type: CHANGE_SETTINGS, payload });
export const saveGravatarAct = (url) => ({ type: SAVE_GRAVATAR, url });
export const sumAnswersAct = () => ({ type: SUM_ANSWERS });
