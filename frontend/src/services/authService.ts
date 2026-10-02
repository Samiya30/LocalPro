export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string | null;
}

const TOKEN_KEY = "token";
const USER_KEY = "localpro_user";

export function saveAuthData(
  token: string,
  user: AuthUser
) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser(): AuthUser | null {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as AuthUser;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function hasRole(role: UserRole): boolean {
  const user = getCurrentUser();

  return user?.role === role;
}