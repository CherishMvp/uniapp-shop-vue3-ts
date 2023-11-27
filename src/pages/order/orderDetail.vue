<template>
  <div>订单详情</div>
  <div>{{ query }}</div>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const query = ref()
onLoad(async (query: any) => {
  console.log('query', query)
  if (query.openId) query.value = JSON.parse(query)
  uni.showLoading({
    title: '加载中',
    mask: false,
  })
  //   await getHotRecommendData(query)
  setTimeout(() => {
    uni.hideLoading()
  }, 500)
})
</script>

<style lang="scss" scoped></style>
