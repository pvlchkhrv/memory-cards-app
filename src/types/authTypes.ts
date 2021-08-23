import {setIsAuth, setUserData} from '../store/reducers/authReducer';
import {setAppIsInitialized} from '../store/reducers/appReducer';

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
    isAuth: boolean
}

export enum AuthActions {
    SET_USER_DATA= 'SET_USER_DATA',
    SET_IS_AUTH= 'SET_IS_AUTH',
}

export type LoginPayloadType = {
    email: string,
    password: string,
    rememberMe: boolean,
}

export type AuthActionsType = ReturnType<typeof setUserData> | ReturnType<typeof setIsAuth>
