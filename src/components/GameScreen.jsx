import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import parse from 'html-react-parser';
import { fetchQuestionsAct, fetchTokenAct, sumScoreAct } from '../redux/actions';
import '../styles/game.css';

class GameScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: {},
      index: 0,
      answered: false,
      allAnswers: [],
      lastQuestion: false,
      timer: 30,
    };

    this.setQuestion = this.setQuestion.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.setAnswers = this.setAnswers.bind(this);
    this.runTimer = this.runTimer.bind(this);
  }

  componentDidMount() {
    const { props: { fetchQuestions, token, settings } } = this;
    const { category, difficulty, type } = settings;
    const parameters = [category, difficulty, type];

    fetchQuestions(...parameters, token).then(() => {
      const { props: { fetchToken, expiredToken } } = this;
      if (expiredToken) {
        fetchToken().then(() => {
          const { props: { token: newToken } } = this;
          fetchQuestions(...parameters, newToken).then(() => this.setQuestion());
        });
      } else {
        this.setQuestion();
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  setQuestion() {
    const { props: { questions }, state: { index } } = this;
    this.setState({ question: questions[index] }, () => this.setAnswers());
  }

  setAnswers() {
    const {
      state: {
        question: { incorrect_answers: incorrectAnswers, correct_answer: correctAnswer },
      },
    } = this;
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    /* Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
    const allAnswers = (!incorrectAnswers) ? [] : [...incorrectAnswers, correctAnswer];
    if (incorrectAnswers) shuffleArray(allAnswers);
    this.setState({ allAnswers }, () => this.runTimer());
  }

  handleNext = () => {
    const number = 4;
    const { index } = this.state;
    this.setState({
      index: index + 1,
    }, () => {
      if (index === number) {
        this.setState({
          lastQuestion: true,
        });
      } else {
        this.setQuestion();
        this.setState({
          answered: false,
          timer: 30,
        });
      }
    });
  }

  handleAnswer({ target: { innerText } }) {
    this.setState({ answered: true }, () => {
      clearInterval(this.timerInterval);
      const {
        state: { question: { correct_answer: answer, difficulty }, timer },
        props: { score: currentScore, sumScore },
      } = this;
      if (innerText === answer) {
        const difficulties = { hard: 3, medium: 2, easy: 1 };

        const MIN_SCORE = 10;
        const score = MIN_SCORE + (timer * difficulties[difficulty]);
        sumScore(currentScore + score);
      }
    });
  }

  runTimer() {
    const SECOND = 1000;
    this.timerInterval = setInterval(() => {
      const { state: { timer } } = this;
      if (timer !== 0) {
        this.setState((p) => ({ timer: p.timer - 1 }));
      } else {
        this.setState({ answered: true });
      }
    }, SECOND);
  }

  render() {
    const {
      state: {
        question: q,
        question: { correct_answer: correctAnswer },
        answered,
        allAnswers,
        timer,
        lastQuestion,

      },
      props: { isFetching },
    } = this;

    if (isFetching) return <h1>Loading</h1>;
    if (lastQuestion) return <Redirect to="/feedback" />;

    let wrongAnswerI = 0;
    const wrongAnswerClass = answered ? 'wrong-answer' : '';
    const correctAnswerClass = answered ? 'correct-answer' : '';

    return (
      <div className="game-screen">
        <p>{timer}</p>
        <div className="question">
          <p data-testid="question-category" className="question-category">
            {q.category}
          </p>
          {/* O parágrafo seguinte está presente por causa dos testes */}
          <p data-testid="question-text" style={ { display: 'none' } }>
            {q.question}
          </p>
          <p className="question-text">
            {q.question ? parse(q.question) : q.question}
          </p>
          <div data-testid="answer-options" className="answers-options">
            {allAnswers.map((ans, i) => {
              if (ans === correctAnswer) {
                return (
                  <button
                    key={ `answer-${i}` }
                    data-testid="correct-answer"
                    type="button"
                    className={ correctAnswerClass }
                    onClick={ this.handleAnswer }
                    disabled={ answered }
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
                  className={ wrongAnswerClass }
                  onClick={ this.handleAnswer }
                  disabled={ answered }
                >
                  {ans}
                </button>
              );
              wrongAnswerI += 1;
              return answer;
            })}
          </div>
          { answered && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNext }
            >
              Próxima
            </button>
          )}
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
  score: state.player.score,
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (cat, diff, type, token) => (
    dispatch(fetchQuestionsAct(cat, diff, type, token))),
  fetchToken: () => dispatch(fetchTokenAct()),
  sumScore: (score) => dispatch(sumScoreAct(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);

GameScreen.propTypes = {
  token: PropTypes.string.isRequired,
  expiredToken: PropTypes.bool,
  fetchQuestions: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  isFetching: PropTypes.bool,
  sumScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  settings: PropTypes.objectOf(PropTypes.string).isRequired,
};

GameScreen.defaultProps = {
  expiredToken: false,
  isFetching: false,
};
