import {RequestStatusType} from './types';
import appReducer from './index';
import {AppActionCreators} from './action-creators';

export type appInitialStateType = {
    error: string;
    status: RequestStatusType;
    isInitialized: boolean;
};

let startState: appInitialStateType;

beforeEach(() => {
    startState = {
        error: '',
        status: 'idle',
        isInitialized: false,
    }
});

describe('check if app-reducer works correctly', () => {
    it('correct error message should be set', () => {
        const output = appReducer(startState, AppActionCreators.setAppError('some error'));
        expect(output.error).toBe('some error');
    });
    it('status change should be implemented correctly', () => {
        const output = appReducer(startState, AppActionCreators.setAppStatus('succeed'));
        expect(output.status).toBe('succeed');
    });
    it('isInitialized change should be implemented correctly', () => {
        const output = appReducer(startState, AppActionCreators.setAppIsInitialized(true));
        expect(output.status).toBeTruthy();
    });
});
