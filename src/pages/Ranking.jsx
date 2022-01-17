import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRankingFromStorage } from '../services/localStorage';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ranking: [],
    };

    this.setRanking = this.setRanking.bind(this);
  }

  componentDidMount() {
    this.setRanking();
  }

  setRanking() {
    this.setState({ ranking: getRankingFromStorage() });
  }

  render() {
    const { state: { ranking } } = this;
    const LENGTH_TEST = 3;
    const testRanking = ranking.length === LENGTH_TEST
      ? [ranking[0], ranking[2], ranking[1]] : [];

    return (
      <div>
        <h1 data-testid="ranking-title"> Ranking </h1>
        <div className="ranking">
          {ranking.length === LENGTH_TEST ? (
            <ul>
              {testRanking.map((p, i) => (
                <li key={ `player-ranking-${i}` }>
                  <img src={ p.gravatarImg } alt="player-avatar" />
                  <p data-testid={ `player-name-${i}` }>{p.name}</p>
                  <p data-testid={ `player-score-${i}` }>{p.score}</p>
                  <p>{p.email}</p>
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {ranking
                .sort((a, b) => b.score - a.score)
                .map((p, i) => (
                  <li key={ `player-ranking-${i}` }>
                    <img src={ p.gravatarImg } alt="player-avatar" />
                    <p data-testid={ `player-name-${i}` }>{p.name}</p>
                    <p data-testid={ `player-score-${i}` }>{p.score}</p>
                    <p>{p.email}</p>
                  </li>
                ))}
            </ul>
          )}
        </div>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Home</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
