import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  header {
    height: 144px;
    background-color: #28262e;
    display: flex;
    align-items: center;

    div {
      max-width: 1120px;
      width: 100%;

      margin: 0 auto;

      svg {
        color: #999591;
        width: 25px;
        height: 25px;
      }
    }
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: -135px 0 auto;
  width: 100%;
  justify-content: center;
  align-items: center;

  form {
    width: 340px;
    margin: 80px 0;
    text-align: center;

    display: flex;
    flex-direction: column;

    div:nth-child(5) {
      margin-top: 24px;
    }
    h1 {
      text-align: left;
      margin-bottom: 24px;
      font-size: 20px;
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
`;
export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background-color: #ff9000;
    border: none;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    transition: background-color 0.4s;
    display: flex;

    cursor: pointer;
    justify-content: center;
    align-items: center;
    input {
      display: none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
    &:hover {
      background-color: ${shade(0.2, '#ff9000')};
    }
  }
`;
