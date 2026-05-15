<script lang="ts" setup>
const { data: tables, status } = await useFetch('/api/crud/tables')
</script>

<template>
  <div class="wrapper">
    <div class="margins" style="padding-top: 3rem;">
      <div class="content">
        <h1 class="heading">
          Database Tables
        </h1>
        <p class="description">
          All tables in the <span style="color: #5BF3C7;">public</span> schema.
        </p>
      </div>

      <div style="margin-top: 2rem;">
        <div v-if="status === 'pending'" style="color: #9CA3AF;">
          Loading...
        </div>
        <div v-else-if="!tables?.length" style="color: #9CA3AF;">
          No tables found.
        </div>
        <table v-else class="tables-list">
          <thead>
            <tr>
              <th>#</th>
              <th>Table Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(table, i) in tables" :key="table">
              <td>{{ i + 1 }}</td>
              <td>{{ table }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="margin-top: 2rem;">
        <NuxtLink href="/" class="hover-underline-animation">
          Back to home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  color: #ffffff;
  background-color: #0E0E10;
}

.margins {
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 1024px) {
    padding-left: 5rem;
    padding-right: 5rem;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.heading {
  font-size: 2.4rem;
  font-weight: 700;
}

.description {
  font-size: 1.125rem;
  color: #9CA3AF;
}

.tables-list {
  border-collapse: collapse;
  width: 100%;
  max-width: 600px;
}

.tables-list th,
.tables-list td {
  text-align: left;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid #1F2937;
}

.tables-list th {
  color: #9CA3AF;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tables-list td {
  font-family: ui-monospace, monospace;
}

.tables-list tr:last-child td {
  border-bottom: none;
}

.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: #5BF3C7;
  text-decoration: none;
}

.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #5BF3C7;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
