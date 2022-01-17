import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbackMsg: '',
    };

    this.setMessage = this.setMessage.bind(this);
  }

  componentDidMount() {
    this.setMessage();
  }

  setMessage() {
    const { props: { answers } } = this;
    const MIN = 3;
    if (answers < MIN) this.setState({ feedbackMsg: 'Could be better...' });
    if (answers >= MIN) this.setState({ feedbackMsg: 'Well Done!' });
  }

  render() {
    const { props: { gravatarImg, name, score }, state: { feedbackMsg } } = this;
    console.log(gravatarImg);

    return (
      <div>
        <h1 data-testid="feedback-text">{feedbackMsg}</h1>
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
  answers: state.player.answers,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  gravatarImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  answers: PropTypes.number.isRequired,
};
