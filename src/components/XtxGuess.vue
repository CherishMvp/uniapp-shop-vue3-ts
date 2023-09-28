<script setup lang="ts">
import { getPoultryLikeAPI } from '@/services/home'
import type { PoultryGoodsItem } from '@/types/global'
import { onMounted, ref } from 'vue'
import { CustomerModal } from '@/hooks/loginstate/components/tologin'
// 分页参数
const pageParams = {
  page: 1,
  pageSize: 10,
}
// 猜你喜欢的列表
const guessList = ref<PoultryGoodsItem[]>([])
// 已结束标记
const finish = ref(false)
// 获取猜你喜欢数据
const getHomeGoodsGuessLikeData = async () => {
  // 退出分页判断
  if (finish.value === true) {
    return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  }
  const res = await getPoultryLikeAPI(pageParams)

  console.log('拿到商品: ', res)
  // guessList.value = res.result.items
  // 数组追加
  guessList.value.push(...res.result.items)
  // 分页条件
  if (pageParams.page < res.result.totalPages) {
    // 页码累加
    pageParams.page++
  } else {
    finish.value = true
  }
}
const props = defineProps(['isLogin'])
// 重置数据
const resetData = () => {
  pageParams.page = 1
  guessList.value = []
  finish.value = false
}
// 触发emit事件，打开商品详情弹窗
const open = (goods_id: any) => {
  console.log('登陆状态', props.isLogin)
  if (props.isLogin) {
    emit('showPopup', goods_id)
  } else {
    CustomerModal('请先登录', '/pages/login/login')
  }
  // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
}
// 组件挂载完毕
onMounted(() => {
  console.log('用的是老的guess组件')
  getHomeGoodsGuessLikeData()
})

// 子传父
const emit = defineEmits(['showPopup'])
// 暴露方法
defineExpose({
  resetData,
  getMore: getHomeGoodsGuessLikeData,
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <!-- 将此处的跳转到某个链接，改为底部弹出层 -->
    <!-- <view
      class="guess-item"
      v-for="item in guessList"
      :key="item.id"
      :url="`/pages/goods/goods?id=${item.id}`"
    > -->
    <view class="guess-item" v-for="item in guessList" :key="item.pid" @click.stop="open(item.pid)">
      <!-- <view class="guess-item" v-for="item in guessList" :key="item.id" @tap="openPopup('service')"> -->
      <image class="image" mode="aspectFill" :src="item.picture"></image>
      <view class="name"> {{ item.productName }} </view>
      <view class="price">
        <!-- <text class="small">¥ </text> -->
        <text>{{ item.baselinePrice }}元/斤</text>
        <uni-icons type="plus-filled" color="#cf4444" size="28px" />
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
/* 分类标题 */
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

/* 猜你喜欢 */
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
    font-size: 35rpx;
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
    // align-items: stretch;
    justify-content: space-between;
    line-height: 28px;
    height: 28px;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 37rpx;
    line-height: 1;
  }
  .small {
    font-size: 80%;
  }
}
// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
