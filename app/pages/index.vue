<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans">

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="/" class="text-xl font-bold text-gray-900 tracking-tight">The Daily Read</a>
        <nav class="hidden sm:flex gap-6 text-sm font-medium text-gray-600">
          <a href="#" class="hover:text-gray-900 transition-colors">Home</a>
          <a href="#" class="hover:text-gray-900 transition-colors">About</a>
        </nav>
        <button class="sm:hidden text-gray-600 hover:text-gray-900">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Hero -->
    <section class="bg-white border-b border-gray-200 py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-2">Latest Stories</p>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight max-w-2xl">
          Ideas worth reading, every day.
        </h1>
      </div>
    </section>

    <!-- Main content + sidebar -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex flex-col lg:flex-row gap-10">

        <!-- Blog post list -->
        <section class="flex-1 min-w-0">

          <!-- Loading -->
          <div v-if="pending" class="flex flex-col gap-6">
            <div v-for="i in 3" :key="i" class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
              <div class="h-48 bg-gray-200" />
              <div class="p-6 flex flex-col gap-3">
                <div class="h-3 bg-gray-200 rounded w-1/4" />
                <div class="h-5 bg-gray-200 rounded w-3/4" />
                <div class="h-3 bg-gray-200 rounded w-full" />
                <div class="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          </div>

          <!-- Error -->
          <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-600 text-sm">
            Failed to load posts: {{ error.message }}
          </div>

          <!-- Empty -->
          <div v-else-if="!posts.length" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center text-gray-400 text-sm">
            No posts yet. Add some records to the Blog table to see them here.
          </div>

          <template v-else>
            <!-- Featured post (first result) -->
            <article class="mb-10 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
              <div class="h-56 sm:h-72 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-end p-6">
                <span class="bg-white text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full">Featured</span>
              </div>
              <div class="p-6">
                <div class="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span>{{ formatDate(posts[0].publishedAt ?? posts[0].createdAt) }}</span>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors leading-snug">
                  <a href="#">{{ posts[0].title }}</a>
                </h2>
                <p class="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{{ posts[0].body }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-300 to-purple-400" />
                    <span class="text-sm font-medium text-gray-700">{{ posts[0].author }}</span>
                  </div>
                  <a href="#" class="text-sm font-semibold text-indigo-600 hover:underline">Read more →</a>
                </div>
              </div>
            </article>

            <!-- Remaining posts grid -->
            <div v-if="posts.length > 1" class="grid sm:grid-cols-2 gap-6">
              <article
                v-for="post in posts.slice(1)"
                :key="post.id"
                class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group"
              >
                <div class="h-40 bg-gradient-to-br from-indigo-300 to-purple-400" />
                <div class="p-5 flex flex-col flex-1">
                  <div class="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <span>{{ formatDate(post.publishedAt ?? post.createdAt) }}</span>
                  </div>
                  <h3 class="text-base font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
                    <a href="#">{{ post.title }}</a>
                  </h3>
                  <p class="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">{{ post.body }}</p>
                  <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span class="text-xs text-gray-500 font-medium">{{ post.author }}</span>
                    <a href="#" class="text-xs font-semibold text-indigo-600 hover:underline">Read →</a>
                  </div>
                </div>
              </article>
            </div>
          </template>
        </section>

        <!-- Sidebar -->
        <aside class="w-full lg:w-72 shrink-0 flex flex-col gap-6">

          <!-- Search -->
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h4 class="text-sm font-bold text-gray-900 mb-3">Search</h4>
            <div class="relative">
              <input
                type="text"
                placeholder="Search articles..."
                class="w-full text-sm border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              >
              <svg class="w-4 h-4 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="bg-indigo-600 rounded-2xl p-5 text-white">
            <h4 class="text-sm font-bold mb-1">Stay in the loop</h4>
            <p class="text-xs text-indigo-200 mb-4 leading-relaxed">Get the best articles delivered to your inbox, weekly.</p>
            <input
              type="email"
              placeholder="you@example.com"
              class="w-full text-sm rounded-lg px-3 py-2 text-gray-800 focus:outline-none mb-2"
            >
            <button class="w-full bg-white text-indigo-600 text-sm font-semibold rounded-lg py-2 hover:bg-indigo-50 transition-colors">
              Subscribe
            </button>
          </div>

          <!-- Recent posts -->
          <div v-if="posts.length" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h4 class="text-sm font-bold text-gray-900 mb-4">Recent Posts</h4>
            <ul class="flex flex-col gap-4">
              <li v-for="post in posts.slice(0, 3)" :key="post.id" class="flex gap-3">
                <div class="w-12 h-12 rounded-lg shrink-0 bg-gradient-to-br from-indigo-300 to-purple-400" />
                <div class="min-w-0">
                  <a href="#" class="text-xs font-semibold text-gray-800 hover:text-indigo-600 transition-colors leading-snug line-clamp-2">{{ post.title }}</a>
                  <p class="text-xs text-gray-400 mt-0.5">{{ formatDate(post.publishedAt ?? post.createdAt) }}</p>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <span>© {{ new Date().getFullYear() }} The Daily Read. All rights reserved.</span>
        <div class="flex gap-5">
          <a href="#" class="hover:text-gray-700 transition-colors">Twitter</a>
          <a href="#" class="hover:text-gray-700 transition-colors">RSS</a>
          <a href="#" class="hover:text-gray-700 transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { $client } = useNuxtApp()

const { data, pending, error } = await $client.blog.list.useQuery()

const posts = computed(() => data.value ?? [])

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
