export function saveTokenToStorage(token) {
  localStorage.setItem('token', token);
}

export function savePlayerToStorage(playerObj) {
  let ranking = JSON.parse(localStorage.getItem('ranking'));
  ranking = ranking || [];

  ranking.push(playerObj);

  localStorage.setItem('ranking', JSON.stringify(ranking));
}

export function getRankingFromStorage() {
  let ranking = JSON.parse(localStorage.getItem('ranking'));
  ranking = ranking || [];
  return ranking;
}
