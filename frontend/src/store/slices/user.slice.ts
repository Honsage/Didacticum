import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../types/user.types';
import { authService } from '../../services/auth.service';

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
            if (auth.expiresAt && Date.now() < auth.expiresAt) {
                return auth;
            }
            localStorage.removeItem('auth');
            localStorage.removeItem('user_profile');
        }
    } catch (error) {
        console.error('Error loading auth from storage:', error);
    }
    return { token: null, expiresAt: null };
};

const loadProfileFromStorage = (): UserProfile | null => {
    try {
        const storedProfile = localStorage.getItem('user_profile');
        return storedProfile ? JSON.parse(storedProfile) : null;
    } catch (error) {
        console.error('Error loading profile from storage:', error);
        return null;
    }
};

const initialState: UserState = {
    auth: loadAuthFromStorage(),
    profile: loadProfileFromStorage()
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<{ token: string; expiresIn: number }>) => {
            const { token, expiresIn } = action.payload;
            const expiresAt = Date.now() + expiresIn * 1000;
            state.auth = { token, expiresAt };
            localStorage.setItem('auth', JSON.stringify({ token, expiresAt }));
        },
        setProfile: (state, action: PayloadAction<UserProfile>) => {
            state.profile = action.payload;
            localStorage.setItem('user_profile', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.auth = { token: null, expiresAt: null };
            state.profile = null;
            localStorage.removeItem('auth');
            localStorage.removeItem('user_profile');
        },
        loadProfile: (state) => {
            const profile = loadProfileFromStorage();
            if (profile) {
                state.profile = profile;
            }
        }
    }
});

export const { setToken, setProfile, logout, loadProfile } = userSlice.actions;

export default userSlice.reducer; 