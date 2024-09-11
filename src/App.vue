<script setup lang="ts">
import Search from './components/Search.vue'
import AppList from './components/AppList.vue'
import Recommend from './components/Recommend.vue'
</script>

<template>
  <Search />
  <Recommend />
  <AppList />
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>
