<script setup lang="ts">
import { usePostsRepository } from '~/repository/posts';
import CreatePost from '~/components/Posts/CreatePost.vue';
import PostsList from '~/components/Posts/PostsList.vue';
import type { Post } from '~/types/posts';

const posts = await usePostsRepository().getPostsMy();

function addPost(post: Post) {
  posts.value = [post, ...posts.value || []];
}

// Какая-то фигня, но пока пойдет
watch(() => useUserStore().isUserAuth, (isAuth) => {
  if (!isAuth) {
    useRouter().push('/login');
  }
});
</script>

<template>
  <div>
    <h1>
      My Posts Page
    </h1>
    <CreatePost @create="addPost" />
    <PostsList :posts="posts" />
  </div>
</template>
