<script lang="ts" setup>
const route = useRoute()
const { data, error } = await useFetch(`/api/blog/${route.params.id}`)

if (error.value) {
  throw createError({ statusCode: 404, message: 'Post not found', fatal: true })
}

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <article v-if="data">
    <NuxtLink to="/" class="back-link">← All posts</NuxtLink>
    <header class="post-header">
      <h1 class="post-title">{{ data.post.title }}</h1>
      <time class="post-meta">{{ formatDate(data.post.createdAt) }}</time>
    </header>
    <div class="post-body">{{ data.post.body }}</div>
    <nav class="post-nav">
      <NuxtLink v-if="data.prev" :to="`/blog/${data.prev.id}`" class="nav-link nav-prev">
        <span class="nav-label">← Older</span>
        <span class="nav-title">{{ data.prev.title }}</span>
      </NuxtLink>
      <span v-else class="nav-placeholder" />
      <NuxtLink v-if="data.next" :to="`/blog/${data.next.id}`" class="nav-link nav-next">
        <span class="nav-label">Newer →</span>
        <span class="nav-title">{{ data.next.title }}</span>
      </NuxtLink>
      <span v-else class="nav-placeholder" />
    </nav>
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

.post-nav {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e8e8e4;
}

.nav-link {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  text-decoration: none;
  max-width: 45%;
}

.nav-link:hover .nav-title {
  opacity: 0.55;
}

.nav-next {
  align-items: flex-end;
  text-align: right;
}

.nav-label {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.75rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.nav-title {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.9rem;
  transition: opacity 0.15s;
}

.nav-placeholder {
  flex: 1;
}
</style>
