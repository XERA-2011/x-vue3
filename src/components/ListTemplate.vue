<!-- 列表模板 -->
<script setup lang="ts">
defineProps<{
  status: string,
  list: any[]
}>()
import { LIST_STATUS } from '@/constant'
import StarRating from './StarRating.vue'
</script>

<template>
  <div class="hot-wrap">
    <ul class="hot-list" v-if="status === LIST_STATUS.SUCCESS && list.length > 0">
      <li class="hot-item" v-for="(item, index) in list" :key="index">
        <span class="hot-index">{{ index + 1 }}</span>
        <div :class="['hot-logo', index % 2 !== 0 && 'even']">
          <img :src="item['im:image'][0].label" alt="">
        </div>
        <div class="hot-info">
          <div class="hot-name">
            {{ item['im:name'].label }}
          </div>
          <span class="hot-category">{{ item['category']['attributes']['label'] }}</span>
          <StarRating :score="Math.floor(Math.random() * 6)" :comments="Math.floor(Math.random() * 1000)">
          </StarRating>
        </div>
      </li>
    </ul>
    <div v-else-if="status === LIST_STATUS.EMPTY && list.length === 0" class="empty">暂无数据</div>
    <div v-else-if="status === LIST_STATUS.LOADING" class="loading">加载中</div>
    <div v-else class="error">数据异常</div>
  </div>
</template>

<style lang="scss" scoped>
.hot-item {
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px 0;
  font-size: 24px;

  &::after {
    display: inline-block;
    position: absolute;
    bottom: 0;
    right: 0;
    content: "";
    background: #ccc;
    width: calc(100% - 20px);
    height: 1px;
    transform: scaleY(50%);
  }
}

.hot-index {
  width: 40px;
  text-align: center;
  color: #999;
}

.hot-logo {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;

  >img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.even {
    border-radius: 50%;
  }
}

.hot-info {
  width: 80%;
  overflow: hidden;
  margin-left: 15px;
}

.hot-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hot-category {
  font-size: 20px;
  color: #999;
}

@media (min-width: 1024px) {}
</style>
