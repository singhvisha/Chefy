import css from 'styled-jsx/css';

const authStyle = css`
  .auth {
    background-color: #fff;
    border-radius: 6px;
    width: 20%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 50px 0px 70px 0px;
  }
  
  .auth h1 {
    font-size: 70px;
    margin: 0;
    margin-bottom: 20px;
  }
  
  .auth a {
    background-color: #26a69a;
    color: #fff;
    font-size: 20px;
    padding: 20px;
    text-decoration: none;
    border-radius: 6px;
  }
`;

export default authStyle;
