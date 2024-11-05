export interface UserInfo {
  userId: number;
  name: string;
  email: string;
  userRole: UserRole;
}

export type UserRole = 'ADMIN' | 'USER';
