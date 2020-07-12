import css from 'styled-jsx/css';

const searchProblemStyle = css.global`
  .search-problem {
    grid-column-start: 2;
  }
  
  .loader {
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }
  
  .search-problem .header {
    background-color: #26a69a;
    color: #fff;
    padding: 15px;
    margin-top: 50px;
    display: grid;
    grid-template-columns: 4fr 1fr;
  }
  
  .search-problem .header h2 {
    margin: 0;
    text-transform: uppercase;
  }
  
  .search-problem .body {
    background-color: #fff;
    color: #464646;
    padding: 15px;
    margin: 10px 0px 50px 0px;
  }
  
  .search-options {
    display: grid;
    grid-template-columns: 3fr 1fr 3fr;
    margin: 10px 0px 40px 0px;
  }
  
  .search-code input {
    font-size: 15px;
    padding: 8px;
    margin: 0px 10px 0px 0px;
  }
  
  .search-btn-container {
    text-align: center;
  }
  
  .search-btn-container button {
    background-color: #00bcd4;
    color: #fff;
    font-size: 18px;
    padding: 5px 10px;
    font-family: 'Oswald', sans-serif;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  
  .done-btn {
    background-color: #ed1c24;
    color: #fff;
    font-size: 18px;
    padding: 5px 10px;
    border-radius: 5px;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
  }
  
  .done-btn-container {
    text-align: right;
    padding: 5px;
  }
  
  .see-more-btn {
    font-size: 18px;
    padding: 5px 10px;
    border-radius: 5px;
    text-transform: uppercase;
    cursor: pointer;
  }
  
  .see-more-btn-container {
    text-align: right;
    padding: 5px;
  }
`;

export default searchProblemStyle;
