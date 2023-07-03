'use client';

import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';

export interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => (
  <SessionProvider>{children}</SessionProvider>
);

export default AuthProvider;
