<script setup lang="ts">
const aurhStore = useAuthStore();

const model = reactive({
  login: '',
  password: '',
});

async function onSubmitForm() {
  
  const isSuccess = await aurhStore.login(model);
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
    <form @submit.prevent="onSubmitForm">
      <input
        id="login"
        v-model="model.login"
        name="login"
        type="text"
        placeholder="login"
        required
      >
      <br>
      <input
        id="password"
        v-model="model.password"
        name="password"
        type="password"
        placeholder="password"
        required
      >
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
