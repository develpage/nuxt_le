<script setup lang="ts">
const {data: posts, refresh} = await useAsyncData(() => useNuxtApp().$api.posts.getPostsAll());
</script>

<template>
  <div>
    <h1>
      Posts Page
    </h1>
    <PostsCreate @create="refresh" />
    <PostsList :posts="posts" />
  </div>
</template>
