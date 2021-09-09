import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootStateType} from '../store/reducers';

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
