import { useEffect } from 'react';
import { useSelector } from './useSelector';
import { useDispatch } from './useDispatch';
import { authService } from '../services/auth.service';
import { setProfile } from '../store/slices/user.slice';

export const useProfile = () => {
    const dispatch = useDispatch();
    const { auth, profile } = useSelector(state => state.user);
    const isAuthenticated = !!auth.token && !!auth.expiresAt && Date.now() < auth.expiresAt;

    useEffect(() => {
        const loadProfile = async () => {
            if (isAuthenticated && auth.token && !profile) {
                try {
                    const userProfile = await authService.getProfile(auth.token);
                    if (userProfile) {
                        dispatch(setProfile(userProfile));
                    }
                } catch (error) {
                    console.error('Error loading profile:', error);
                }
            }
        };

        loadProfile();
    }, [isAuthenticated, auth.token, profile, dispatch]);

    return { profile, isLoading: isAuthenticated && !profile };
}; 