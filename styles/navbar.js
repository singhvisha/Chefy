import css from 'styled-jsx/css';

const navbarStyle = css`
  .navbar {
     background-color: #464646;
     color: #fff;
     padding: 10px;
     display: grid;
     grid-template-columns: 1fr 1fr;
  }
  
  .navbar-left {
    text-align: left;
  }
   
  .navbar-left a {
    font-size: 28px;
    text-decoration: none;
    color: #fff;
  }
  
  .navbar-right {
    text-align: right;
  }
  
  .navbar-right span {
    font-size: 16px;
   }
`;

export default navbarStyle;
