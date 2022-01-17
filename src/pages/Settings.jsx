import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeSettingsAct } from '../redux/actions';
import { fetchCategories as fetchC } from '../services/fetchTrivia';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      categories: [],

      category: 'any',
      difficulty: 'any',
      type: 'any',
    };

    this.fetchCategories = this.fetchCategories.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
    this.setSettings();
  }

  setSettings() {
    let { props: { settings: { category, difficulty, type } } } = this;
    category = category === '' ? 'any' : category;
    difficulty = difficulty === '' ? 'any' : difficulty;
    type = type === '' ? 'any' : type;
    const settings = { category, difficulty, type };

    this.setState({ ...settings });
  }

  fetchCategories() {
    fetchC()
      .then((r) => this.setState({ categories: r.trivia_categories }, () => {
        this.setState({ isFetching: false });
      }));
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  saveSettings() {
    const { props: { changeSettings } } = this;
    let { state: { category, difficulty, type } } = this;
    category = category === 'any' ? '' : category;
    difficulty = difficulty === 'any' ? '' : difficulty;
    type = type === 'any' ? '' : type;

    // console.log({ category, difficulty, type });
    changeSettings({ category, difficulty, type });
  }

  render() {
    const {
      state: {
        isFetching,
        categories,
        category,
        difficulty,
        type,
      },
      props: { name },
    } = this;

    if (isFetching) {
      return (
        <div>
          <h1 data-testid="settings-title">Settings</h1>
          <p>Loading</p>
        </div>
      );
    }

    return (
      <div>
        <h1 data-testid="settings-title">Settings</h1>
        <div className="settings">
          <label htmlFor="category">
            Select a category:
            <select
              name="category"
              id="category"
              value={ category }
              onChange={ this.handleChange }
            >
              <option value="any">Any</option>
              {categories.map((c) => (
                <option key={ c.id } value={ c.id }>{c.name}</option>
              ))}
            </select>
          </label>
          <label htmlFor="difficulty">
            Select a difficulty:
            <select
              name="difficulty"
              id="difficulty"
              value={ difficulty }
              onChange={ this.handleChange }
            >
              <option value="any">Any</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type">
            Select a type:
            <select
              name="type"
              id="type"
              value={ type }
              onChange={ this.handleChange }
            >
              <option value="any">Any</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True or False</option>
            </select>
          </label>
          <Link to={ name === '' ? '/' : '/game' }>
            <button
              type="button"
              onClick={ this.saveSettings }
            >
              Save settings
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings,
  name: state.player.name,
});

const mapDispatchToProps = (dispatch) => ({
  changeSettings: (settings) => dispatch(changeSettingsAct(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

Settings.propTypes = {
  settings: PropTypes.objectOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  changeSettings: PropTypes.func.isRequired,
};
