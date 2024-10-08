<script setup lang="ts">
import type { NewPost, Post } from '~/types/posts';

const INITIAL_MODEL = {
  content: '',
  url: '',
  title: '',
};

const emit = defineEmits<{
  (event: 'create'): void;
}>();

const dialogRef = useTemplateRef<HTMLDialogElement>('dialogRef');

const model = ref<NewPost>({...INITIAL_MODEL});

function dialogOpen() {
  dialogRef.value?.showModal();
}

function dialogClose() {
  dialogRef.value?.close();
  model.value = {...INITIAL_MODEL};
}

async function handleSubmitForm() {
  const post = await useNuxtApp().$api.posts.createPost(unref(model));

  if (post) {
    emit('create');
    dialogClose();
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
      <form @submit.prevent="handleSubmitForm">
        <input
          id="title"
          v-model="model.title"
          name="title"
          type="text"
          placeholder="title"
          minlength="1"
          maxlength="255"
          required
        >
        <br>
        <input
          id="url"
          v-model="model.url"
          name="url"
          type="text"
          placeholder="url"
          minlength="5"
          maxlength="255"
          required
        >
        <br>
        <textarea
          id="content"
          v-model="model.content"
          name="content"
          placeholder="content"
          required
          minlength="25"
          maxlength="1000"
        ></textarea>
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
