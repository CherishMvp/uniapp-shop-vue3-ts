<template>
  <view class="viewport" v-if="memberStore.profile">
    <scroll-view scroll-y class="scroll_view">
      <!-- 筛选日期 -->
      <div v-if="!isCustomer" class="filter_action">
        <uni-section :title="'选择对应的时间'" type="line"></uni-section>
        <!-- 
          TODO:暂不使用时间戳
          return-type="timestamp"
         -->
        <uni-datetime-picker
          ref="picker"
          :disabled="isCustomer"
          v-model="selectedDate"
          :type="selectType"
          rangeSeparator="至"
          :border="false"
          @change="onDateChange"
          @maskClick="picker?.clear()"
        ></uni-datetime-picker>
        <!-- 筛选客户姓名 -->
        <div>
          <uni-section :title="'选择客户姓名'" type="line" />
          <uni-data-select
            :disabled="isCustomer"
            v-model="selectedName"
            :localdata="nameOptions"
            @change="onNameChange"
          />
        </div>
      </div>

      <!-- 使用isOrderList代替 -->
      <div class="order_wrap" v-if="orderData?.length">
        <uni-section
          :title="item.orderDate + '订货汇总'"
          title-font-size="20"
          title-color="#000"
          type="circle"
          :key="index"
          class="mycard"
          :class="{ mysection: index === orderData.length - 1 }"
          v-for="(item, index) in orderData"
        >
          <uni-group :title="'客户姓名: ' + item.userName" mode="card" top="10">
            <div class="group">
              <view :key="index2" v-for="(detail, index2) in item.orderDetail" class="content">
                <view
                  class="detail"
                  :class="{ 'last-detail': index2 === item.orderDetail.length - 1 }"
                >
                  <div class="index">{{ index2 + 1 }} .</div>
                  <div class="name">{{ detail.productName }} {{ detail.number }} 只</div>
                  <div class="base_price">{{ detail.baselinePrice }} 元/斤</div>
                  <div class="spec">规格 {{ detail.spec }}</div>
                </view>
              </view>
              <view class="footer">
                <view @tap="hanleOrderEdit(0)" class="button delete-button">删除</view>
                <view @tap="hanleOrderEdit(1)" class="button primary">编辑</view>
              </view>
            </div>
          </uni-group>
        </uni-section>
      </div>

      <view class="login-blank" v-else>
        <text class="text">暂无历史订单信息</text>
        <navigator url="/pages/index/index" open-type="switchTab" hover-class="none">
          <button class="button">去添加</button>
        </navigator>
      </view>
    </scroll-view>
  </view>
  <!-- 未登录: 提示登录 -->
  <view class="login-blank" v-else>
    <text class="text">登录后可查看历史订单</text>
    <navigator url="/pages/login/login" hover-class="none">
      <button class="button">去登录</button>
    </navigator>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { allOrderList, myOrderList } from '@/mock/mockOrder/index'
import { onShow } from '@dcloudio/uni-app'
import type { Datum } from '@/mock/mockOrder/type'
import { useMemberStore } from '@/stores'
/**
 * TODO
 * 打算时间筛选使用时间戳作为查询key；mysql中存储的date格式也是年月日格式
 * 根据日期格式的时间戳以及客户姓名，筛选对应的订单（customer角色无此两项功能，且只有最近三天的数据）
 *  1. 不选择日期，或者已选择日期为空的时候，返回所有预订单（admin和operator），客户角色（customer）只返回最近三天
 *  2. 做法一：数据量不大，考虑读取全部订单后，在前端根据角色、日期、客户姓名筛选即可
 *  3.做法二：后端控制做法，客户类角色访问对应api，后端筛选最近三比预订单即可；admin和operator访问对应接口，返回所有预订单即可（根据时间orderby）；、
 *      然后前端的筛选权限自行判断即可
 *  4. 进入该页面之前判断角色。如果为customer则不显示筛选功能，同时只显示本人的最近三个预定单
 **/
const selectedDate = ref<any>('2023-09-16')
const selectedName = ref('')
const selectType = ref<any>('date') //date和daterange，不能以变量的形式写,设为any
const picker = ref()
const memberStore = useMemberStore()
const mockRole = ['admin', 'operator', 'customer']

