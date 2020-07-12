import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { setProblemDetails } from '../actions/create_challenge';
import modalStyle from '../styles/modal';

class ProblemViewer extends React.Component {
  componentWillMount() {
    Modal.setAppElement('body');
  };

  componentDidMount() {
    if (this.props.problem.contestCode) {
      this.props.setProblemDetails(this.props.problem.problemCode, this.props.problem.contestCode);
    }
    else {
      this.props.setProblemDetails(this.props.problem.problemCode);
    }
  };

  addProblem = (event) => {
    this.props.addProblem(event);
  }

  render() {
    const customStyle = {
      content: {
        width: '80%',
        height: '80%',
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

    let modalBody = (
      <div className='loader'>
        <img src='/static/loader.gif' />
      </div>
    );

    if (!this.props.isFetchingDetails) {
      modalBody = (<p dangerouslySetInnerHTML={{ __html: this.props.problemDetails.body }} />);
    }

    return (
      <Modal
        isOpen={this.props.isModalOpen}
        contentLabel="Example Modal"
        style={customStyle}
      >
        <div className="modal-header">
          <h2>{this.props.problem.problemName}</h2>
          <div className='close-btn-container'>
            <a onClick={this.props.closeModal}>X</a>
          </div>
        </div>
        <div className="modal-body">
          {modalBody}
        </div>
        <div className="modal-footer">
          <div className='close-btn-container'>
            <button onClick={this.props.closeModal}>Close</button>
          </div>
          <div className='add-btn-container'>
            <button onClick={this.addProblem}>ADD</button>
          </div>
        </div>
        <style jsx global>{ modalStyle }</style>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    problemDetails: state.challenges.problemDetails,
    isFetchingDetails: state.challenges.isFetchingDetails,
  }
};

const mapDispatchToProps = {
  setProblemDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemViewer);
