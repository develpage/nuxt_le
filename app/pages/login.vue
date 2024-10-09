<script setup lang="ts">
import { useForm } from '~/composables/useForm';

const aurhStore = useAuthStore();
const {form, errors, onSubmit} = useForm<Record<'login' | 'password', string>>({login: '', password: ''});

async function onSubmitForm() {
  const isSuccess = await aurhStore.login({...unref(form)});

  if (isSuccess) {
    document.location = '/';
  }
}
</script>

<template>
  <div v-if="!aurhStore.isUserAuth">
    <h1>
      Login Page
    </h1>
    <form @submit.prevent="onSubmit(onSubmitForm)">
      <input
        id="login"
        v-model="form.login"
        name="login"
        type="text"
        placeholder="login"
        required
      >
      <br>
      <span
        v-if="errors?.login"
        style="color: red;"
      >
        {{ errors.login }}
      </span>
      <br>
      <input
        id="password"
        v-model="form.password"
        name="password"
        type="password"
        placeholder="password"
        required
      >
      <br>
      <span
        v-if="errors?.password"
        style="color: red;"
      >
        {{ errors.password }}
      </span>
      <br>
      <button type="submit">
        Submit
      </button>
    </form>
  </div>
  <div v-else>
    <h2>
      You already login
    </h2>
  </div>
</template>
