import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveGravatarAct } from '../redux/actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setGravatar();
  }

  setGravatar = () => {
    const { gravatarEmail, saveGravatar } = this.props;
    const email = md5(gravatarEmail).toString();
    const URL = `https://www.gravatar.com/avatar/${email}`;
    this.setState({
      imageURL: URL,
      isLoading: false,
    }, () => saveGravatar(URL));
  };

  render() {
    const { name, score } = this.props;
    const { imageURL, isLoading } = this.state;
    return (
      !isLoading && (
        <div id="game-screen">
          <header>
            <img src={ imageURL } alt="avatar" data-testid="header-profile-picture" />
            <h3 data-testid="header-player-name">{ name }</h3>
            <h3 data-testid="header-score">{ score }</h3>
          </header>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  saveGravatar: (url) => dispatch(saveGravatarAct(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  saveGravatar: PropTypes.func.isRequired,
};
