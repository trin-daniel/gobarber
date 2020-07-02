import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface inputProps {
  isFocused: boolean;
  isErrored: boolean;
}
export const Container = styled.View<inputProps>`
  width: 100%;
  height: 60px;
  background-color: #232129;
  padding: 0 16px;
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;

  border-width: 2px;
  border-color: #232129;
  ${(props) =>
    props.isErrored &&
    css`
      border-color: crimson;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-family: 'RobotoSlab-regular';
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
