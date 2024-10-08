import type { UserAuthData } from '~/types/user';
import type {$Fetch, NitroFetchRequest} from 'nitropack';

export const createAuthRepository = <T>(appFetch: $Fetch<T, NitroFetchRequest>) => {
    return {
        login(payload: UserAuthData) {
            return appFetch<LoginResponseData>('/auth/login', {method: 'POST', body: payload});
        },
    };
};

export interface LoginResponseData {
    user: UserData;
    token: string;
}

export interface UserData {
    id: number
    login: string
    createdAt: string
    updatedAt: string
}
  
