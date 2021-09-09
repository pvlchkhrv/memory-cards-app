import {IUser} from '../../../models/IUser';

interface PingResponse {
    ping: number;
    backTime: number;
    frontTime: string;
    info: string;
}

type AuthMeResponse = IUser
type LoginResponse = IUser

interface RegisterResponse {
    addedUser: {
        _id: string;
        email: string;
        rememberMe: boolean;
        isAdmin: boolean;
        name: string;
        verified: boolean;
        publicCardPacksCount: number;
        created: Date;
        updated: Date;
        __v: number;
    }
}

interface RestoreResponse {
    info: string;
    success: boolean;
    answer: boolean;
    html: boolean;
}

interface UpdateProfileResponse {
    updatedUser: IUser;
    token: string;
    tokenDeathTime: number;
}

interface AuthState {
    user: IUser,
    isAuth: boolean,
    info: string,
}

export enum AuthActionEnum {
    SET_USER_DATA = 'SET_USER_DATA',
    SET_IS_AUTH = 'SET_IS_AUTH',
    SET_INFO = 'SET_INFO',
}

interface SetUserData {
    type: AuthActionEnum.SET_USER_DATA;
    payload: IUser
}

interface SetIsAuth {
    type: AuthActionEnum.SET_IS_AUTH;
    payload: boolean;
}

interface SetAuthInfo {
    type: AuthActionEnum.SET_INFO;
    payload: string
}

interface LoginPayload {
    email: string,
    password: string,
    rememberMe: boolean,
}

interface RegisterPayload {
    email: string,
    password: string,
}

type AuthAction =
    | SetUserData
    | SetIsAuth
    | SetAuthInfo

export type {
    AuthState,
    AuthAction,
    SetUserData,
    SetIsAuth,
    SetAuthInfo,
    LoginPayload,
    RegisterPayload,
    PingResponse,
    AuthMeResponse,
    LoginResponse,
    RegisterResponse,
    RestoreResponse,
    UpdateProfileResponse,
}
