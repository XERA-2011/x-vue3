<script setup lang="ts">
// defineProps<{}>()
import { ref, onMounted } from 'vue'

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
  <div class="recommend">Recommend</div>
  <div class="recommend-wrap">
    <ul class="app-list">
      <li class="app-item" v-for="(item, index) in appList" :key="index">
        <div :class="['app-logo']">
          <img :src="item['im:image'][0].label" alt="">
        </div>
        <div class="app-info">
          <div class="app-name">
            {{ item['im:name'].label }}
          </div>
          <span class="app-category">{{ item['category']['attributes']['label'] }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.recommend {
  font-size: 30px;
  padding-left: 20px;
}

.recommend-wrap {
  padding-left: 20px;
  position: relative;

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

.app-list {
  display: flex;
  overflow: auto;
}

.app-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-right: 20px;
  padding-bottom: 20px;
  font-size: 24px;
}

.app-logo {
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

.app-info {
  width: 100%;
}

.app-name {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-category {
  font-size: 20px;
  color: #999;
}
</style>
