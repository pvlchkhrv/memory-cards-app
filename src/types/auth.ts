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
