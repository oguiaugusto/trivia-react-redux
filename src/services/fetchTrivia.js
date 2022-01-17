const baseFetch = (url) => (
  fetch(url).then((r) => r
    .json()
    .then((json) => (r.ok ? Promise.resolve(json) : Promise.reject(json))))
);

export function fetchToken() {
  const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
  return baseFetch(URL_TOKEN);
}

export function fetchQuestions(token) {
  const URL_QUESTION = `https://opentdb.com/api.php?amount=5&token=${token}`;
  return baseFetch(URL_QUESTION);
}

export function fetchQuestionsFiltered(cat, diff, type, token) {
  const BASE_URL = 'https://opentdb.com/api.php?amount=5';
  const FILTER_URL = `&category=${cat}&difficulty=${diff}&type=${type}&token=${token}`;
  const FILTERED_URL = `${BASE_URL}${FILTER_URL}`;

  return baseFetch(FILTERED_URL);
}

export function fetchCategories() {
  const CATEGORY_URL = 'https://opentdb.com/api_category.php';
  return baseFetch(CATEGORY_URL);
}
