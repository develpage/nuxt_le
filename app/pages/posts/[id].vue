<script setup lang="ts">
import type { Post } from '~/types/posts';

const id = useRoute().params.id as string;
const {data: post, error} = await useAsyncData<Post>(
  (nuxtApp) => nuxtApp!.$errorHandler(nuxtApp!.$api.posts.getPost(id)), // Интересно когда в колбеке useAsyncData может не быть nuxtApp
  {
    watch: [() => id]
  }
);

// if (error.value) {
//   throw createError({...error.value, fatal: true});
// }
</script>

<template>
  <div>
    <h1>
      Post - {{ post?.title }}
    </h1>
    <!-- {{ error?.statusCode }} -->
    <p>
      {{ post?.content }}
    </p>
    <br>
    <PostsImages :id="id" />
    <PostsComments :id="id" />
    <NuxtLink to="/posts">
      Back to posts
    </NuxtLink>
    <NuxtLink :to="{name: 'posts-id', params: {id: +(id as string) - 1}}"> |
      Prev
    </NuxtLink>
    <NuxtLink :to="{name: 'posts-id', params: {id: +(id as string) + 1}}"> |
      Next
    </NuxtLink>
  </div>
</template>
