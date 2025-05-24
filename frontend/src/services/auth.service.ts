import { getCookie, setCookie, deleteCookie } from '../utils/cookie';
import { RegisterUser, StoredUser, UserProfile, mapStoredUserToProfile } from '../types/user.types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  expiresIn: number;
}

class AuthService {
  private readonly AUTH_COOKIE_NAME = 'auth_token';
  private readonly USERS_STORAGE_KEY = 'mock_users';
  private readonly TOKEN_EXPIRES_IN = 3600; // 1 час

  private getStoredUsers(): StoredUser[] {
    const usersJson = localStorage.getItem(this.USERS_STORAGE_KEY);
    if (!usersJson) {
      // Инициализируем с тестовым пользователем
      const initialUsers: StoredUser[] = [{ 
        email: 'test@test', 
        password: '0000',
        lastName: '',
        firstName: 'Админ',
        middleName: '',
        role: 'teacher',
        organization: ''
      }];
      localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(initialUsers));
      return initialUsers;
    }
    return JSON.parse(usersJson);
  }

  private saveUsers(users: StoredUser[]): void {
    localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));
  }

  async login(credentials: LoginCredentials): Promise<{ token: string; expiresIn: number; profile: UserProfile }> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));

    // Проверка учетных данных
    const users = this.getStoredUsers();
    const user = users.find(u => 
      u.email === credentials.email && 
      u.password === credentials.password
    );

    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    // Генерация временного токена
    const token = btoa(user.email + '_' + Date.now());
    setCookie(this.AUTH_COOKIE_NAME, token, { expires: this.TOKEN_EXPIRES_IN });
    
    // Возвращаем токен и профиль пользователя
    return {
      token,
      expiresIn: this.TOKEN_EXPIRES_IN,
      profile: mapStoredUserToProfile(user)
    };
  }

  async getProfile(token: string): Promise<UserProfile | null> {
    try {
      // Декодируем email из токена
      const decoded = atob(token);
      const email = decoded.split('_')[0];
      
      const users = this.getStoredUsers();
      const user = users.find(u => u.email === email);
      
      if (user) {
        return mapStoredUserToProfile(user);
      }
    } catch (error) {
      console.error('Error getting profile:', error);
    }
    return null;
  }

  async register(data: RegisterUser): Promise<{ token: string; expiresIn: number; profile: UserProfile }> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = this.getStoredUsers();

    // Проверка, не занят ли email
    if (users.some(u => u.email === data.email)) {
      throw new Error('Пользователь с таким email уже существует');
    }

    // Сохраняем нового пользователя
    const newUser: StoredUser = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName || '',
      role: data.role,
      organization: data.organization || ''
    };

    users.push(newUser);
    this.saveUsers(users);

    // Генерация временного токена
    const token = btoa(data.email + '_' + Date.now());
    setCookie(this.AUTH_COOKIE_NAME, token, { expires: this.TOKEN_EXPIRES_IN });
    
    return {
      token,
      expiresIn: this.TOKEN_EXPIRES_IN,
      profile: mapStoredUserToProfile(newUser)
    };
  }

  async logout(): Promise<void> {
    deleteCookie(this.AUTH_COOKIE_NAME);
  }

  getToken(): string | null {
    const token = getCookie(this.AUTH_COOKIE_NAME);
    return token || null;
  }
}

export const authService = new AuthService(); 