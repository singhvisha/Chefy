import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import currentChallengesStyle from '../styles/current_challenges';
import { setCurrentChallenges } from '../actions/current_challenges';
import ChallengeList from './challenge_list';

class CurrentChallenges extends React.Component {
  componentDidUpdate() {
    if (this.props.fetchChallenges) {
      this.props.setCurrentChallenges(this.props.user.username);
    }
  }

  componentDidMount() {
    if (this.props.user.username) {
      this.props.setCurrentChallenges(this.props.user.username);
    }
  }

  render() {
    let element;
    if (this.props.fetchChallenges) {
      element = (
        <div class='loader'>
          <img src='/static/loader.gif' />
        </div>
      )
    }
    else {
      element = <ChallengeList />;
    }
    return (
      <div className="current-challenges">
        <div className="header">
          <h2>Current Challenges</h2>
        </div>
        <div className="create-button">
          <Link href="/create_challenge">
            <a>+</a>
          </Link>
        </div>
        {element}
        <style jsx global>{ currentChallengesStyle }</style>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  fetchChallenges: state.currentChallenges.fetchChallenges,
});

const mapDispatchToProps = {
  setCurrentChallenges,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentChallenges);
