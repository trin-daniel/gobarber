import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
@font-face {
  font-family: 'Roboto slab';
  src: url('../fonts/RobotoSlab-Regular.ttf') format('ttf');
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}
body{
  background-color: #312E38;
  color: #FFF;
}
body, input, button{
  font-family: 'Roboto slab', serif;
  font-size: 16px;

}
h1, h2, h3, h4, h5, h6, strong{
  font-weight: 500;
}
button{
  cursor: pointer;
}
`;
