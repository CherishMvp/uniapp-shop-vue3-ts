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

// 是否适配底部安全区域
defineProps<{
  safeAreaInsetBottom?: boolean
}>()

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 获取会员Store
const memberStore = useMemberStore()

// 获取购物车数据
const cartList = ref<PoultryCartItem[]>([])

// 下拉刷新相关逻辑
// 当前下拉刷新状态
const isTriggered = ref(false)
// 自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  // 开始动画
  isTriggered.value = true
  // 加载数据
  await getPoultryCartData()
  // 关闭动画
  isTriggered.value = false
}

// 优化购物车空列表状态，默认展示列表
/**
 * 正常加入购物车的时候，也就是创建订单的时候,都是这种数组格式[{pid:'商品id',number:'个数',spec:'规格'},{xx}]
 * 要注意加入的时候，判断库存是否充足
 **/
const showCartList = ref(true)
const getPoultryCartData = async () => {
  const openId = memberStore.profile!.openId
  const res = await getPoultryCartAPI(openId)
  if (!res.result) {
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
}

// 初始化调用: 页面显示触发
onShow(async () => {
  // 如果有token，登陆了，则发起购物车请求
  console.log('memberStore.profile', memberStore.profile)
  if (memberStore.profile?.openId) {
    console.log('sb')
    await getPoultryCartData()
  }
})
const previewImage = (src: any) => {
  uni.previewImage({ urls: [src] })
}

// 点击删除按钮
const onDeleteCart = (itemId: number) => {
  // 弹窗二次确认
  uni.showModal({
    content: '是否删除',
    confirmColor: '#27BA9B',
    success: async (res) => {
      if (res.confirm) {
        // 后端删除单品
        await deletePoultryCartAPI({ itemIds: [itemId] })
        // 重新获取列表
        await getPoultryCartData()
      }
    },
  })
}

// 修改商品数量;ev包括{value:数量,index:pid}
const onChangeCount = (ev: InputNumberBoxEvent) => {
  console.log('event: ', ev)
  putPoultryCartByItemIdAPI(Number(ev.index), { number: ev.value })
}

// 修改选中状态-单品修改
const onChangeSelected = (item: PoultryCartItem) => {
  console.log('item', item)
  // 前端数据更新-是否选中取反
  item.selected = !item.selected
  // 后端数据更新
  putPoultryCartByItemIdAPI(item.itemId, { selected: item.selected })
}

// 计算全选状态
const isSelectedAll = computed(() => {
  return cartList.value.length && cartList.value.every((v) => v.selected)
})

// 修改选中状态-全选修改
const onChangeSelectedAll = () => {
  // 全选状态取反
  const _isSelectedAll = !isSelectedAll.value
  // 前端数据更新
  cartList.value.forEach((item) => {
    item.selected = _isSelectedAll
  })
  console.log(
    '_isSelectedAll',
    _isSelectedAll,
    'memberStore.profile!.openId',
    memberStore.profile!.openId,
  )
  // 后端数据更新
  putPoultryCartSelectedAPI({ selected: _isSelectedAll, openId: memberStore.profile!.openId })
}

// 计算选中单品列表
const selectedCartList = computed(() => {
  return cartList.value.filter((v) => v.selected)
})

// 计算选中总件数
const selectedCartListCount = computed(() => {
  return selectedCartList.value.reduce((sum, item) => sum + item.number, 0)
})
// 主页
const goHome = (url: string) => {
  uni.switchTab({ url })
}
// 计算选中总金额;这个地方只要计算总数就行
// const selectedCartListMoney = computed(() => {
//   return selectedCartList.value
//     .reduce((sum, item) => sum + item.number * item.nowPrice, 0)
//     .toFixed(2)
// })

const handleOrder = async () => {
  // 清理用户信息
  // memberStore.clearProfile()
  console.log('订单创建操作')
  console.log('当前cartInfo信息', cartList.value)
  const orderList: any[] = []
  const currentSelectedIdList: number[] = [] //当前提交订单的购物车itemId，提交成功后需要将购物车内容删除
  selectedCartList.value.map((v: PoultryCartItem) => {
    const { pid, spec, number, itemId } = v
    orderList.push({ pid, spec, number })
    currentSelectedIdList.push(itemId)
  })
  const { openId, userName } = memberStore.profile!
  // console.log('orderList', orderList, 'openId', openId, 'userName', userName)
  console.log('currentSelectedIdList', currentSelectedIdList)
  const orderInfo = { openId, userName, cartInfo: orderList }
  const res: any = await createOrderAPI(orderInfo)
  console.log('x', res.result)
  if (res.result.orderDetail) {
    uni.showToast({
      title: '下单成功',
      icon: 'success',
      mask: true,
      duration: 500,
    })
    // 清除这一项
    await deletePoultryCartAPI({ itemIds: currentSelectedIdList })
    await getPoultryCartData() //重新获取
    CustomerModal('查看订单', '/pages/order/order', true)
  }
  // 返回上一页
  // uni.navigateBack()
}

// 结算按钮
const gotoPayment = () => {
  if (selectedCartListCount.value === 0) {
    return uni.showToast({
      icon: 'none',
      title: '请选择商品',
    })
  }
  // TODO:直接进行下单结算就行
  uni.showModal({
    content: '是否下单？',
    confirmColor: '#27BA9B',
    success: async (res) => {
      if (res.confirm) {
        await handleOrder()
      }
    },
  })
  // 跳转到结算页
  // uni.navigateTo({ url: '/pagesOrder/create/create' })
}

// 猜你喜欢
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
                  @click="previewImage(item.productDetail.picture)"
                  mode="aspectFill"
                  class="picture"
                  :src="item.productDetail.picture"
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
        去结算({{ selectedCartListCount }})
      </view>
    </view>
  </view>
</template>

<style lang="scss">
// 根元素
:host {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f7f7f8;
}

// 滚动容器
.scroll-view {
  flex: none; //同样的，使用flex:1会出问题
  height: 95vh; //底部有一个action_bar
  background-color: #f7f7f8;
}

// 购物车列表
.cart-list {
  padding: 0 20rpx;

  // 优惠提示
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
  }

  // 购物车商品
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
      font-size: 26rpx;
      color: #444;
    }

    .attrsText {
      line-height: 1.8;
      padding: 0 15rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
      margin-bottom: 8rpx;
    }

    .price {
      line-height: 1;
      font-size: 26rpx;
      color: #444;
      margin-bottom: 2rpx;
      color: #cf4444;

      &::before {
        content: '￥';
        font-size: 80%;
      }
    }

    // 商品数量
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
        font-size: 32rpx;
        color: #444;
      }

      .input {
        height: 100%;
        text-align: center;
        border-radius: 4rpx;
        font-size: 24rpx;
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

// 空状态
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

// 吸底工具栏
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
    font-size: 14px;
    color: #444;
    display: flex;
    align-items: center;
  }

  .all::before {
    font-family: 'erabbit' !important;
    content: '\e6cd';
    font-size: 40rpx;
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
    font-size: 14px;
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
    font-size: 20px;
    color: #323233;

    .decimal {
      font-size: 12px;
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

      &.disabled {
        opacity: 0.6;
      }
    }
  }
}
// 底部占位空盒子
.toolbar-height {
  height: 100rpx;
}
</style>
