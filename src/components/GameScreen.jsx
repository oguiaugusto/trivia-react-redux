import React, { Component } from 'react';

class GameScreen extends Component {
  triviaRequest = () => {
    // Pegar o token de sessão da pessoa que está jogando
    const ENDEPOINT_SECTION = 'https://opentdb.com/api_token.php?command=request';
    console.log(fetch(ENDEPOINT_SECTION)
      .then((response) => response.ok));
    // Pegar perguntas e respostas
  };

  render() {
    this.triviaRequest();
    return (
      <div>
        Tela de Jogo
      </div>
    );
  }
}

// Requisito em progresso

export default GameScreen;
