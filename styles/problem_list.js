import css from 'styled-jsx/css';

const problemListStyle = css.global`
  .list-item {
    box-sizing: border-box;
    width: 100%;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin: 10px 0px;
    padding: 20px;
    display: grid;
    cursor: pointer;
    grid-template-columns: 4fr 1fr;
  }
  
  .list-item:hover {
    box-shadow: 0 0 8px #b9b9b9;
  }
  
  .problem-name {
    font-weight: 600;
    font-size: 18px;
  }
  
  .problem-code {
    font-weight: 600;
    color: #ccc;
    margin: 0px 15px;
  }
  
  .problem-accuracy {
    color: #26a69a;
  }
  
  .btn-container {
    text-align: right;
  }
  
  .toggle-btn {
    background-color: #26a69a;
    color: #fff;
    text-transform: uppercase;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    highlight: none;
    font-size: 15px;
  }
`;

export default problemListStyle;
