<script lang="ts" setup>
const { data: posts } = await useFetch('/api/blog')

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <div>
    <h1 class="page-title">Writing</h1>
    <ul class="post-list">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <NuxtLink :to="`/blog/${post.id}`" class="post-link">
          <span class="post-title">{{ post.title }}</span>
          <time class="post-date">{{ formatDate(post.createdAt) }}</time>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page-title {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 2rem;
}

.post-list {
  list-style: none;
}

.post-item {
  border-bottom: 1px solid #e8e8e4;
}

.post-item:first-child {
  border-top: 1px solid #e8e8e4;
}

.post-link {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding: 0.85rem 0;
  text-decoration: none;
}

.post-link:hover .post-title {
  opacity: 0.55;
}

.post-title {
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  transition: opacity 0.15s;
}

.post-date {
  font-size: 0.8rem;
  color: #999;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

@media (max-width: 480px) {
  .post-link {
    flex-direction: column;
    gap: 0.15rem;
  }
}
</style>
