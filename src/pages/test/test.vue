<template>
  <div>
    <!-- 筛选日期 -->
    <uni-section :title="'选择对应的时间'" type="line"></uni-section>
    <uni-datetime-picker
      ref="picker"
      v-model="selectedDate"
      :type="selectType"
      rangeSeparator="至"
      :border="false"
      return-type="timestamp"
      @change="onDateChange"
      @maskClick="picker?.clear()"
    ></uni-datetime-picker>
    <!-- 筛选客户姓名 -->
    <div>
      <uni-section :title="'选择客户姓名'" type="line" />
      <uni-data-select v-model="selectedName" :localdata="nameOptions" @change="onNameChange" />
    </div>
    <!-- 使用isOrderList代替 -->
    <div class="order_wrap" v-if="orderData">
      <uni-section
        :title="item.orderDate + '订单汇总'"
        type="line"
        :key="index"
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { myOrderList } from '@/mock/mockOrder/index'
import { onShow } from '@dcloudio/uni-app'
import type { Datum } from '@/mock/mockOrder/type'
/**
 * TODO
 * 打算时间筛选使用时间戳作为查询key；mysql中存储的date格式也是年月日格式
 * 根据日期格式的时间戳以及客户姓名，筛选对应的订单（customer角色无此两项功能，且只有最近三天的数据）
 *  1. 不选择日期，或者已选择日期为空的时候，返回所有预订单（admin和operator），客户角色（customer）只返回最近三天
 *  2. 做法一：数据量不大，考虑读取全部订单后，在前端根据角色、日期、客户姓名筛选即可
 *  3.做法二：后端控制做法，客户类角色访问对应api，后端筛选最近三比预订单即可；admin和operator访问对应接口，返回所有预订单即可（根据时间orderby）；、
 *      然后前端的筛选权限自行判断即可
 **/
const selectedDate = ref<any>()
const selectedName = ref('')
const selectType = ref<any>('date') //date和daterange，不能以变量的形式写,设为any
const picker = ref()
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

const onDateChange = (e: any) => {
  console.log('选择', e)
  // 得到类似 ["2023-09-04", "2023-09-20"]
  // 日期变化时触发筛选
}

const onNameChange = (e: any) => {
  selectedName.value = e

  // 客户姓名变化时触发筛选
}
// 初始化调用: 页面显示触发
// 判断是否有订单数据
const isOrderList = ref(false)
const getOrderList = async () => {
  orderData.value = myOrderList.data
  // mock orderData to none
  // orderData.value = []

  if (orderData.value?.length) {
    isOrderList.value = true
  }
  console.log('orderData.value = ', orderData.value, 'isOrderList.value = ', isOrderList.value)
  // orderData.value[0].orderDetail[0].baselinePrice
}
const orderData = ref<Datum[]>()
onShow(async () => {
  await getOrderList()
})
</script>
<style lang="scss" scoped>
.group {
  .content {
    margin-bottom: 12rpx;
    font-size: 30rpx;
    .detail {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      justify-content: space-evenly;
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
