<script setup lang="ts">
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import { useGuessList } from '@/composables'
import { myHotList } from '@/mock/mockOrder'
import mySkuPoup from '@/mycomponents/mySkuPoup/index.vue'
import { getGoodsByIdAPI } from '@/services/goods'

// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

// 获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  // TODO:mock data
  // hotList.value = res.result
  hotList.value = myHotList.result
}

// 是否加载中标记
const isLoading = ref(false)

// 页面加载
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isLoading.value = false
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
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value?.getMore(),
  ])
  // 关闭动画
  isTriggered.value = false
}
// 子传父，打开poup
const localdata = ref()
const isShowSku = ref(false)
const getGoodsByIdData = async (goods_id: string) => {
  const res = await getGoodsByIdAPI(goods_id)
  // SKU组件所需格式
  localdata.value = {
    _id: res.result.id,
    name: res.result.name,
    goods_thumb: res.result.mainPictures[0],
    spec_list: res.result.specs.map((v) => {
      return {
        name: v.name,
        list: v.values,
      }
    }),
    sku_list: res.result.skus.map((v) => {
      return {
        _id: v.id,
        goods_id: res.result.id,
        goods_name: res.result.name,
        image: v.picture,
        price: v.price * 100, // 注意：需要乘以 100
        stock: v.inventory,
        sku_name_arr: v.specs.map((vv) => vv.valueName),
      }
    }),
  }
  isShowSku.value = true
  console.log('localdata.value', localdata.value, 'isShowSku.value', isShowSku.value)
}
const openPoup = async (goods_id: string) => {
  console.log('收到子传来的商品ID', goods_id)
  await getGoodsByIdData(goods_id)
}
</script>

<template>
  <view class="viewport">
    <!-- 自定义导航栏 -->
    <CustomNavbar />
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
      <PageSkeleton v-if="isLoading" />
      <template v-else>
        <!-- 自定义轮播图 -->
        <XtxSwiper :list="bannerList" />
        <!-- 分类面板 -->
        <CategoryPanel v-if="false" :list="categoryList" />
        <!-- 热门推荐 -->
        <HotPanel :list="hotList" />
        <!-- 猜你喜欢 -->
        <XtxGuess ref="guessRef" @show-popup="openPoup" />
      </template>
    </scroll-view>

    <!-- 悬浮购物车 -->
    <navigator class="shop_cart" url="/pages/cart/cart2" open-type="navigate" hover-class="none">
      <uni-icons type="cart" color="#276d33" size="45" />
    </navigator>
    <mySkuPoup :localdata="localdata" :is-show-sku="isShowSku" :mode="2" />
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
