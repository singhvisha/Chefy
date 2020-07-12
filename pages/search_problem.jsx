import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Select from 'react-select';
import _ from 'lodash';
import ProblemList from '../components/problem_list';
import { loadProblemsByCategory, loadProblemByCode, addProblem, loadMoreProblems, clearProblemList } from '../actions/create_challenge.js';
import searchProblemStyle from '../styles/search_problem';

class SearchProblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contestCode: '',
      problemCode: '',
      problemCategory: null,
      isFetchingProblems: false,
    }
  };

  componentDidUpdate() {
    if (this.props.problems.length > 0 && this.state.isFetchingProblems) {
      this.setState({ isFetchingProblems: false});
    }
  }

  setContestCode = event => {
    this.setState({
      contestCode: _.toUpper(event.target.value),
      problemCategory: null
    });
  };

  setProblemCode = event => {
    this.setState({
      problemCode: _.toUpper(event.target.value),
      problemCategory: null
    });
  };

  setCategory = selectedCategory => {
    this.setState({
      problemCategory: selectedCategory,
      contestCode: '',
      problemCode: ''
    });
  };

  loadProblems = () => {
    this.setState({ isFetchingProblems: true });
    if (this.state.problemCategory) {
      this.props.loadProblemsByCategory(this.state.problemCategory.value);
    }
    else {
      this.props.loadProblemByCode(this.state.contestCode, this.state.problemCode);
    }
  };

  loadMoreProblems = () => {
    this.props.loadMoreProblems(this.state.problemCategory.value, this.props.problems.length);
  };

  render() {
    const categoriesList = [
      { value: 'school', label: 'School' },
      { value: 'easy', label: 'Easy'},
      { value: 'medium', label: 'Medium'},
      { value: 'hard', label: 'Hard'},
      { value: 'challenge', label: 'Challenge'},
      { value: 'extcontest', label: 'ExtContest'}
    ];

    let seeMoreButton;
    if (this.props.problems.length > 0 && this.state.problemCategory) {
      seeMoreButton = (
        <div className='see-more-btn-container'>
          <button className='see-more-btn' onClick={this.loadMoreProblems}>See More</button>
        </div>
      )
    }

    let loader;
    if (this.state.isFetchingProblems) {
      loader = (
        <div className='loader'>
          <img src='/static/loader.gif' />
        </div>
      );
    }

    return (
      <div className='grid'>
        <div className='search-problem'>
          <div className='header'>
            <h2>Search Problems</h2>
            <Link href='/create_challenge'>
              <div className='done-btn-container'>
                <a className='done-btn' onClick={() => this.props.clearProblemList()}>Done</a>
              </div>
            </Link>
          </div>
          <div className='body'>
            <div className='search-options'>
              <div className='search-code'>
                <h3>Search specific problem</h3>
                <input name="contestCode" value={this.state.contestCode} placeholder="CONTEST CODE" onChange={this.setContestCode} />
                <input name="problemCode" value={this.state.problemCode} placeholder="PROBLEM CODE" onChange={this.setProblemCode} />
              </div>
              <div className='search-btn-container'>
                <h2>OR</h2>
                <button onClick={this.loadProblems}>GO</button>
              </div>
              <div className='search-category'>
                <h3>Category</h3>
                <Select value={this.state.problemCategory} options={categoriesList} onChange={this.setCategory} />
              </div>
            </div>
            <ProblemList problems={this.props.problems} onClick={this.props.addProblem} mode='add_problem' />
            {loader}
            {seeMoreButton}
          </div>
        </div>
        <style jsx global>{ searchProblemStyle }</style>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      problems: state.challenges.problemList,
    }
};

const mapDispatchToProps = dispatch => {
  return {
    loadProblemsByCategory: category => dispatch(loadProblemsByCategory(category)),
    loadProblemByCode: (contestCode, problemCode) => dispatch(loadProblemByCode(contestCode, problemCode)),
    addProblem: problem => dispatch(addProblem(problem)),
    loadMoreProblems: (category, offset) => dispatch(loadMoreProblems(category, offset)),
    clearProblemList: () => dispatch(clearProblemList()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchProblem);
