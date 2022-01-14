import React, { Component } from 'react';
import Header from '../components/Header';
import GameScreen from '../components/GameScreen';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <GameScreen />
      </div>
    );
  }
}

export default Game;
