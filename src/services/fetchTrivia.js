const baseFetch = (url) => (
  fetch(url).then((r) => r
    .json()
    .then((json) => (r.ok ? Promise.resolve(json) : Promise.reject(json))))
);

export function fetchToken() {
  const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

  return baseFetch(URL_TOKEN);
}

export function fetchQuestions(amount, token) {
  const URL_QUESTION = `https://opentdb.com/api.php?amount=${amount}&token=${token}`;

  return baseFetch(URL_QUESTION);
}
