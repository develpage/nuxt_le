<script setup lang="ts">
import type { Post } from '~/types/posts';

defineProps<{
  post: Post
}>();
</script>

<template>
  <div>
    <h3>
      {{ post.title }}
    </h3>
    <p>
      {{ post.content }}
    </p>
    <NuxtLink :to="{ name: 'posts-id', params: { id: post.id } }">
      see post >
    </NuxtLink>
  </div>
</template>
