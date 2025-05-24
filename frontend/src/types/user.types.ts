export type UserRole = 'student' | 'teacher' | 'admin';

export interface BaseUser {
    email: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    organization?: string;
    role: UserRole;
}

export interface StoredUser extends BaseUser {
    password: string;
}

export interface RegisterUser extends BaseUser {
    password: string;
    confirmPassword: string;
}

export interface UserProfile extends BaseUser {
    id: string;
}

// Функция для преобразования StoredUser в UserProfile
export const mapStoredUserToProfile = (user: StoredUser): UserProfile => ({
    ...user,
    id: btoa(user.email) // Используем email как основу для id
});

export interface UserPreferences {
    theme: 'light' | 'dark';
    language: 'ru' | 'en';
    notifications: boolean;
}

export interface UserState {
    profile: UserProfile | null;
    auth: {
        token: string | null;
        expiresAt: number | null;
    };
    preferences: UserPreferences;
}

export interface LoginCredentials {
    email: string;
    password: string;
} 