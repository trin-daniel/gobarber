import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip/index';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}
export const Container = styled.div<ContainerProps>`
  width: 100%;
  background-color: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  display: flex;
  align-items: center;
  padding: 16px;
  color: #666360;
  & + div {
    margin-top: 10px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c70039;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}



  input {
    flex: 1;
    background-color: transparent;
    border: none;
    color: #f4ede8;
    &::placeholder {
      color: '#666360';
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0px;
  }
  span {
    background-color: #c70039;
    color: #fff;
    &::before {
      border-color: #c70039 transparent;
    }
  }
`;
