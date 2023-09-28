<template>
  <vk-data-goods-sku-popup
    v-model="showPoup"
    :localdata="goods_info.localdata"
    :mode="goods_info.mode"
    add-cart-background-color="#FFA868"
    buy-now-background-color="#27BA9B"
    ref="skuPopupRef"
    :actived-style="{
      color: '#27BA9B',
      borderColor: '#27BA9B',
      backgroundColor: '#E9F8F5',
    }"
    @add-cart="onAddCart"
    @close="mySkuClose"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type {
  SkuPopupEvent,
  SkuPopupInstance,
} from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup'
import { postMemberCartAPI } from '@/services/cart'
// import sbxtx from './sbxtxpoup.vue'
const goods_info = defineProps(['goods_id', 'localdata', 'isShowSku', 'mode'])
const emits = defineEmits(['mySkuState'])
const showPoup = ref(false)

watch(
  () => goods_info.isShowSku,
  (newValue, oldValue) => {
    showPoup.value = newValue
    console.log('是否展示', showPoup.value)
    console.log('isShowSku 变化前后的值', oldValue, newValue)
  },
)
const mySkuClose = () => {
  emits('mySkuState', false)
}
// 直接在本地触发就行，poup写在本页
// SKU组件实例
const skuPopupRef = ref<SkuPopupInstance>()
// 加入购物车事件
const onAddCart = async (ev: SkuPopupEvent) => {
  console.log('装备加入购物车', ev)
  emits('mySkuState', false)

  setTimeout(() => {
    uni.showToast({ title: '添加成功' })
  }, 500)
  // await postMemberCartAPI({ skuId: ev._id, count: ev.buy_num })

  // showPoup.value = false
}
</script>

<style lang="scss" scoped></style>
