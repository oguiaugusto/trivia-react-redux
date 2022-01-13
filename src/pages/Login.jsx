import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTokenAct } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  disableBtn() {
    const { state: { email, name } } = this;
    const emailRegex = (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm
    );
    /* Source: https://www.regextester.com/100026 */

    const MIN_LENGTH = 3;

    return (
      !email.match(emailRegex) || name.length < MIN_LENGTH
    );
  }

  render() {
    const { state: { email, name }, props: { fetchToken } } = this;
    const disableBtn = this.disableBtn();

    return (
      <div>
        <input
          data-testid="input-gravatar-email"
          type="text"
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          placeholder="Nome"
          value={ name }
          onChange={ this.handleChange }
        />
        <Link to="/game">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disableBtn }
            onClick={ () => fetchToken() }
          >
            Play
          </button>
        </Link>
        <Link to="/settings">
          <button data-testid="btn-settings" type="button">Settings</button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchTokenAct()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
};
