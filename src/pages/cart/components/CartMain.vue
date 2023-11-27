<script setup lang="ts">
import type { InputNumberBoxEvent } from '@/components/vk-data-input-number-box/vk-data-input-number-box'
import {
  getPoultryCartAPI,
  putPoultryCartByItemIdAPI,
  deletePoultryCartAPI,
  putPoultryCartSelectedAPI,
} from '@/services/cart'
import { useMemberStore } from '@/stores'
import type { PoultryCartItem } from '@/types/cart'
import { onShow } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { createOrderAPI } from '@/services/order'
import { CustomerModal } from '@/hooks/loginstate/components/tologin'
import { baseImgUrl } from '@/utils/setting'

defineProps<{
  safeAreaInsetBottom?: boolean
}>()

const { safeAreaInsets } = uni.getSystemInfoSync()

const memberStore = useMemberStore()

const cartList = ref<PoultryCartItem[]>([])

const isTriggered = ref(false)

const onRefresherrefresh = async () => {
  isTriggered.value = true

  await getPoultryCartData()

  isTriggered.value = false
}

const showCartList = ref(false)
const getPoultryCartData = async () => {
  const openId = memberStore.profile!.openId
  const res = await getPoultryCartAPI(openId)
  console.log('res: ', res.result)
  if (!res.result?.openId) {
    uni.showModal({
      title: '提示',
      content: '暂无内容，去首页看看',
      showCancel: true,
      success: ({ confirm, cancel }) => {
        if (confirm) {
          goHome('/pages/index/index')
        }
      },
    })
    cartList.value = []
    return
  }
  cartList.value = res.result.cartItems
  console.log('cartList.value', cartList.value)
  showCartList.value = cartList.value.length > 0
  console.log('是否有商品', showCartList.value)
}

onShow(async () => {
  console.log('memberStore.profile', memberStore.profile)
  if (memberStore.profile?.token) {
    console.log('sb')
    await getPoultryCartData()
  }
})
const previewImage = (src: any) => {
  uni.previewImage({ urls: [src] })
}

const onDeleteCart = (itemId: number) => {
  uni.showModal({
    content: '是否删除',
    confirmColor: '#27BA9B',
    success: async (res) => {
      if (res.confirm) {
        await deletePoultryCartAPI({ itemIds: [itemId] })

        await getPoultryCartData()
      }
    },
  })
}

const onChangeCount = (ev: InputNumberBoxEvent) => {
  console.log('准备更新商品信息: ', ev)
  putPoultryCartByItemIdAPI(Number(ev.index), { number: ev.value })
}

const onChangeSelected = (item: PoultryCartItem) => {
  console.log('item', item)

  item.selected = !item.selected

  putPoultryCartByItemIdAPI(item.itemId, { selected: item.selected })
}

const isSelectedAll = computed(() => {
  return cartList.value.length && cartList.value.every((v) => v.selected)
})

const onChangeSelectedAll = () => {
  const _isSelectedAll = !isSelectedAll.value

  cartList.value.forEach((item) => {
    item.selected = _isSelectedAll
  })
  console.log(
    '_isSelectedAll',
    _isSelectedAll,
    'memberStore.profile!.openId',
    memberStore.profile!.openId,
  )

  putPoultryCartSelectedAPI({ selected: _isSelectedAll, openId: memberStore.profile!.openId })
}

const selectedCartList = computed(() => {
  return cartList.value.filter((v) => v.selected)
})

const selectedCartListCount = computed(() => {
  return selectedCartList.value.reduce((sum, item) => sum + item.number, 0)
})

const goHome = (url: string) => {
  uni.switchTab({ url })
}

