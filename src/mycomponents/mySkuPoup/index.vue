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
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type {
  SkuPopupEvent,
  SkuPopupInstance,
} from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup'
import { postMemberCartAPI } from '@/services/cart'
const goods_info = defineProps(['goods_id', 'localdata', 'isShowSku', 'mode'])
const showPoup = ref(false)

watch(
  goods_info.isShowSku,
  () => {
    showPoup.value = goods_info.isShowSku
    console.log('showPo', showPoup.value)
  },
  { deep: true, immediate: true },
)
console.log('goods_info', goods_info)
// 直接在本地触发就行，poup写在本页
// SKU组件实例
const skuPopupRef = ref<SkuPopupInstance>()
// 加入购物车事件
const onAddCart = async (ev: SkuPopupEvent) => {
  console.log('event', ev)
  await postMemberCartAPI({ skuId: ev._id, count: ev.buy_num })
  uni.showToast({ title: '添加成功' })
  showPoup.value = false
}
</script>

<style lang="scss" scoped></style>