const isCustomer = computed(() => {
  return userRole.value == 'admin' || userRole.value == 'operator' ? false : true
})
const hanleOrderEdit = (id: any) => {
  console.log('id', id)
}
const data = [
  { date: '2023-09-01', name: '张三' },
  { date: '2023-09-02', name: '李四' },
  { date: '2023-09-03', name: '王五' },
  { date: '2023-09-04', name: '张三' },
  { date: '2023-09-05', name: '李四' },
  { date: '2023-09-019', name: '王五' },
  // 更多数据...
]

const nameOptions = ref([
  { text: '张三', value: '张三' },
  { text: '李四', value: '李四' },
  { text: '王五', value: '王五' },
  // 更多选项...
])
const base_OrderData = ref()
onMounted(() => {
  console.log('onMounted')
  base_OrderData.value = orderData.value
})
const onDateChange = async (e: any) => {
  console.log('当前选中的日期为：', e, typeof e)
  if (!e?.length) {
    console.log('为空')
    console.log('base_OrderData.value', base_OrderData.value)
    orderData.value = base_OrderData.value
    return
    // isCustomer.value ? await getCurrentUserOrderList() : await getAllOrderList()
  }
  const filter_res = base_OrderData.value?.filter((o: Datum) => {
    return o.orderDate == e
  })
  orderData.value = filter_res
  console.log('orderData.value = ', orderData.value)
  // 得到类似 ["2023-09-04", "2023-09-20"]
  // 日期变化时触发筛选
}

const onNameChange = (e: any) => {
  selectedName.value = e
  // 客户姓名变化时触发筛选
}
// 初始化调用: 页面显示触发
// 判断是否有订单数据
const getAllOrderList = async () => {
  orderData.value = allOrderList.data
  console.log('orderData.value = ', orderData.value)
  // orderData.value[0].orderDetail[0].baselinePrice
}
const getCurrentUserOrderList = async () => {
  orderData.value = myOrderList.data
}
/**
 * @description 判断用户身份
 **/
const orderData = ref<Datum[]>()
const userRole = ref()
const checkUserIdentity = async () => {
  // 可以通过memberStore来获取用户信息，包括角色信息，可以将userRole换成memberStore.profile的相关内容
  // if (memberStore.profile) {}
  console.log('check start')

  // mock user identity is customer,production should use async api to get
  // TODO:获取用户身份
  userRole.value = mockRole[0]
  if (userRole.value == 'customer') {
    await getCurrentUserOrderList()
    // TODO:只读取自己的订单数据，只返回最近三单
  } else if (userRole.value == 'admin' || userRole.value == 'operator') {
    await getAllOrderList()
    // TODO:读取所有的数据，同时具有筛选客户和时间的功能
  } else {
    // 什么角色都没有。赋空值
    orderData.value = []
  }

  console.log('check over', orderData.value?.length, 'isCustomer', isCustomer?.value)
}
onShow(async () => {
  await checkUserIdentity()
})
</script>
<style lang="scss" scoped>
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
page {
  background-color: #f7f7f7;
  height: 100vh;
  overflow: hidden;
}

.viewport {
  //修改下视口宽度为100vh就行，scrollview设为flex：1使用剩下的100%就行
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.scroll_view {
  height: calc(100% - 20px); //flex:1会出现无法滚动到底部的问题
  overflow: hidden;
}

.mysection :deep(.uni-section) {
  padding-bottom: 40px;
}
.mycard :deep(.uni-group--card) {
  box-shadow: 0 0 5px 1px rgba(64, 64, 64, 0.5) !important;
}
.group {
  .content {
    margin-bottom: 12rpx;
    font-size: 30rpx;
    .detail {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      justify-content: flex-start;
      .index {
        min-width: 40rpx;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        text-align: center;
      }
    }
    .detail view {
      margin-left: 30rpx;
    }
    .last-detail {
      margin-bottom: 20px;
    }
  }
  .footer {
    height: 60rpx;
    width: 100%;
    margin-top: 20rpx;
    // background-color: #bfa;
    line-height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    padding: 6px;
    line-height: 1.2;
    color: #fff;
    font-size: 26rpx;
    margin-left: 14rpx;
    border-radius: 20rpx;
  }

  .primary {
    color: #fff;
    background-color: #27ba9b;
  }
  .delete-button {
    background-color: #cf4444;
  }
}
</style>
