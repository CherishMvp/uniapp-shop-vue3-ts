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

const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getPoultryBannerAPI()
  console.log('res: ', res)
  bannerList.value = res.result
}

const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getPolutryHotAPI()

  hotList.value = res.result
  console.log('hotList: ', hotList.value)
}

const isLoading = ref(true)

const isLogin = ref(false)

const init = async () => {
  await Promise.all([getHomeBannerData(), getHomeHotData()])
  isLoading.value = false
  uni.hideLoading()
}

onLoad(async () => {
  console.log('onshow刷新数据就行，防止有修改商品无刷新')
})

onShow(async () => {
  isLoading.value = true
  uni.showLoading({
    title: '加载中',
    mask: true,
  })
  isLogin.value = await checkLoginState()
  await init()
})

const { guessRef, onScrolltolower } = useGuessList()

const isTriggered = ref(false)

const onRefresherrefresh = async () => {
  isTriggered.value = true

  guessRef.value?.resetData()
  await Promise.all([getHomeBannerData(), getHomeHotData(), guessRef.value?.getMore()])

  isTriggered.value = false
}

const getGoodsByIdData = async (goods_id: number) => {
  uni.showLoading({
    title: '加载中',
    mask: false,
  })

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
    <!-- 2023-10-19 13:54:11 关闭悬浮购物车 -->
    <navigator
      v-if="false && !showPoup"
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
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: auto;
  height: calc(100% - 20px);
  overflow: hidden;
}
.shop_cart {
  position: fixed;
  right: 5vw;
  bottom: 20vh;
}
</style>
