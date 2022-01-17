import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { props: { gravatarImg, name, score } } = this;
    console.log(gravatarImg);

    return (
      <div>
        <h1 data-testid="feedback-text">Texto de feedback</h1>
        <img src={ gravatarImg } alt="avatar" data-testid="header-profile-picture" />
        <h2 data-testid="header-player-name">{name}</h2>
        <p>
          Score:
          <span data-testid="header-score">{score}</span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarImg: state.player.gravatarImg,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  gravatarImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
