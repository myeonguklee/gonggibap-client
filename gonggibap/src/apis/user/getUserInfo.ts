import { client } from '@/apis/core/client';
import { BaseResponse } from '@/types/apiResponse';
import { UserInfo } from '@/types/userInfo';

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await client.get<BaseResponse<UserInfo>>({
    url: '/users',
  });
  return response.data;
};
