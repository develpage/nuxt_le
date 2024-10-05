<script setup lang="ts">
import { usePostsRepository } from '~/repository/posts';
import CreatePost from '~/components/Posts/CreatePost.vue';
import PostsList from '~/components/Posts/PostsList.vue';
import type { Post } from '~/types/posts';

const posts = toRef(await usePostsRepository().getPostsAll());

/**
 * @desc Страх?
 */
function addPost(post: Post) {
  posts.value = [post, ...posts.value || []];
}
</script>

<template>
  <div>
    <h1>
      Posts Page
    </h1>
    <CreatePost @create="addPost" />
    <PostsList :posts="posts" />
  </div>
</template>
