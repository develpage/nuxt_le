<script setup lang="ts">
import { useForm } from '~/composables/useForm';
// import type { NewPost, Post } from '~/types/posts';

const INITIAL_MODEL = {
  content: '',
  url: '',
  title: '',
};

const emit = defineEmits<{
  (event: 'create'): void;
}>();

const {form, errors, onSubmit} = useForm<typeof INITIAL_MODEL>({...INITIAL_MODEL});

const dialogRef = useTemplateRef<HTMLDialogElement>('dialogRef');

function dialogOpen() {
  dialogRef.value?.showModal();
}

function dialogClose() {
  dialogRef.value?.close();
  form.value = {...INITIAL_MODEL};
}

async function handleSubmitForm() {
  try {
    const post = await useNuxtApp().$api.posts.createPost({...unref(form)});

    if (post) {
      emit('create');
      dialogClose();
    }
  } catch (error) {
    useNuxtApp().$errorHandler(error, {
      redirectUrl: '/login',
    });
  }
}
</script>

<template>
  <div>
    <button
      v-if="dialogRef"
      @click="dialogOpen"
    >
      Add Post
    </button>
    <dialog ref="dialogRef">
      <form @submit.prevent="onSubmit(handleSubmitForm)">
        <input
          id="title"
          v-model="form.title"
          name="title"
          type="text"
          placeholder="title"
        >
        <br>
        <span
          v-if="errors?.title"
          style="color: red;"
        >
          {{ errors.title }}
        </span>
        <br>
        <input
          id="url"
          v-model="form.url"
          name="url"
          type="text"
          placeholder="url"
        >
        <br>
        <span
          v-if="errors?.url"
          style="color: red;"
        >
          {{ errors.url }}
        </span>
        <br>
        <textarea
          id="content"
          v-model="form.content"
          name="content"
          placeholder="content"
        ></textarea>
        <br>
        <span
          v-if="errors?.content"
          style="color: red;"
        >
          {{ errors.content }}
        </span>
        <br>
        <button type="submit">
          Send
        </button>
        <button
          type="button"
          @click="dialogClose"
        >
          Close
        </button>
      </form>
    </dialog>
  </div>
</template>
