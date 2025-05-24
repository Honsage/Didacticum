import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../types/user.types';

interface AuthState {
    token: string | null;
    expiresAt: number | null;
}

interface UserState {
    auth: AuthState;
    profile: UserProfile | null;
}

const loadAuthFromStorage = (): AuthState => {
    try {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            const auth = JSON.parse(storedAuth);
            // Проверяем валидность токена
            if (auth.expiresAt && Date.now() < auth.expiresAt) {
                return auth;
            }
            // Если токен истек, удаляем его из хранилища
            localStorage.removeItem('auth');
        }
    } catch (error) {
        console.error('Error loading auth from storage:', error);
    }
    return { token: null, expiresAt: null };
};

const initialState: UserState = {
    auth: loadAuthFromStorage(),
    profile: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<{ token: string; expiresIn: number }>) => {
            const { token, expiresIn } = action.payload;
            const expiresAt = Date.now() + expiresIn * 1000;
            state.auth = { token, expiresAt };
            // Сохраняем в localStorage
            localStorage.setItem('auth', JSON.stringify({ token, expiresAt }));
        },
        setProfile: (state, action: PayloadAction<UserProfile>) => {
            state.profile = action.payload;
        },
        logout: (state) => {
            state.auth = { token: null, expiresAt: null };
            state.profile = null;
            // Очищаем localStorage
            localStorage.removeItem('auth');
        }
    }
});

export const { setToken, setProfile, logout } = userSlice.actions;
export default userSlice.reducer; 