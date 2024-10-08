import { defineStore } from 'pinia';
import type { UserAuthData } from '~/types/user';

export const useAuthStore = defineStore('authStore', () => {
    const token = ref<string | null>(useCookie('access_token').value || null);

    const accessToken = computed(() => token.value || '');
    const isUserAuth = computed(() => !!token.value);

    async function login(payload: UserAuthData) {
        const data = await useNuxtApp().$api.auth.login(payload);

        token.value = data?.token ?? null;

        if (token.value) {
            useCookie('access_token', {sameSite: true, expires: new Date(new Date().setHours(24))}).value = token.value;
        }

        return !!token.value;
    }

    function logout() {
        token.value = null;
        useCookie('access_token').value = '';
    }

    return {
        accessToken,
        isUserAuth,
        login,
        logout,
    };
});
