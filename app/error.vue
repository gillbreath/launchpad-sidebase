<script lang="ts" setup>
const error = useError()
const is404 = computed(() => error.value?.statusCode === 404)
</script>

<template>
  <div class="site">
    <header class="site-header">
      <NuxtLink to="/" class="site-title">Elias Carlston</NuxtLink>
    </header>
    <main class="site-main">
      <p class="code">{{ error?.statusCode }}</p>
      <h1 class="heading">{{ is404 ? 'Page not found' : 'Something went wrong' }}</h1>
      <p class="message">{{ is404 ? 'The post you\'re looking for doesn\'t exist.' : error?.message }}</p>
      <NuxtLink to="/" class="home-link">← Back to all posts</NuxtLink>
    </main>
  </div>
</template>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Georgia, 'Times New Roman', serif;
  background: #fafaf8;
  color: #1a1a1a;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
}
</style>

<style scoped>
.site {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e8e8e4;
}

.site-title {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: -0.01em;
}

.site-title:hover {
  opacity: 0.65;
}

.site-main {
  flex: 1;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

.code {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 0.75rem;
}

.heading {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.message {
  color: #666;
  margin-bottom: 2.5rem;
}

.home-link {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.85rem;
  text-decoration: none;
  color: #999;
}

.home-link:hover {
  color: #1a1a1a;
}
</style>
