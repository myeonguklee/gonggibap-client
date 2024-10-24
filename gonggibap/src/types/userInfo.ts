export interface UserInfo {
  id: number;
  name: string;
  email: string;
  userRole: UserRole;
}

export type UserRole = "ADMIN" | "USER";
