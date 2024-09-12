<script setup lang="ts">
// defineProps<{}>()
import { onMounted } from 'vue'
import { appStore } from '@/store'
import { LIST_STATUS } from '@/constant'

const app = appStore()

const fetchList = async () => {
  try {
    const response = await fetch(
      'https://itunes.apple.com/hk/rss/topfreeapplications/limit=123/json'
    )
    if (response.status === 200) {
      const data = await response.json()
      app.recommendStatus = LIST_STATUS.SUCCESS
      app.recommendList = (data.feed.entry || []).slice(0, 10)
    } else {
      throw new Error('Network response was not ok')
    }
  } catch (error) {
    app.recommendStatus = LIST_STATUS.ERROR
    console.error('Error fetching data:', error)
  }
};

onMounted(() => {
  fetchList()
});

</script>

<template>
  <div class="recommend-wrap">
    <div class="recommend-title">Recommend</div>
    <ul class="recommend-list" v-if="app.recommendStatus === LIST_STATUS.SUCCESS && app.recommendList.length > 0">
      <li class="recommend-item" v-for="(item, index) in app.recommendList" :key="index">
        <div :class="['recommend-logo']">
          <img :src="item['im:image'][0].label" alt="">
        </div>
        <div class="recommend-info">
          <div class="recommend-name">
            {{ item['im:name'].label }}
          </div>
          <span class="recommend-category">{{ item['category']['attributes']['label'] }}</span>
        </div>
      </li>
    </ul>
    <div v-else-if="app.recommendStatus === LIST_STATUS.EMPTY && app.recommendList.length === 0" class="empty">暂无数据
    </div>
    <div v-else-if="app.recommendStatus === LIST_STATUS.LOADING" class="loading">加载中</div>
    <div v-else class="error">数据异常</div>
  </div>
</template>

<style lang="scss" scoped>
.recommend-title {
  font-size: 30px;
  font-weight: bold;
}

.recommend-wrap {
  padding-left: 20px;
  position: relative;

  &::before {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    background: #ccc;
    width: 100%;
    height: 1px;
    transform: scaleY(50%);
  }

  &::after {
    display: inline-block;
    position: absolute;
    bottom: 0;
    right: 0;
    content: "";
    background: #ccc;
    width: 100%;
    height: 1px;
    transform: scaleY(50%);
  }
}

.recommend-list {
  display: flex;
  overflow: auto;
}

.recommend-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-right: 20px;
  padding-bottom: 20px;
  font-size: 24px;
}

.recommend-logo {
  width: 150px;
  height: 150px;
  border-radius: 20px;
  overflow: hidden;

  >img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.recommend-info {
  width: 100%;
}

.recommend-name {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recommend-category {
  font-size: 20px;
  color: #999;
}
</style>
