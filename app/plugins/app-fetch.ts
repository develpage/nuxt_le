import { createAuthRepository } from '~/repository/auth';
import { createPostsRepository } from '~/repository/posts';

export default defineNuxtPlugin((nuxtApp) => {
    const appFetch = $fetch.create({
      baseURL: useRuntimeConfig().public.apiBaseUrl,
      onRequest({ options }) {
        const metadataObject: Record<string, string> = {
            'Accept': 'application/json',
        };

        if (useAuthStore().accessToken) {
            metadataObject['Authorization'] = `Bearer ${useAuthStore().accessToken}`;
        }

        for (const key in metadataObject) {
            options.headers.set(key, metadataObject[key] as string);
        }
      },
      async onResponseError({ response }) {
        if (response.status === 401) {
          await nuxtApp.runWithContext(() => navigateTo('/login'))
        }
      }
    });

    const api = {
      auth: createAuthRepository(appFetch),
      posts: createPostsRepository(appFetch)
    };
  
    return {
      provide: {
        appFetch,
        api,
      },
    };
  });