const handleOrder = async () => {
  console.log('订单创建操作')
  console.log('当前cartInfo信息', cartList.value)
  const orderList: any[] = []
  const currentSelectedIdList: number[] = []
  selectedCartList.value.map((v: PoultryCartItem) => {
    const { pid, spec, number, itemId } = v
    orderList.push({ pid, spec, number })
    currentSelectedIdList.push(itemId)
  })
  const { openId, userName } = memberStore.profile!

  console.log('当前选中的商品', currentSelectedIdList)
  const orderInfo = { openId, userName, orderDate: selectedDate.value, cartInfo: orderList }
  console.log('准备发起请求的数据', orderInfo)
  const res: any = await createOrderAPI(orderInfo)
  console.log('下单成功', res.result)
  if (res.result.orderDetail) {
    uni.showToast({
      title: '下单成功',
      icon: 'success',
      mask: true,
      duration: 500,
    })

    selectedDate.value = undefined
    isSelectedDate.value = false
    await deletePoultryCartAPI({ itemIds: currentSelectedIdList })
    await getPoultryCartData()
    // 发起消息订阅

    await requestSubscribeMessage()
  }
}
const requestSubscribeMessage = async () => {
  uni.requestSubscribeMessage({
    tmplIds: ['7TIdnJvrSZf54gcndAAhgJzwGtOFmPcP07zIRz43Qbw'], // 替换为真实的模板 ID
    success(res) {
      console.log('订阅消息成功', res)
      // 在这里可以将订阅结果发送到后端进行处理
    },
    fail(error) {
      console.error('订阅消息失败', error)
    },
    complete: (complete) => {
      CustomerModal('查看订单', '/pages/order/order', true)
    },
  })
}
const getDate = (type: string) => {
  const date = new Date()
  let year = date.getFullYear()
  let month: string | number = date.getMonth() + 1
  let day: string | number = date.getDate()

  if (type === 'start') {
    year = year
  } else if (type === 'end') {
    year = year + 2
  }
  month = month > 9 ? month : '0' + month
  day = day > 9 ? day : '0' + day
  const final = `${year}-${month}-${day}`
  console.log('final', final)
  return final
}
const startDate = computed(() => {
  return getDate('start')
})
const endDate = computed(() => {
  return getDate('end')
})
const changeOrderDate = ({ detail }: any) => {
  console.log('details change', detail)
  selectedDate.value = detail.value
  isSelectedDate.value = true
}
function getNextDayDateString() {
  // 获取当前日期
  var currentDate = new Date()

  // 获取下一天的日期
  var nextDay = new Date(currentDate)
  nextDay.setDate(currentDate.getDate() + 1)

  // 格式化日期为"YYYY-MM-DD"格式
  var formattedDate =
    nextDay.getFullYear() +
    '-' +
    (nextDay.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    nextDay.getDate().toString().padStart(2, '0')

  return formattedDate
}

onShow(() => {
  selectedDate.value = getNextDayDateString()
  isSelectedDate.value = true
  console.log('selectedDate.value', selectedDate.value)
})

const selectedDate = ref() //改为第二天的时间

const isSelectedDate = ref(false)

const gotoPayment = () => {
  if (selectedCartListCount.value === 0) {
    return uni.showToast({
      icon: 'none',
      title: '请选择商品',
    })
  }
  if (!isSelectedDate.value) {
    return uni.showToast({
      title: '点击右上角选择预定时间',
      icon: 'error',
      duration: 2000,
      mask: false,
    })
  }

  uni.showModal({
    content: '是否下单？',
    confirmColor: '#27BA9B',
    success: async (res) => {
      if (res.confirm) {
        await handleOrder()
      }
    },
  })
}
</script>

<template>
  <scroll-view
    enable-back-to-top
    scroll-y
    class="scroll-view"
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered"
  >
    <!-- 已登录: 显示购物车;根据是否有openId判断 -->
    <template v-if="memberStore.profile?.openId">
      <!-- 购物车列表 -->
      <view class="cart-list" v-if="showCartList">
        <!-- 优惠提示 -->
        <view class="tips">
          <text class="label">提示</text>
          <text class="desc">请仔细检查商品数量</text>
          <picker
            class="date_picker"
            mode="date"
            :value="selectedDate"
            :start="startDate"
            :end="endDate"
            @change="changeOrderDate"
          >
            <view class="order_date"
              >{{ selectedDate ? '预定日期:' : '请选择预定日期' }}{{ selectedDate }}</view
            >
          </picker>
        </view>
        <!-- 滑动操作分区 -->
        <uni-swipe-action>
          <!-- 滑动操作项 -->
          <uni-swipe-action-item v-for="item in cartList" :key="item.itemId" class="cart-swipe">
            <!-- 商品信息 -->
            <view class="goods">
              <!-- 选中状态 -->
              <text
                @tap="onChangeSelected(item)"
                class="checkbox"
                :class="{ checked: item.selected }"
              ></text>
              <!-- <navigator
                :url="`/pages/goods/goods?id=${item.id}`"
                hover-class="none"
                class="navigator"
              > -->
              <view hover-class="none" class="navigator">
                <image
                  @click="previewImage(baseImgUrl + item.productDetail.productName + '.png')"
                  mode="aspectFill"
                  class="picture"
                  :src="baseImgUrl + item.productDetail.productName + '.png'"
                ></image>
                <view class="meta">
                  <view class="name ellipsis">{{ item.productDetail.productName }}</view>
                  <view class="attrsText ellipsis">{{ item.spec }}</view>
                  <view class="price">{{ item.productDetail.baselinePrice }}</view>
                </view>
              </view>
              <!-- 商品数量 -->
              <!-- 此处的index应该要是itemId才是唯一 -->
              <view class="count">
                <vk-data-input-number-box
                  v-model="item.number"
                  :min="1"
                  :max="item.productDetail.inventory"
                  :index="item.itemId"
                  @change="onChangeCount"
                />
              </view>
            </view>
            <!-- 右侧删除按钮 -->
            <template #right>
              <view class="cart-swipe-right">
                <button @tap="onDeleteCart(item.itemId)" class="button delete-button">删除</button>
              </view>
            </template>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
      <!-- 购物车空状态 -->
      <view class="cart-blank" v-else>
        <image src="/static/images/blank_cart.png" class="image" />
        <text class="text">购物车还是空的，快来挑选好货吧</text>
        <view @click="goHome('/pages/index/index')" hover-class="none">
          <button class="button">去首页看看</button>
        </view>
      </view>
    </template>
    <!-- 未登录: 提示登录 -->
    <view class="login-blank" v-else>
      <text class="text">登录后可查看购物车中的商品</text>
      <navigator url="/pages/login/login" hover-class="none">
        <button class="button">去登录</button>
      </navigator>
    </view>
    <!-- 猜你喜欢 -->
    <view class="toolbar-height"></view>
  </scroll-view>
  <!-- 吸底工具栏 -->
  <view
    v-if="showCartList"
    class="toolbar"
    :style="{ paddingBottom: safeAreaInsetBottom ? safeAreaInsets!.bottom - 10 + 'px' : 0 }"
  >
    <!-- TODO:改为显示商品总件数即可 -->
    <text @tap="onChangeSelectedAll" class="all" :class="{ checked: isSelectedAll }">全选</text>
    <text class="text">商品总数:</text>
    <text class="total_number">{{ selectedCartListCount }}</text>
    <view class="button-grounp">
      <view
        @tap="gotoPayment"
        class="button payment-button"
        :class="{ disabled: selectedCartListCount === 0 }"
      >
        去预定({{ selectedCartListCount }})
      </view>
    </view>
  </view>
</template>

<style lang="scss">
:host {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f7f7f8;
}

.scroll-view {
  flex: none;
  height: 95vh;
  background-color: #f7f7f8;
}

.cart-list {
  padding: 0 20rpx;

  .tips {
    display: flex;
    align-items: center;
    line-height: 1;
    margin: 30rpx 10rpx;
    font-size: 26rpx;
    color: #666;

    .label {
      color: #fff;
      padding: 7rpx 15rpx 5rpx;
      border-radius: 4rpx;
      font-size: 24rpx;
      background-color: #27ba9b;
      margin-right: 10rpx;
    }
    .date_picker {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      font-size: 32rpx;
      color: #323233;
    }
  }

  .goods {
    display: flex;
    padding: 20rpx 20rpx 20rpx 80rpx;
    border-radius: 10rpx;
    background-color: #fff;
    position: relative;

    .navigator {
      display: flex;
    }

    .checkbox {
      position: absolute;
      top: 0;
      left: 0;

      display: flex;
      align-items: center;
      justify-content: center;
      width: 80rpx;
      height: 100%;

      &::before {
        content: '\e6cd';
        font-family: 'erabbit' !important;
        font-size: 40rpx;
        color: #444;
      }

      &.checked::before {
        content: '\e6cc';
        color: #27ba9b;
      }
    }

    .picture {
      width: 170rpx;
      height: 170rpx;
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20rpx;
    }

    .name {
      height: 72rpx;
      font-size: 35rpx;
      color: #444;
    }

    .attrsText {
      line-height: 1.8;
      padding: 0 15rpx;
      font-size: 30rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
      margin-bottom: 8rpx;
    }

    .price {
      line-height: 1;
      font-size: 35rpx;
      color: #444;
      margin-bottom: 2rpx;
      color: #cf4444;

      &::before {
        content: '￥';
        font-size: 80%;
      }
    }

    .count {
      position: absolute;
      bottom: 10rpx;
      right: 5rpx;

      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 220rpx;
      height: 48rpx;

      .text {
        height: 100%;
        padding: 0 20rpx;
        font-size: 35rpx;
        color: #444;
      }

      .input {
        height: 100%;
        text-align: center;
        border-radius: 4rpx;
        font-size: 35rpx;
        color: #444;
        background-color: #f6f6f6;
      }
    }
  }

  .cart-swipe {
    display: block;
    margin: 20rpx 0;
  }

  .cart-swipe-right {
    display: flex;
    height: 100%;

    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      padding: 6px;
      line-height: 1.5;
      color: #fff;
      font-size: 26rpx;
      border-radius: 0;
    }

    .delete-button {
      background-color: #cf4444;
    }
  }
}

