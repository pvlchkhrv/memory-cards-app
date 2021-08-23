import {authMe, authReducer, setIsAuth, setUserData} from './authReducer';
import {UserDataType} from '../../types/authTypes';

let startState: any;

beforeEach(() => {
    startState = {
        isAuth: false,
        user: null,
    }
});

describe('check if auth-reducer implements correctly', () => {
    it('isAuth is set correctly', () => {
        const output = authReducer(startState, setIsAuth(true));
        expect(output.isAuth).toBeTruthy();
    });
    it('userData should be changed', () => {
        const user = {
            '_id': '60b93fcf2cd90a0004a220ec',
            'email': 'panich2303@gmail.com',
            'rememberMe': false,
            'isAdmin': false,
            'name': 'Lynx',
            'verified': false,
            'publicCardPacksCount': 7,
            'created': '2021-06-03T20:47:11.522Z',
            'updated': '2021-07-16T07:44:38.172Z',
            '__v': 0,
            'token': 'ac1e8eb0-e609-11eb-9233-978b0ff933f1',
            'tokenDeathTime': 1626432278172,
            'avatar': ''
        }
        const output = authReducer(startState, setUserData(user));
        expect(output.user?._id).toBe('60b93fcf2cd90a0004a220ec');
        expect(output.user?.token).toBe('ac1e8eb0-e609-11eb-9233-978b0ff933f1');
        expect(output.user).toHaveProperty('avatar');
    });
});
