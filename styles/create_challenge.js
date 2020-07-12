import css from 'styled-jsx/css';

const createChallengeStyle = css`
  .create-challenge {
    grid-column-start: 2;
  }
  
  .create-challenge .header {
    background-color: #26a69a;
    color: #fff;
    padding: 15px;
    margin-top: 50px;
  }
  
  .create-challenge .header h2 {
    margin: 0;
    text-transform: uppercase;
  }
  
  .create-challenge .body {
    background-color: #fff;
    color: #464646;
    padding: 15px;
    margin-top: 10px;
  }
  
  .create-challenge .body .form {
    display: grid;
    grid-column-gap: 20px;
    grid-template-columns: 2fr 1fr;
  }
  
  input {
    padding: 8px;
    font-size: 18px;
  }
  
  input[type='text'] {
    height: 30px;
    margin-top: 20px;
  }
  .form .input-duration{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  .form .input-duration div {
    text-align: center;
    color: #ccc;
    font-weight: 600;
    font-size: 15px;
  }
  
  .form .input-duration input[type="number"] {
    padding: 8px;
    width: 35px;
    height: 30px;
  }
  
  .form .input-duration span {
    line-height: 20px;
  }
  
  .add-problem {  
    margin: 30px 0px 30px 0px;
    cursor: pointer;
  }
  
  .add-symbol {
    background-color: #ed1c24;
    border-radius: 50%;
    padding: 0px 20px;
    color: #fff;
    font-size: 40px;
  }
   
  .add-text {
    margin-left: 10px;
    font-size: 30px;
    text-transform: uppercase;
    font-weight: 600;
    color: #ccc;
  }
   
  .add-text :hover {
    text-decoration: underline;
  }
   
  .create-challenge-btn {
    background-color: #00bcd4;
    color: #fff;
    font-size: 18px;
    padding: 10px 20px;
    font-family: 'Oswald', sans-serif;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
  }
  
  .create-challenge-btn-container {
    text-align: center;
  }
`;

export default createChallengeStyle;
