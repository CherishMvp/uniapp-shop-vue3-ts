<script setup lang="ts">
import type { HotItem } from '@/types/home'

// 定义 props 接收数据
defineProps<{
  list: HotItem[]
}>()
</script>

<template>
  <!-- 推荐专区 -->
  <view class="panel hot">
    <navigator
      hover-class="none"
      :url="`/pages/hot/hot?type=${item.type}`"
      class="item"
      v-for="item in list"
      :key="item.id"
    >
      <view class="title">
        <text class="title-text">{{ item.title }}</text>
        <text v-if="false" class="title-desc">{{ item.alt }}</text>
      </view>
      <view class="cards">
        <!-- <image
          v-for="src in item.pictures"
          :key="src"
          class="image"
          mode="aspectFit"
          :src="src"
        ></image> -->
        <image class="image" mode="aspectFit" :src="item.pictures"></image>
      </view>
    </navigator>
  </view>
</template>

<style lang="scss">
@import '../styles/hot.scss';
</style>
