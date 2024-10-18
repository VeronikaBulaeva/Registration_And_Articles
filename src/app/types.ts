export interface AuthType {
  username: string;
  password: string;
}

export interface AuthResponse {
  refresh: string;
  access: string;
}

export interface BaseUserType {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

export interface RegistrationType extends BaseUserType {
  password: string;
}

export interface User extends BaseUserType {
  id: number;
}

export interface ChangePasswordType {
  old_password: string;
  password: string;
  confirmed_password: string;
}
