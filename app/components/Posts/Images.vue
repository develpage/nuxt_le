<script setup lang="ts">
const props = defineProps<{
  id: string | number
}>();

const {data: images} = await useAppFetch<any>(`/images/post/${props.id}`)
</script>

<template>
  <div v-if="images">
    <h2>Images</h2>
    <pre>
      {{  images }}
    </pre>
  </div>
</template>
