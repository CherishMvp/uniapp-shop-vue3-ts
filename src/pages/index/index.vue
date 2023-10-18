<script setup lang="ts">
import { getPolutryHotAPI, getPoultryBannerAPI } from '@/services/home'
import type { BannerItem, HotItem } from '@/types/home'
import { onHide, onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import IndexSkeleton from './index_ske/index_ske.vue'

import { useGuessList } from '@/composables'
import { getPoultryGoodsByIdAPI } from '@/services/goods'
import sbxtx from '@/components/mySkuPoup/sbxtxpoup.vue'
import { checkLoginState } from '@/hooks/loginstate/index'

/**
 * TODO:不自定义表头
 **/
// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  // const res = await getHomeBannerAPI()
  const res = await getPoultryBannerAPI()
  console.log('res: ', res)
  bannerList.value = res.result
}

// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getPolutryHotAPI()
  // TODO:mock data
  hotList.value = res.result
  console.log('hotList: ', hotList.value)
}

// 是否加载中标记
const isLoading = ref(true)
// 判断登陆状态
const isLogin = ref(false)
// onload的时候判断是否登陆（根据openId）
// const checkLoginState = computed(() => {
//   return isLogin.value
// })
const init = async () => {
  await Promise.all([getHomeBannerData(), getHomeHotData()])
  isLoading.value = false
  uni.hideLoading()
}
// 页面加载
onLoad(async () => {
  // await init()
  console.log('onshow刷新数据就行，防止有修改商品无刷新')
})
// onshow的时候重新获取用户信息
onShow(async () => {
  isLoading.value = true
  uni.showLoading({
    title: '加载中',
    mask: true,
  })
  isLogin.value = await checkLoginState()
  await init()
})
// 猜你喜欢组合式函数调用
const { guessRef, onScrolltolower } = useGuessList()
// 当前下拉刷新状态
const isTriggered = ref(false)
// 自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  // 开始动画
  isTriggered.value = true
  // 加载数据
  // await getHomeBannerData()
  // await getHomeCategoryData()
  // await getHomeHotData()
  // 重置猜你喜欢组件数据
  guessRef.value?.resetData()
  await Promise.all([getHomeBannerData(), getHomeHotData(), guessRef.value?.getMore()])
  // 关闭动画
  isTriggered.value = false
}
// 子传父，打开poup
const getGoodsByIdData = async (goods_id: number) => {
  // 先清空上次的数据
  uni.showLoading({
    title: '加载中',
    mask: false,
  })
  // 假设这个商品现在是pid为1的商品
  // const res = await getGoodsByIdAPI(goods_id)
  const res: any = await getPoultryGoodsByIdAPI(goods_id)
  const currentGoods = res.result.items
  console.log('currentGoods', currentGoods)
  uni.hideLoading()
}
onHide(() => {
  console.log('onhide', showPoup.value)
  if (showPoup.value) showPoup.value = false
})
const goodsId = ref()
const openPoup = (goods_id: number) => {
  console.log('收到子传来的商品ID', goods_id)
  showPoup.value = true
  goodsId.value = goods_id
  // getGoodsByIdData(goods_id) //直接在myskupoup子组建调用
}
const changeSkuState = (state: boolean) => {}
const showPoup = ref(false)
</script>

<template>
  <view class="viewport">
    <!-- 滚动容器 -->
    <scroll-view
      enable-back-to-top
      refresher-enabled
      @refresherrefresh="onRefresherrefresh"
      :refresher-triggered="isTriggered"
      @scrolltolower="onScrolltolower"
      class="scroll-view"
      scroll-y
    >
      <!-- <PageSkeleton v-if="isLoading" /> -->
      <IndexSkeleton v-if="isLoading" />
      <template v-else>
        <!-- 自定义轮播图 -->
        <XtxSwiper :list="bannerList" />
        <!-- 分类面板 -->
        <!-- <CategoryPanel v-if="false" :list="categoryList" /> -->
        <!-- 热门推荐 -->
        <HotPanel :list="hotList" />
        <!-- 猜你喜欢 -->
        <XtxGuess ref="guessRef" :is-login="isLogin" @show-popup="openPoup" />
      </template>
    </scroll-view>
    <sbxtx v-model="showPoup" :goodsId="goodsId" />

    <!-- 悬浮购物车 -->
    <navigator
      v-if="!showPoup"
      class="shop_cart"
      url="/pages/cart/cart2"
      open-type="navigate"
      hover-class="none"
    >
      <uni-icons type="cart" color="#276d33" size="45" />
    </navigator>
  </view>
</template>

<style lang="scss" scoped>
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}

.viewport {
  //修改下视口宽度为100vh就行，scrollview设为flex：1使用剩下的100%就行
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  //flex: 1;
  flex: auto;
  height: calc(100% - 20px); //flex:1会出现无法滚动到底部的问题
  overflow: hidden;
}
.shop_cart {
  position: fixed;
  right: 5vw;
  bottom: 20vh;
}
</style>
