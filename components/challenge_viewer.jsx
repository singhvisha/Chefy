import React from 'react';
import Modal from 'react-modal';
import modalStyle from '../styles/modal';
import ProblemList from './problem_list';

class ChallengeViewer extends React.Component {
  componentWillMount() {
    Modal.setAppElement('body');
  };

  render() {
    const customStyle = {
      content: {
        width: '80%',
        maxHeight: '80%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
        boxShadow: '0 0 8px #b9b9b9',
      },
    };

    return (
      <Modal
        isOpen={this.props.isModalOpen}
        contentLabel="Example Modal"
        style={customStyle}
      >
        <div className="modal-header">
          <h2>{this.props.challenge.name}</h2>
          <div className='close-btn-container'>
            <a onClick={this.props.closeModal}>X</a>
          </div>
        </div>
        <div className="modal-body">
          <h2>Problems</h2>
          <ProblemList problems={this.props.challenge.problems} />
        </div>
        <div className="modal-footer">
          <div className='close-btn-container'>
            <button onClick={this.props.closeModal}>Close</button>
          </div>
          <div className='add-btn-container'>
            {this.props.startElement}
          </div>
        </div>
        <style jsx global>{ modalStyle }</style>
      </Modal>
    );
  }
}

export default (ChallengeViewer);
