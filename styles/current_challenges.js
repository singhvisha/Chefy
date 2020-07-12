import css from 'styled-jsx/css';

const currentChallengesStyle = css.global`
  .current-challenges {
    grid-column-start: 2;
  }
  
  .loader {
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }
  
  .current-challenges .header {
    background-color: #26a69a;
    color: #fff;
    padding: 15px;
    margin-top: 50px;
  }
  
  .current-challenges .header h2 {
    margin: 0;
    text-transform: uppercase;
  }
  
  .current-challenges .create-button {
    background-color: #ed1c24;
    border-radius: 50%;
    padding: 15px;
    height: 30px;
    width: 30px;
    top: 15%;
    position: absolute;
    left: 70%;
    box-shadow: 0 0 10px #464646;
  }
  
  .current-challenges .create-button a {
    color: #fff;
    font-size: 60px;
    text-decoration: none;
    line-height: 30px;
    text-align: center;
    padding: 4px;
  }
  
`;

export default currentChallengesStyle;
