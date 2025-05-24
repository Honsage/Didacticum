import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../types/user.types';

interface UserState {
    profile: UserProfile | null;
    auth: {
        token: string | null;
        expiresAt: number | null;
    };
}

const initialState: UserState = {
    profile: null,
    auth: {
        token: null,
        expiresAt: null
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<{ token: string; expiresIn: number }>) {
            state.auth.token = action.payload.token;
            state.auth.expiresAt = Date.now() + action.payload.expiresIn * 1000;
        },
        setProfile(state, action: PayloadAction<UserProfile>) {
            state.profile = action.payload;
        },
        logout(state) {
            state.profile = null;
            state.auth = { token: null, expiresAt: null };
        }
    }
});

export const { setToken, setProfile, logout } = userSlice.actions;

export default userSlice.reducer; 