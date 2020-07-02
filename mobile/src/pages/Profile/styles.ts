import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  justify-content: flex-start;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;

  position: relative;
`;
export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f4ede8;
  margin: 24px 0;
`;
export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  align-self: center;
`;
export const UserAvatar = styled.Image`
  width: 188px;
  height: 188px;
  border-radius: 96px;

  align-self: center;
`;
