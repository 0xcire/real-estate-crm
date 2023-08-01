import { Patch, Delete, handleAPIResponse } from '@/lib/fetch';

import type { UpdateAccountOptions } from '../types';
import type { UserResponse } from '@/types';

export const updateAccount = ({
  id,
  data,
}: UpdateAccountOptions): Promise<UserResponse> => {
  return Patch({
    endpoint: `user/${id}`,
    body: JSON.stringify(data),
  }).then(handleAPIResponse<UserResponse>);
};

export const deleteAccount = (id: number): Promise<UserResponse> => {
  return Delete({ endpoint: `user/${id}` }).then(
    handleAPIResponse<UserResponse>
  );
};
