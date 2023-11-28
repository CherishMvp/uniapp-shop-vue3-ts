<template>
  <div>
    <div v-if="orderData?.length">
      <uni-section
        :title="'客户姓名: ' + item.userName"
        title-font-size="40rpx"
        title-color="#000"
        type="circle"
        :key="index"
        class="mycard"
        :class="{ mysection: index === orderData?.length - 1 }"
        v-for="(item, index) in orderData"
      >
        <uni-group :title="item.orderDate + '订货汇总'" mode="card" top="10">
          <div class="group">
            <view :key="index2" v-for="(detail, index2) in item.orderDetail" class="content">
              <view
                class="detail"
                :class="{ 'last-detail': index2 === item.orderDetail?.length - 1 }"
              >
                <div class="main_content">
                  <div class="left_">
                    <div class="index">{{ index2 + 1 }} .</div>
                  </div>
                  <div class="right_">
                    <div class="first_">
                      <span class="name">
                        {{ detail.productName }} {{ detail.number
                        }}{{
                          detail.productName == '饲料' || detail.productName == '玉米' ? '斤' : '只'
                        }}
                      </span>
                      <span class="spec">规格 {{ detail.spec }}</span>
                    </div>

                    <div class="base_price">{{ calDetailPrice(detail) }}</div>
                  </div>
                </div>
              </view>
            </view>
            <!-- 小计 -->
            <div class="total detail">
              <text> 小计: </text>
              <text
                >总数量
                {{
                  item.orderDetail.reduce((sum, item) => {
                    if (item.productName !== '玉米' && item.productName !== '饲料') {
                      return sum + item.number
                    }
                    return sum
                  }, 0)
                }}只</text
              >
              <!-- 应该是总重量*单价 -->
              <text v-if="Number(item.totalPrice)"
                >总价
                {{ item.totalPrice }}
              </text>
              <text v-else>金额未知</text>
            </div>
          </div>
        </uni-group>
      </uni-section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Datum, OrderDetail } from '@/mock/mockOrder/type'
import { getOrderInfoByOrderIdAPI } from '@/services/order'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
const query = ref()
const props = defineProps<{
  openId: string
  orderId: string
}>()

const orderData = ref<Datum[]>()
const getCurrentOrderInfo = async () => {
  orderData.value = (await getOrderInfoByOrderIdAPI(query.value)).result as Datum[]
  console.log('Current order', orderData.value)
}
const calDetailPrice = computed(() => {
  return (detail: OrderDetail) => {
    if (Number(detail.weight) && Number(detail.fixedPrice)) {
      const { weight, fixedPrice } = detail
      return `${weight}斤X${fixedPrice}=${(fixedPrice * weight).toFixed(1)}元`
    } else {
      return '价格未录入'
    }
  }
})

onShow(async () => {
  console.log('props:', props)
  if (props) {
    query.value = props
    await getCurrentOrderInfo()
  }
})
</script>

<style lang="scss" scoped>
.scroll_view {
  height: calc(100% - 20px);
  overflow: hidden;
  .header_tip {
    font-weight: 600;
    font-size: 35rpx;
    color: #333;
    padding: 20rpx;
  }
}
.mysection :deep(.uni-section) {
  padding-bottom: 40px;
}
.mycard :deep(.uni-group--card) {
  box-shadow: 0 0 5px 1px rgba(64, 64, 64, 0.5) !important;
}
.mycard :deep(.uni-group__title-text) {
  font-size: 35rpx !important;
}
.group {
  .total {
    font-size: 33rpx;
    color: #000;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .total text:nth-of-type(n + 2) {
    margin-left: 25rpx;
  }
  .content {
    margin-bottom: 32rpx;
    font-size: 35rpx;
    .detail {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: flex-start;
      .main_content {
        display: flex;
        align-items: center;
        .right_ {
          flex: 1;
          .first_ {
            margin-bottom: 10rpx;
          }
          .spec {
            margin-left: 20rpx;
          }
        }
      }
      .index {
        min-width: 45rpx;
        margin-right: -15rpx;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        text-align: center;
      }
    }
    .detail view {
      margin-left: 20rpx;
    }
    .last-detail {
      margin-bottom: 20px;
    }
  }
}
</style>
