import React, { useMemo, useState } from 'react';
import { AuthType } from '../common/types/AuthType';
import * as authService from '../services/auth';

type LoginAuthType = { username: string; password: string };

type ContextType = {
  user: AuthType | null;
  setUser: React.Dispatch<React.SetStateAction<AuthType | null>>;
  login: ({ username, password }: LoginAuthType) => Promise<void>;
};

export const AuthContext = React.createContext<ContextType>({
  user: null,
  setUser: () => {},
  login: async () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<AuthType | null>(null);

  const login = async ({ username, password }: LoginAuthType) => {
    await authService.login({ username, password });

    setUser({ username, password });
  };

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      login,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
