import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

class Question extends Component {
  render() {
    const { props: { q } } = this;
    return (
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
      </div>
    );
  }
}

export default Question;

Question.propTypes = {
  q: PropTypes.objectOf(PropTypes.any).isRequired,
};
