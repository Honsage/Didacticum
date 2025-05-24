export type UserRole = 'teacher' | 'student';

export interface BaseUser {
    email: string;
    firstName: string;
    lastName?: string;
    middleName?: string;
    organization?: string;
    role: UserRole;
}

export interface RegisterUser extends BaseUser {
    password: string;
}

export interface StoredUser extends Required<BaseUser> {
    password: string;
} 