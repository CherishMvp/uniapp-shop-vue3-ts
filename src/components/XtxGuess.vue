<script setup lang="ts">
import { getPoultryLikeAPI } from '@/services/home'
import type { PoultryGoodsItem } from '@/types/global'
import { onMounted, ref } from 'vue'
import { CustomerModal } from '@/hooks/loginstate/components/tologin'
import { baseImgUrl, baseUrl } from '@/utils/setting'

const pageParams = {
  page: 1,
  pageSize: 10,
}

const guessList = ref<PoultryGoodsItem[]>([])

const finish = ref(false)

const getHomeGoodsGuessLikeData = async () => {
  if (finish.value === true) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  const res = await getPoultryLikeAPI(pageParams)

  console.log('拿到商品: ', res)

  guessList.value.push(...res.result.items)

  if (pageParams.page < res.result.totalPages) {
    pageParams.page++
  } else {
    finish.value = true
  }
}
const props = defineProps(['isLogin'])

const resetData = () => {
  pageParams.page = 1
  guessList.value = []
  finish.value = false
}

const open = (goods_id: any) => {
  console.log('登陆状态', props.isLogin)
  if (props.isLogin) {
    emit('showPopup', goods_id)
  } else {
  }
}

onMounted(() => {
  console.log('用的是老的guess组件')
  getHomeGoodsGuessLikeData()
})

const emit = defineEmits(['showPopup'])

defineExpose({
  resetData,
  getMore: getHomeGoodsGuessLikeData,
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view v-if="false" class="caption">
    <text class="text" style="font-size: 35rpx">猜你喜欢</text>
  </view>
  <view class="guess">
    <view class="guess-item" v-for="item in guessList" :key="item.pid" @click.stop="open(item.pid)">
      <!-- <view class="guess-item" v-for="item in guessList" :key="item.id" @tap="openPopup('service')"> -->
      <image
        class="image"
        :lazy-load="true"
        mode="aspectFill"
        :src="baseImgUrl + item.productName + '.png'"
      ></image>
      <view class="name"> {{ item.productName }} </view>
      <view class="price">
        <!-- <text class="small">¥ </text> -->
        <text>{{ item.baselinePrice }}元/斤</text>
        <uni-icons type="plus-filled" color="#276d33" size="32px" />
      </view>
    </view>
  </view>
  <!-- 自定义skuPoup -->
  <view class="loading-text">
    {{ finish ? '没有更多数据~' : '正在加载...' }}
  </view>
</template>

<style lang="scss">
:host {
  display: block;
}

.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }
  .image {
    width: 304rpx;
    height: 304rpx;
  }
  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 40rpx;
    line-height: 1;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    display: flex;

    justify-content: space-between;
    align-items: center;
    line-height: 1;

    padding-top: 4rpx;
    color: #e6851e;
    font-size: 40rpx;
  }
  .small {
    font-size: 80%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
