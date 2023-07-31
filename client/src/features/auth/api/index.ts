import type { SigninCredentials, SignupCredentials } from '@/features/auth';
import { Get, Post, handleAPIResponse } from '@/lib/fetch';

import type { UserResponse } from '@/types';

export const getMe = async (): Promise<UserResponse> => {
  return Get({ endpoint: 'user/me' }).then(handleAPIResponse<UserResponse>);
};

export const signin = async (
  credentials: SigninCredentials
): Promise<UserResponse> => {
  return Post({
    endpoint: 'auth/signin',
    body: JSON.stringify(credentials),
  }).then(handleAPIResponse<UserResponse>);
};

export const signup = async (
  credentials: SignupCredentials
): Promise<UserResponse> => {
  return Post({
    endpoint: 'auth/signup',
    body: JSON.stringify(credentials),
  }).then(handleAPIResponse<UserResponse>);
};

export const signout = async (): Promise<Response> => {
  const response = await Post({
    endpoint: 'auth/signout',
    body: undefined,
  });
  return response;
};
