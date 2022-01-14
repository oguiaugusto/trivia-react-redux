import {
  fetchToken as fetchT,
  fetchQuestions as fetchQ,
} from '../../services/fetchTrivia';
import { saveTokenToStorage } from '../../services/localStorage';

export const SAVE_USER = 'SAVE_USER';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SUCCESS_TOKEN = 'SUCCESS_TOKEN';
export const FAIL_TOKEN = 'FAIL_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const SUCCESS_QUESTIONS = 'SUCCESS_QUESTIONS';
export const FAIL_QUESTIONS = 'REQUEST_QUESTIONS';
export const EXPIRED_TOKEN = 'EXPIRED_TOKEN';
export const SUM_SCORE = 'SUM_SCORE';

const requestToken = () => ({ type: REQUEST_TOKEN });
const successToken = (payload) => ({ type: SUCCESS_TOKEN, payload });
const failToken = (err) => ({ type: FAIL_TOKEN, err });

const requestQuestions = () => ({ type: REQUEST_QUESTIONS });
const successQuestions = (payload) => ({ type: SUCCESS_QUESTIONS, payload });
const failQuestions = (err) => ({ type: FAIL_QUESTIONS, err });
const expiredToken = () => ({ type: EXPIRED_TOKEN });

export const fetchTokenAct = () => (dispatch) => {
  dispatch(requestToken());
  return fetchT()
    .then((r) => {
      saveTokenToStorage(r.token);
      dispatch(successToken(r));
    })
    .catch((err) => dispatch(failToken(err)));
};

export const fetchQuestionsAct = (amount, token) => (dispatch) => {
  dispatch(requestQuestions());
  return fetchQ(amount, token)
    .then((r) => {
      const EXPIRED_TOKEN_CODE = 3;
      if (r.response_code === EXPIRED_TOKEN_CODE) {
        console.log(token);
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
