import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background-color: #ff9000;
  border: none;
  border-radius: 10px;
  color: #312e28;
  padding: 0 16px;
  width: 100%;
  height: 56px;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${shade(0.2, '#ff9000')};
  }
`;
