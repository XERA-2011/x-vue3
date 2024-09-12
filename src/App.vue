<script setup lang="ts">
import { computed } from 'vue'
import { appStore } from '@/store'
import { LIST_STATUS } from '@/constant'

const app = appStore()

// 搜索状态
const searchStatus = computed(() => {
  if (app.searchList.length === 0 && app.searchQuery) {
    return LIST_STATUS.EMPTY
  } else if (app.searchList.length > 0 && app.searchQuery) {
    return LIST_STATUS.SUCCESS
  }
  return LIST_STATUS.ERROR
})

// 搜索是否展示
const searchShow = computed(() => {
  return [LIST_STATUS.SUCCESS, LIST_STATUS.EMPTY].includes(searchStatus.value)
})

import Search from './components/Search.vue'
import ListTemplate from './components/ListTemplate.vue'
import HotList from './components/HotList.vue'
import Recommend from './components/Recommend.vue'

</script>

<template>
  <Search>
    <ListTemplate v-show="searchShow" :list="app.searchList" :status="searchStatus" />
  </Search>
  <Recommend v-show="!searchShow" />
  <HotList v-show="!searchShow" />
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>
