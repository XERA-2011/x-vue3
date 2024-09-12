<script setup lang="ts">
import { onMounted } from 'vue'
import { appStore } from '@/store'
import { LIST_STATUS } from '@/constant'

const app = appStore()
const fetchList = async () => {
  try {
    const response = await fetch(
      'https://itunes.apple.com/hk/rss/topgrossingapplications/limit=123/json'
    )
    if (response.status === 200) {
      const data = await response.json()
      app.hotStatus = LIST_STATUS.SUCCESS
      app.hotList = data.feed.entry || []
    } else {
      throw new Error('Network response was not ok')
    }


  } catch (error) {
    app.hotStatus = LIST_STATUS.ERROR
    console.error('Error fetching data:', error)
  }
};

onMounted(() => {
  fetchList()
});

import ListTemplate from './ListTemplate.vue'

</script>

<template>
  <div class="hot-wrap">
    <ListTemplate :list="app.hotList" :status="app.hotStatus" />
  </div>
</template>

<style lang="scss" scoped>
</style>
