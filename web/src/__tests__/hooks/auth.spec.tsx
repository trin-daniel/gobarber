import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { useAuth, AuthProvider } from '../../hooks/auth';
import api from '../../services/api';

const apiMocked = new MockAdapter(api);

describe('Auth hook', () => {
  it('Should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'userid123',
        name: 'conta teste',
        email: 'teste@localhost.com',
      },
      token: 'token.authorization.1233232113',
    };

    apiMocked.onPost('sessions').reply(200, apiResponse);
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    result.current.signIn({
      email: 'teste@localhost.com',
      password: '123456',
    });
    await waitForNextUpdate();
    expect(setItemSpy).toHaveBeenCalledWith(
      '@gobarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@gobarber:user',
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user.email).toEqual('teste@localhost.com');
  });

  it('Should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@gobarber:token':
          return 'token.authorization.1233232113';
        case '@gobarber:user':
          return JSON.stringify({
            id: 'userid123',
            name: 'conta teste',
            email: 'teste@localhost.com',
          });
        default:
          return null;
      }
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    expect(result.current.user.email).toEqual('teste@localhost.com');
  });

  it('Should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@gobarber:token':
          return 'token.authorization.1233232113';
        case '@gobarber:user':
          return JSON.stringify({
            id: 'userid123',
            name: 'conta teste',
            email: 'teste@localhost.com',
          });
        default:
          return null;
      }
    });
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    act(() => {
      result.current.signOut();
    });
    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('Should be able update user data', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    const user = {
      id: 'userid123',
      name: 'conta teste',
      email: 'teste@localhost.com',
      avatar_url: 'localhost:3333/images/profile.jpg',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@gobarber:user',
      JSON.stringify(user),
    );

    expect(result.current.user).toEqual(user);
  });
});
