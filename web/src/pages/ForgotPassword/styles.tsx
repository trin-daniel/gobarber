import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';
import ImageBarber from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  width: 100%;
  max-width: 700px;
  align-items: center;
`;

const apperFromLeft = keyframes`

  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity: 1;
    transform: translateX(0)
  }

`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${apperFromLeft} 2s;

  form {
    width: 340px;
    margin: 80px 0;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;

      transition: color 0.3s;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  > a {
    color: #ff9000;
    display: flex;
    align-items: center;

    margin-top: 16px;
    text-decoration: none;
    transition: color 0.3s;
    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
    svg {
      margin-right: 14px;
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${ImageBarber}) no-repeat center;
  background-size: cover;
`;
