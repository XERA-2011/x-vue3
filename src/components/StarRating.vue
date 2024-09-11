<script setup lang="ts">
// defineProps<{
//   score: number
// }>()
import { computed } from 'vue';
const props = defineProps(['score', 'comments']);

const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

const itemClasses = computed(() => {
  let result = []

  let score = Math.floor(props.score * 2) / 2

  // 半星
  let hasDecimal = score % 1 !== 0

  // 全星
  let integer = Math.floor(score)

  // 遍历全星
  for (let i = 0; i < integer; i++) {
    result.push(CLS_ON)
  }

  // 处理半星
  if (hasDecimal) {
    result.push(CLS_HALF)
  }

  // 补齐
  while (result.length < LENGTH) { // 到这里还不够五颗星，则凑空星
    result.push(CLS_OFF)
  }

  return result
})

</script>
<template>
  <div class="star">
    <span class="star-item" v-for="(itemClass, index) in itemClasses" :key="index" :class="itemClass">
    </span>
    <div class="star-comments">({{ comments || 0 }})</div>
  </div>
</template>

<style lang="scss" scoped>
.star {
  display: flex;
  align-items: center;

  >span {
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-right: 5px;
  }
}

.star-item.on {
  background-image: url(../assets/star_on.png);
}

.star-item.half {
  background-image: url(../assets/star_half.png);
}

.star-item.off {
  background-image: url(../assets/star_off.png);
}

.star-comments {
  color: #999;
  font-size: 20px;
}
</style>
