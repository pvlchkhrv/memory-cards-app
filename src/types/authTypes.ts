import {setAuthEmail, setAuthInfo, setIsAuth, setIsRegistered, setUserData} from '../store/reducers/authReducer';

export type UserDataType = {
    avatar?: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
};

export type PingResponseType = {
    ping: number;
    backTime: number;
    frontTime: string;
    info: string;
};
export type AuthMeResponseType = UserDataType;
export type LoginResponseType = UserDataType;
export type RegisterResponseType = {
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
};
export type RestoreResponseType = {
    info: string;
    success: boolean;
    answer: boolean;
    html: boolean;
};
export type UpdateProfileResponseType = {
    updatedUser: UserDataType;
    token: string;
    tokenDeathTime: number;
};

export type AuthStateType = {
    user: UserDataType | null,
    isAuth: boolean,
    isRegistered: boolean,
    info: string | null,
    email: string | null,
}

export enum AuthActions {
    SET_USER_DATA = 'SET_USER_DATA',
    SET_IS_AUTH = 'SET_IS_AUTH',
    SET_IS_REGISTERED = 'SET_IS_REGISTERED',
    SET_INFO = 'SET_INFO',
    SET_EMAIL = 'SET_EMAIL',
}

export type LoginPayloadType = {
    email: string,
    password: string,
    rememberMe: boolean,
}

export type RegisterPayloadType = {
    email: string,
    password: string,
}

export type AuthActionsType =
    | ReturnType<typeof setUserData>
    | ReturnType<typeof setIsAuth>
    | ReturnType<typeof setIsRegistered>
    | ReturnType<typeof setAuthInfo>
    | ReturnType<typeof setAuthEmail>
