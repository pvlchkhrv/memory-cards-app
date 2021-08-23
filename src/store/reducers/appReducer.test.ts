import {appReducer, setAppError, setAppIsInitialized, setAppStatus} from './appReducer';
import {RequestStatusType} from '../../types/appTypes';

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
        const output = appReducer(startState, setAppError('some error'));
        expect(output.error).toBe('some error');
    });
    it('status change should be implemented correctly', () => {
        const output = appReducer(startState, setAppStatus('succeed'));
        expect(output.status).toBe('succeed');
    });
    it('isInitialized change should be implemented correctly', () => {
        const output = appReducer(startState, setAppIsInitialized(true));
        expect(output.status).toBeTruthy();
    });
});
