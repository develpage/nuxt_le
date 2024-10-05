<script setup lang="ts">
const userStore = useUserStore();
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
          <li v-if="userStore.isUserAuth">
            <NuxtLink to="/posts/my">
              My Posts
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              v-if="!userStore.isUserAuth"
              to="/login"
            >
              Login
            </NuxtLink>
            <a
              v-else
              href=""
              @click.prevent="userStore.logout"
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
