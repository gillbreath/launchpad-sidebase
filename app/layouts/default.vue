<template>
  <div class="site">
    <header class="site-header">
      <NuxtLink to="/" class="site-title">Elias Carlston</NuxtLink>
    </header>
    <main class="site-main">
      <slot />
    </main>
    <footer class="site-footer">
      <span>© {{ new Date().getFullYear() }} Elias Carlston</span>
    </footer>
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
  font-size: 1.0625rem;
  line-height: 1.75;
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
  padding: 3rem 1.5rem 4rem;
}

.site-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #e8e8e4;
  font-size: 0.8rem;
  color: #999;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
</style>
