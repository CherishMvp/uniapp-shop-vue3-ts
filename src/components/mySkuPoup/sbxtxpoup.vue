<template>
  <div class="cartPoup" v-if="modelValue">
    <div class="first_line">
      <div class="left">
        <div class="picture">
          <image
            class="img"
            :src="productImg"
            mode="aspectFill"
            @click="previewImage(productImg)"
          ></image>
        </div>
        <div class="content">
          <div class="desc">
            <div class="price">{{ currentGoods?.baselinePrice }}</div>
            <div class="stock">{{ currentGoods?.inventory }}</div>
            <div class="selectattr">{{ JSON.stringify(selectedSpec) }}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <view @click="mySkuClose">
          <uni-icons type="close" color="#8cd4e4" size="65rpx" />
        </view>
      </div>
    </div>
    <div class="second_line">
      <div class="spec_name">规格</div>
      <view class="uni-px-5 uni-pb-5">
        <uni-data-checkbox
          @change="selectSpec"
          mode="tag"
          selectedColor="rgb(235, 131, 41)"
          v-model="selectedSpec"
          :localdata="specList"
        ></uni-data-checkbox>
      </view>
    </div>
    <div class="third_line">
      <div class="num_step">
        <div class="name">数量 {{ calOrderNum }}</div>
        <uni-number-box
          :max="currentGoods?.inventory"
          v-model="orderNum"
          :disabled="!checkStock"
          @change="changeOrderNum"
        />
      </div>
      <div class="add_to_cart">
        <button
          :disabled="!checkStock"
          :class="{ disable_button: !checkStock }"
          class="add"
          @click="addToCart"
        >
          {{ checkStock ? '加入购物车' : '库存不足' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addToUserCart } from '@/services/cart'
import { getPoultryGoodsByIdAPI } from '@/services/goods'
import { useMemberStore } from '@/stores'
import type { PoultryGoodsItem } from '@/types/global'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const emits = defineEmits(['update:modelValue'])
// const props = defineProps(['goodsId', 'localdata', 'modelValue'])
const props = defineProps<{
  goodsId: number
  modelValue: boolean
}>()
const mySkuClose = () => {
  emits('update:modelValue', false)
  console.log('重置嘻嘻')
  currentGoods.value = undefined
  selectedSpec.value = undefined
  orderNum.value = undefined
}
const productImg = computed(() => {
  return currentGoods.value?.picture
})
const specList = computed(() => {
  return currentGoods.value?.spec?.map((size: any) => ({
    text: size,
    value: size,
    disable: !checkStock.value,
  }))
})
const calOrderNum = computed(() => {
  if (orderNum.value == 0) {
    return ''
  } else return orderNum.value ?? 1
})
const selectedSpec = ref()
const orderNum = ref()
const currentGoods = ref<PoultryGoodsItem>()
const selectSpec = (e: any) => {
  selectedSpec.value = e.detail.value
  //currentGoods.value!.spec = [selectedSpec.value]
}
const getGoodsByIdData = async (goods_id: number) => {
  uni.showLoading({
    title: '加载中',
    mask: false,
  })
  const res: any = await getPoultryGoodsByIdAPI(goods_id)
  console.log('res: ', res)
  currentGoods.value = res.result.items
  setTimeout(() => {
    uni.hideLoading()
  }, 500)
}
watch(props, async () => {
  if (props.modelValue) {
    await getGoodsByIdData(props.goodsId)
  }
})
const previewImage = (src: any) => {
  uni.previewImage({ urls: [src] })
}
const checkStock = computed(() => {
  return currentGoods.value?.inventory ? true : false
})
const changeOrderNum = (val: any) => {
  orderNum.value = val
  // currentGoods.value!.orderNum = val
}
const errorTip = (msg: string, icon: 'success' | 'error' | 'loading') => {
  return uni.showToast({
    title: msg,
    icon: icon,
    mask: true,
  })
}
const validOrder = async () => {
  console.log('start valids')
  console.log('orderNum.value', calOrderNum.value)
  if (!currentGoods.value?.spec) {
    errorTip('库存不足', 'error')
    return false
  } else if (!selectedSpec.value) {
    errorTip('请选择规格', 'error')
    return false
  } else if (!calOrderNum.value) {
    errorTip('请选择数量', 'error')
    return false
  } else return true
}
type RESULT = {
  pid: number //选择的商品ID，后端直接查找数据库
  number: number //数量
  totalPrice?: number //总结，后端去算，好像是要根据fixedPrice去算
  spec: string //规格，直接给字符串就行
}
const addToCart = async () => {
  console.log('当前选择的商品信息--原有属性', currentGoods.value)
  const isValid = await validOrder()
  console.log('isValid', isValid)
  if (!isValid) return
  console.log('属性以及ordernumber', selectedSpec.value)
  const result = <RESULT>{}
  result.pid = currentGoods.value!.pid
  result.number = calOrderNum.value
  result.spec = selectedSpec.value
  console.log('final result', result)
  // 获取用户openId
  const memberStore = useMemberStore()
  console.log('memberStore.profile!.openId', memberStore.profile!.openId)
  const add_state = await addToUserCart(memberStore.profile!.openId, result)
  console.log('add_state', add_state)
  if (add_state) {
    uni.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true,
      duration: 500,
    })
  }
  mySkuClose()

  // TODO:整合商品信息以及视频数量
}
</script>

<style lang="scss" scoped>
.cartPoup {
  height: 55vh;
  display: flex;
  flex-direction: column;
  margin: 20rpx;
  .first_line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    .left {
      display: flex;
      // flex: 1;
      align-items: center;
      .img {
        width: 180rpx;
        height: 180rpx;
      }
      .content {
        display: flex;
        height: 180rpx;
        .desc {
          margin-left: 20px;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          justify-content: space-between;
          .price {
            color: rgb(235, 131, 41);
            font-size: 45rpx;
            &::before {
              content: '￥';
              font-size: 30rpx;
            }
          }
          .stock {
            color: #c3c3c3;
            font-size: 28rpx;
            &::before {
              content: '库存：';
            }
          }
          .selectattr {
            display: flex;
            color: #000;
            font-size: 32rpx;
            &::before {
              content: '已选：';
            }
          }
        }
      }
    }
    .right {
      flex: 1;
      justify-content: flex-end;
      display: flex;
      margin-right: 8rpx;
      height: 180rpx;
    }
  }
  .second_line {
    display: flex;
    flex-direction: column;
    padding: 20rpx;
    .spec_name {
      margin: 20rpx 0;
      width: 80%;
      color: #000;
      font-size: 32rpx;
    }
    .spec_value {
      display: flex;
      justify-content: flex-start;
      width: 80%;
    }
  }
  .third_line {
    display: flex;
    padding-bottom: 0;
    position: relative;
    justify-content: space-evenly;
    flex-direction: column;
    height: 100%;
    padding: 20rpx;
    .num_step {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        color: #000;
        font-size: 36rpx;
      }
    }
    .add_to_cart {
      .add {
        border-radius: 30rpx;
        background: rgb(243 150 46);
        color: #ffff;
      }
      .disable_button {
        background: rgb(229 228 227 / 39%) !important;
        color: #151212 !important;
        font-weight: 600;
      }
    }
  }
  .header {
    display: flex;
    line-height: 1;
    justify-content: flex-end;
    align-items: center;
  }
  .wrap {
    padding: 20rpx;
    background-color: #761;
    .cart_content {
      display: flex;
      flex-direction: column;
    }
    .footer {
      flex: 1;
    }
  }
  .cartPoup {
    padding: 10rpx;
  }
}
</style>