.cart-blank,
.login-blank {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 60vh;
  .image {
    width: 400rpx;
    height: 281rpx;
  }
  .text {
    color: #444;
    font-size: 26rpx;
    margin: 20rpx 0;
  }
  .button {
    width: 240rpx !important;
    height: 60rpx;
    line-height: 60rpx;
    margin-top: 20rpx;
    font-size: 26rpx;
    border-radius: 60rpx;
    color: #fff;
    background-color: #27ba9b;
  }
}

.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--window-bottom));
  z-index: 1;

  height: 100rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  border-top: 1rpx solid #ededed;
  border-bottom: 1rpx solid #ededed;
  background-color: #fff;
  box-sizing: content-box;

  .all {
    margin-left: 25rpx;
    font-size: 35rpx;
    color: #444;
    display: flex;
    align-items: center;
  }

  .all::before {
    font-family: 'erabbit' !important;
    content: '\e6cd';
    font-size: 35rpx;
    margin-right: 8rpx;
  }

  .checked::before {
    content: '\e6cc';
    color: #27ba9b;
  }

  .text {
    margin-right: 8rpx;
    margin-left: 32rpx;
    color: #444;
    font-size: 33rpx;
  }

  .amount {
    font-size: 20px;
    color: #cf4444;

    .decimal {
      font-size: 12px;
    }

    &::before {
      content: '￥';
      font-size: 12px;
    }
  }
  .total_number {
    font-size: 45rpx;
    color: #323233;

    .decimal {
      font-size: 30px;
    }
  }
  .button-grounp {
    margin-left: auto;
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 72rpx;
    font-size: 13px;
    color: #fff;

    .button {
      width: 240rpx;
      margin: 0 10rpx;
      border-radius: 72rpx;
    }

    .payment-button {
      background-color: #27ba9b;
      font-size: 35rpx;
      &.disabled {
        opacity: 0.6;
      }
    }
  }
}

.toolbar-height {
  height: 100rpx;
}
</style>
