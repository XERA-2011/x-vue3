<script setup lang="ts">
import { appStore } from '@/store'
const app = appStore()
</script>

<template>
  <div class="search-wrap">
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input type="text" placeholder="Search..." v-model="app.searchQuery">
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.search-box {
  font-size: 24px;
  color: #7a7a7a;
  margin: 20px 10px;
  position: relative;

  >input {
    font-size: 24px;
    height: 50px;
    padding: 0 50px;
    background-color: #eee;
    border-radius: 40px;
    width: 100%;
    border-color: transparent;
  }
}

.search-icon {
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
}
</style>
