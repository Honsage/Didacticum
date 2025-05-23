import { setCookie, getCookie } from '../../utils/cookie';

interface User {
  email: string;
  password: string;
}

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  setCookie('users', JSON.stringify(users), { expires: 30 * 24 * 3600 }); // 30 days
};

export const getUsers = (): User[] => {
  const usersJson = getCookie('users');
  return usersJson ? JSON.parse(usersJson) : [];
};

export const findUser = (email: string, password: string): boolean => {
  const users = getUsers();
  return users.some(user => user.email === email && user.password === password);
};

export const isEmailTaken = (email: string): boolean => {
  const users = getUsers();
  return users.some(user => user.email === email);
};

export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  return { isValid: true, message: '' };
}; 