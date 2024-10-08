<script setup lang="ts">
const aurhStore = useAuthStore();
</script>

<template>
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <NuxtLink to="/">
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/posts">
              Posts
            </NuxtLink>
          </li>
          <li v-if="aurhStore.isUserAuth">
            <NuxtLink to="/posts/my">
              My Posts
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              v-if="!aurhStore.isUserAuth"
              to="/login"
            >
              Login
            </NuxtLink>
            <a
              v-else
              href=""
              @click.prevent="aurhStore.logout"
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
