import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Settings, Game, Ranking, Feedback } from '../pages';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default Routes;
