import React from 'react';
import CurrentChallenges from '../components/current_challenges';

class App extends React.Component {
  render() {
    return (
      <div className="grid">
        <CurrentChallenges />
      </div>
    );
  }
}

export default (App);
