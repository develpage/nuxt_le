<script setup lang="ts">
import type { Post } from '~/types/posts';

defineProps<{
  posts: Post[] | undefined
}>();
</script>

<template>
  <ul v-if="posts?.length">
    <li>
      {{ posts.length }}
    </li>
    <li
      v-for="post in posts"
      :key="post.id"
    >
      <PostsItem :post="post" />
    </li>
  </ul>

  <h2 v-else>
    Posts not found
  </h2>
</template>
