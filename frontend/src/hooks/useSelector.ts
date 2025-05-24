import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../store/store';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector; 