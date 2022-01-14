import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { saveUserAct, fetchTokenAct } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      logged: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.handleBtn = this.handleBtn.bind(this);
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

  handleBtn() {
    const { state: { email, name }, props: { fetchToken, saveUser } } = this;
    saveUser(name, email);
    fetchToken().then(() => {
      this.setState({ logged: true });
    });
  }

  render() {
    const { state: { email, name, logged } } = this;
    const disableBtn = this.disableBtn();

    if (logged) return <Redirect to="/game" />;

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
        <button
          data-testid="btn-play"
          type="button"
          disabled={ disableBtn }
          onClick={ this.handleBtn }
        >
          Play
        </button>
        <Link to="/settings">
          <button data-testid="btn-settings" type="button">Settings</button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (userName, email) => dispatch(saveUserAct(userName, email)),
  fetchToken: () => dispatch(fetchTokenAct()),
});

Login.propTypes = {
  saveUser: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
