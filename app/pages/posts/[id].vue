<script setup lang="ts">
import type { Post } from '~/types/posts';

const id = useRoute().params.id as string;

// 1. Реализация согласно дз
const {data: post} = await useAsyncData<Post>(
  (nuxtApp) => nuxtApp!.$errorHandler(nuxtApp!.$api.posts.getPost(id)), // Интересно когда в колбеке useAsyncData может не быть nuxtApp
  {
    watch: [() => id]
  }
);

// 2.Можно еще передавать в плагин объект ошибки 
// const {data: post, error} = await useAsyncData<Post>(
//   (nuxtApp) => nuxtApp!.$api.posts.getPost(id),
//   {
//     watch: [() => id]
//   }
// );

// if (error.value) {
//   useNuxtApp().$errorHandler(error.value, {
//     redirectUrl: '/',
//     callback: () => {
//       if (import.meta.client) {
//         alert(error.value?.statusCode);
//       }
//     }
//   });
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
