<script setup lang="ts">
const {data: posts, refresh} = await useAsyncData(() => useNuxtApp().$api.posts.getPostsMy());
</script>

<template>
  <div>
    <h1>
      My Posts Page
    </h1>
    <PostsCreate @create="refresh" />
    <PostsList :posts="posts" />
  </div>
</template>
