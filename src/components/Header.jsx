import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchGravatar();
  }

  fetchGravatar = () => {
    const { gravatarEmail } = this.props;
    const email = md5(gravatarEmail).toString();
    const URL = `https://www.gravatar.com/avatar/${email}`;
    this.setState({
      imageURL: URL,
      isLoading: false,
    });
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

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
