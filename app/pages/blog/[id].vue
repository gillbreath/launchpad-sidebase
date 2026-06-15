<script lang="ts" setup>
const route = useRoute()
const { data: post } = await useFetch(`/api/blog/${route.params.id}`)

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <article v-if="post">
    <NuxtLink to="/" class="back-link">← All posts</NuxtLink>
    <header class="post-header">
      <h1 class="post-title">{{ post.title }}</h1>
      <time class="post-meta">{{ formatDate(post.createdAt) }}</time>
    </header>
    <div class="post-body">{{ post.body }}</div>
  </article>
</template>

<style scoped>
.back-link {
  display: inline-block;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.85rem;
  text-decoration: none;
  color: #999;
  margin-bottom: 2.5rem;
}

.back-link:hover {
  color: #1a1a1a;
}

.post-header {
  margin-bottom: 2.5rem;
}

.post-title {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin-bottom: 0.6rem;

  @media (min-width: 640px) {
    font-size: 2.25rem;
  }
}

.post-meta {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.85rem;
  color: #999;
}

.post-body {
  white-space: pre-wrap;
  font-size: 1.0625rem;
  line-height: 1.8;
}
</style>
