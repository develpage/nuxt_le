<script setup lang="ts">
import { usePostsRepository } from '~/repository/posts';
const route = useRoute();
const post = await usePostsRepository().getPost(route.params.id as string);
</script>

<template>
  <div>
    <h1>
      Post - {{ post?.title }}
    </h1>
    <p>
      {{ post?.content }}
    </p>
    <q>
      {{ post?.User?.login || '' }}
    </q>
    <br>
    <NuxtLink to="/posts">
      Back
    </NuxtLink>
  </div>
</template>
