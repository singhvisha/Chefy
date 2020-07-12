import React from 'react';
import Countdown from 'react-countdown-now';
import ChallengeViewer from './challenge_viewer';

class Challenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    }
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    let startElement = (
      <button
        className="start-btn"
        onClick={(event) => this.props.startChallenge(event, this.props.challenge)}
      >
        Start
      </button>
    );
    if (this.props.challenge.endTime) {
      const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          return <span className="completed-text">Completed</span>;
        }
        return (
          <span className="countdown-text">
              {hours}
            :
            {minutes}
            :
            {seconds}
              </span>
        );
      };
      startElement = (
        <Countdown date={this.props.challenge.endTime} renderer={renderer}/>
      );
    }

    if (this.state.isModalOpen) {
      return (
        <ChallengeViewer
          challenge={this.props.challenge}
          closeModal={this.closeModal}
          isModalOpen={this.state.isModalOpen}
          startElement={startElement}
        />
      );
    }
    else {
      return (
        <div className="list-item" onClick={this.openModal}>
          <div className="challenge">
            <span>{this.props.challenge.name}</span>
          </div>
          <div className="btn-container">
            {startElement}
          </div>
        </div>
      );
    }
  }
}

export default (Challenge);
