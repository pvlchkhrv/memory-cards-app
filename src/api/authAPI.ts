import {instance} from './instance';
import {
    AuthMeResponseType,
    LoginResponseType,
    PingResponseType,
    RegisterResponseType,
    RestoreResponseType,
    UpdateProfileResponseType
} from '../types/auth';

const from = 'pvlchkhrv@gmail.com';
const message = `<div>password recover link: <a href='https://neko-back.herokuapp.com/2.0/set-new-password/$token$'>Link</a></div>`;

export const authAPI = {
    ping() {
        return instance.get<PingResponseType>(`/ping/?frontTime=${Date.now()}`);
    },
    authMe() {
        return instance.post<AuthMeResponseType>('auth/me', {});
    },
    login(payload: { email: string, password: string, rememberMe: boolean }) {
        return instance.post<LoginResponseType>('auth/login', {...payload});
    },
    logout() {
        return instance.delete('auth/me', {});
    },
    register(payload: { email: string, password: string }) {
        return instance.post<RegisterResponseType>(`auth/register`, {...payload});
    },
    restorePassword(payload: { email: string }) {
        return instance.post<RestoreResponseType>('/auth/forgot', {...payload, from, message});
    },
    setNewPassword(payload: { password: string, resetPasswordToken: string }) {
        return instance.post<ResponseType>('auth/new-password', {...payload});
    },
    updateProfile(payload: { name?: string, avatar?: string }) {
        return instance.put<UpdateProfileResponseType>('auth/me', {...payload});
    }
};
