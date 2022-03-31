import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import Backend from './helpers/backend';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch | any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;