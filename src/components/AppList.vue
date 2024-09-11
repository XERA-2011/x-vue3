<script setup lang="ts">
// defineProps<{}>()
import { ref, onMounted } from 'vue'
import StarRating from './StarRating.vue'

const appList = ref([]);

const fetchAppList = async () => {
  try {
    const response = await fetch(
      'https://itunes.apple.com/hk/rss/topgrossingapplications/limit=123/json'
    );

    if (response.status === 200) {
      const data = await response.json();
      appList.value = data.feed.entry || []; // 将数据赋值给响应式变量
    }


  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchAppList()
});

</script>

<template>
  <ul class="app-list">
    <li class="app-item" v-for="(item, index) in appList" :key="index">
      <span class="app-index">{{ index + 1 }}</span>
      <div :class="['app-logo', index % 2 !== 0 && 'even']">
        <img :src="item['im:image'][0].label" alt="">
      </div>
      <div class="app-info">
        <div class="app-name">
          {{ item['im:name'].label }}
        </div>
        <span class="app-category">{{ item['category']['attributes']['label'] }}</span>
        <StarRating :score="Math.floor(Math.random() * 6)" :comments="Math.floor(Math.random() * 1000)"></StarRating>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.app-item {
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

.app-index {
  width: 40px;
  text-align: center;
  color: #999;
}

.app-logo {
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

.app-info {
  width: 80%;
  overflow: hidden;
  margin-left: 15px;
}

.app-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-category {
  font-size: 20px;
  color: #999;
}

@media (min-width: 1024px) {}
</style>
