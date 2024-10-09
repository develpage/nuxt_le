export function useForm<T>(model: T | Ref<T>) {
  const form = ref<T>(isRef(model) ? unref(model) : model);
  const errors = ref<Record<keyof T, string> | null>(null);
  const isPending = ref<boolean>(false);

  // Тут коненчо нужно доработать для получения читаемых ошибок, но лучше это в утилиты
  // А лучше чтобы бэкенд слал уже человекочитаемые ошибки
  function normalizeErros(errors: [string, string][]) {
    return Object.fromEntries(errors);
  }

  async function onSubmit(submitHandler: () => Promise<any>) {
    isPending.value = true;

    try {
      await submitHandler();
      errors.value = null;

    } catch (error: any) {
      console.error(error);
      errors.value = normalizeErros(error.data);

      throw error;
    } finally {
      isPending.value = false;
    }
  }

  return {
    form,
    errors,
    onSubmit,
    isPending,
  }
}
