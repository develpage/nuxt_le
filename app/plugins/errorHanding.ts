import { FetchError } from 'ofetch';

export default defineNuxtPlugin((_) => {
  const errorHanding = async (action: () => Promise<any>) => {
    return action()
      .catch((error: FetchError) => {
        if (error.statusCode === 404) {
          const errorData = {
            fatal: true,
            statusCode: 404,
            message: `Page not found`,
          };

          if (import.meta.server) {
            throw createError(errorData); // НЕ работает на серверной стороне
          } else {
            showError(errorData); // Работает на клиентской
          }
        }

        throw error;
      }
    );
  }

  return {
    provide: {
      errorHanding,
    },
  };
});
