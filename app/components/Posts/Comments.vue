<script setup lang="ts">
const props = defineProps<{
  id: string | number
}>();

const {data: comments} = await useAppFetch<any>(`/comments/post/${props.id}`)
</script>

<template>
  <div v-if="comments">
    <h2>Comment</h2>
    <pre>
      {{  comments }}
    </pre>
  </div>
</template>
