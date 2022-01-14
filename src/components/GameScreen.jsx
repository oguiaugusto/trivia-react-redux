import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestionsAct, fetchTokenAct } from '../redux/actions';

class GameScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: {},
      index: 0,
    };

    this.setQuestion = this.setQuestion.bind(this);
  }

  componentDidMount() {
    const { props: { fetchQuestions, token } } = this;
    const DEFAULT_AMOUNT = 5;

    fetchQuestions(DEFAULT_AMOUNT, token).then(() => {
      const { props: { fetchToken, expiredToken } } = this;
      if (expiredToken) {
        fetchToken().then(() => {
          const { props: { token: newToken } } = this;
          fetchQuestions(DEFAULT_AMOUNT, newToken).then(() => this.setQuestion());
        });
      } else {
        this.setQuestion();
      }
    });
  }

  setQuestion() {
    const { props: { questions }, state: { index } } = this;

    this.setState({ question: questions[index] });
  }

  render() {
    const {
      state: {
        question: q,
        question: { incorrect_answers: incorrectAnswers, correct_answer: correctAnswer },
      },
      props: { isFetching },
    } = this;

    if (isFetching) return <h1>Loading</h1>;

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    /* Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
    const allAnswers = (!incorrectAnswers) ? [] : [...incorrectAnswers, correctAnswer];
    if (incorrectAnswers) shuffleArray(allAnswers);
    let wrongAnswerI = 0;

    return (
      <div className="game-screen">
        <div className="question">
          <p data-testid="question-category" className="question-category">
            {q.category}
          </p>
          <p data-testid="question-text" className="question-text">
            {q.question}
          </p>
          <div data-testid="answer-options" className="answers-options">
            {allAnswers.map((ans, i) => {
              if (ans === correctAnswer) {
                return (
                  <button
                    key={ `answer-${i}` }
                    data-testid="correct-answer"
                    type="button"
                  >
                    {ans}
                  </button>
                );
              }
              const answer = (
                <button
                  type="button"
                  key={ `answer-${i}` }
                  data-testid={ `wrong-answer-${wrongAnswerI}` }
                >
                  {ans}
                </button>
              );
              wrongAnswerI += 1;
              return answer;
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  expiredToken: state.expiredToken,
  questions: state.questions,
  isFetching: state.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (amount, token) => dispatch(fetchQuestionsAct(amount, token)),
  fetchToken: () => dispatch(fetchTokenAct()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);

GameScreen.propTypes = {
  token: PropTypes.string.isRequired,
  expiredToken: PropTypes.bool,
  fetchQuestions: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  isFetching: PropTypes.bool,
};

GameScreen.defaultProps = {
  expiredToken: false,
  isFetching: false,
};
