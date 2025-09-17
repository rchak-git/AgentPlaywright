// Export interfaces so they can be used anywhere
export interface LoginPageLocators {
  usernameInput: string;
  passwordInput: string;
  loginButton: string;
  forgotPasswordLink?: string; // optional property
}

export type UserCredentials = {
  username: string;
  password: string;
};

/*
export enum UserRole {
  Admin = "Admin",
  Manager = "Manager",
  Guest = "Guest"
}
  */

export type role = 'Admin'|'Manager'|'Guest';

export type user = {
  name: string,
  age: number,
  userRole: role
}