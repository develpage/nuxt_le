<script setup lang="ts">
const userStore = useUserStore();

const model = ref({
  login: '',
  password: '',
});

async function onSubmitForm() {
  
  const isSuccess = await useUserStore().login(unref(model));
  if (isSuccess) {
    useRouter().back(); // Какая-то фигня
  }
}
</script>

<template>
  <div v-if="!userStore.isUserAuth">
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
