import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@gobarber:token');
    const user = localStorage.getItem('@gobarber:user');

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }
    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { token, user } = response.data;
    localStorage.setItem('@gobarber:token', token);
    localStorage.setItem('@gobarber:user', JSON.stringify(user));
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@gobaber:token');
    localStorage.removeItem('@gobarber:user');
    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an  AuthProvider');
  }
  return context;
}
