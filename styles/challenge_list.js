import css from 'styled-jsx/css';

const challengeListStyle = css.global`
  .challenge-list .list-item {
    display: grid;
    grid-template-columns: 4fr 1fr;
    background-color: #fff;
    margin: 10px 0px 10px 0px;
    padding: 30px;
  }
  
  .challenge-list .list-item:hover {
    box-shadow: 0 0 8px #b9b9b9;
    cursor: pointer;
  }
  
  .btn-container {
    text-align: right;
  }
  
  .start-btn {
    background-color: #00bcd4;
    color: #fff;
    text-transform: uppercase;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    highlight: none;
    font-size: 18px;
  }
  
  .completed-text {
    color: #ed1c24;
    font-weight: 600;
  }
  
  .countdown-text {
    color: #26a69a;
    font-weight: 600;
  }
`;

export default challengeListStyle;
