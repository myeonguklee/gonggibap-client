import { BaseResponse } from '@/types/apiResponse';
import { UserInfo } from '@/types/userInfo';

import { client } from '@/apis/core/client';


export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await client.get<BaseResponse<UserInfo>>({
    url: '/users',
  });
  return response.data;
};
