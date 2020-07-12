import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import challengeListStyle from '../styles/challenge_list';
import { startChallenge } from '../actions/current_challenges';
import Challenge from './challenge';

class ChallengeList extends React.Component {
  startChallenge = (event, challenge) => {
    this.props.startChallenge(challenge, this.props.user.username);
    event.stopPropagation();
  };

  render() {
    let ongoingChallenges = []; let newChallenges = []; let
      completedChallenges = [];
    if (this.props.challenges) {
      _.forEach(this.props.challenges, (challenge) => {
        const challengeElement = (
          <Challenge challenge={challenge} startChallenge={this.startChallenge} key={challenge.id} />
        );
        if (!challenge.endTime) {
          newChallenges = _.concat(newChallenges, challengeElement);
        } else if (Date.now() >= challenge.endTime) {
          completedChallenges = _.concat(completedChallenges, challengeElement);
        } else if (Date.now() < challenge.endTime) {
          ongoingChallenges = _.concat(ongoingChallenges, challengeElement);
        }
      });
    }

    return (
      <div className="challenge-list">
        {ongoingChallenges}
        {newChallenges}
        {completedChallenges}
        <style jsx global>{ challengeListStyle }</style>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  challenges: state.currentChallenges.challenges,
  user: state.auth.user,
});

const mapDispatchToProps = {
  startChallenge,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeList);
