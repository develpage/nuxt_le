<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
  error: NuxtError<any>
}>();

const isDev = import.meta.dev;
</script>

<template>
  <div v-if="error?.statusCode == 404">
    <h1>Страница не найдена ERROR</h1>
    <NuxtLink to="/">Начните с главной</NuxtLink>
  </div>
  <div v-else>
    Временная ошибка системы, не скучайте, ремонтируем ERROR
  </div>
  <pre v-if="isDev">
    {{ JSON.stringify(error, null, 2) }}
  </pre>
</template>
