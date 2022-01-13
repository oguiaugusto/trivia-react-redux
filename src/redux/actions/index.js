import { fetchToken as fetchT } from '../../services/fetchTrivia';
import { saveTokenToStorage } from '../../services/localStorage';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SUCCESS_TOKEN = 'SUCCESS_TOKEN';
export const FAIL_TOKEN = 'FAIL_TOKEN';

const requestToken = () => ({ type: REQUEST_TOKEN });
const successToken = (payload) => ({ type: SUCCESS_TOKEN, payload });
const failToken = (err) => ({ type: FAIL_TOKEN, err });

export const fetchTokenAct = () => (dispatch) => {
  dispatch(requestToken());
  return fetchT()
    .then((r) => {
      saveTokenToStorage(r.token);
      dispatch(successToken(r));
    })
    .catch((err) => dispatch(failToken(err)));
};

export function fetchQuestions() {}
