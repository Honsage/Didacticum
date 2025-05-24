export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    role: UserRole;
    organization?: string;
    avatar?: string;
}

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

export interface RegisterUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    role?: UserRole;
    organization?: string;
}

export interface BaseUser {
    email: string;
    firstName: string;
    lastName?: string;
    middleName?: string;
    organization?: string;
    role: UserRole;
}

export interface StoredUser extends Required<BaseUser> {
    password: string;
} 