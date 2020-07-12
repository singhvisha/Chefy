import css from 'styled-jsx/css';

const globalStyle = css.global`
 @import url('https://fonts.googleapis.com/css?family=Oswald:300');
 body, html {
  box-sizing: border-box;
  font-family: 'Oswald', sans-serif;
  background-color: #EEE;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
 }
 
 button, input {
  font-family: 'Oswald', sans-serif;
  border-radius: 5px;
  border: 1px solid #ccc;
 }
 
 button {
  font-weight: 600;
 }
 
 .grid {
   display: grid;
   grid-template-columns: 1fr 3fr 1fr;
`;

export default globalStyle;
