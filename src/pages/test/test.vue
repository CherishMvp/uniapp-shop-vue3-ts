<template>
  <view class="viewport" v-if="memberStore.profile">
    <!-- 筛选日期 -->
    <div v-if="!isCustomer" class="filter_action">
      <div class="action_bar">
        <div class="left">
          <uni-section :title="'日期筛选'" title-font-size="35rpx" title-color="#000" type="line" />
          <uni-datetime-picker
            ref="picker"
            :disabled="isCustomer"
            v-model="selectedDate"
            :type="selectType"
            rangeSeparator="至"
            :border="true"
            @change="onDateChange"
            @maskClick="picker?.clear()"
          ></uni-datetime-picker>
        </div>
        <!-- 筛选客户姓名 -->
        <div class="right">
          <uni-section :title="'客户筛选'" title-font-size="35rpx" title-color="#000" type="line" />
          <uni-data-select
            :disabled="isCustomer"
            v-model="selectedName"
            :localdata="nameOptions"
            :clear="false"
            @change.prevent="onNameChange"
          />
        </div>
      </div>
    </div>
    <scroll-view scroll-y class="scroll_view">
      <!-- 使用isOrderList代替 -->
      <div class="order_wrap" v-if="orderData?.length">
        <uni-section
          :title="item.orderDate + '订货汇总'"
          title-font-size="20"
          title-color="#000"
          type="circle"
          :key="index"
          class="mycard"
          :class="{ mysection: index === orderData?.length - 1 }"
          v-for="(item, index) in orderData"
        >
          <uni-group :title="'客户姓名: ' + item.userName" mode="card" top="10">
            <div class="group">
              <view :key="index2" v-for="(detail, index2) in item.orderDetail" class="content">
                <view
                  class="detail"
                  :class="{ 'last-detail': index2 === item.orderDetail?.length - 1 }"
                >
                  <div class="index">{{ index2 + 1 }} .</div>
                  <div class="name">{{ detail.productName }} {{ detail.number }} 只</div>
                  <div class="base_price">{{ detail.baselinePrice }} 元/斤</div>
                  <div class="spec">规格 {{ detail.spec }}</div>
                </view>
              </view>
              <!-- 小计 -->
              <div class="total detail">
                <text> 小计: </text>
                <text
                  >总数量
                  {{ item.orderDetail.reduce((sum, item) => sum + item.number, 0) }} 只</text
                >
                <text>总价 {{ 2 > 11 ? 23 + '元' : '金额未知' }} </text>
              </div>
              <!-- TODO:后续要在pinia中添加角色的信息 -->
              <view class="footer" v-if="!isCustomer">
                <view
                  @tap="hanleOrderEdit(0, item)"
                  v-if="userRole == 'operator' || userRole == 'admin'"
                  class="button edit_weight_button"
                  >录入重量</view
                >
                <view
                  @tap="hanleOrderEdit(1, item)"
                  v-if="userRole == 'admin'"
                  class="button primary"
                  >修改价格</view
                >
              </view>
            </div>
          </uni-group>
        </uni-section>
      </div>
      <view class="login-blank" v-else>
        <text class="text">暂无历史订单信息</text>
        <navigator
          v-if="!base_OrderData?.length"
          url="/pages/index/index"
          open-type="switchTab"
          hover-class="none"
        >
          <button class="button">去添加</button>
        </navigator>
      </view>
      <uni-popup
        background-color="#fafafa"
        :safe-area="false"
        ref="editPoup"
        @change="handlePoup"
        type="bottom"
      >
        <div class="poup_wrap">
          <div class="header">
            <div class="left">
              {{ editHeaderInfo.type != 'weight' ? '修改价格' : '修改重量' }}
            </div>
            <div class="right">
              {{ editHeaderInfo.orderInfo.name }} — {{ editHeaderInfo.orderInfo.date }}
            </div>
          </div>
          <scroll-view scroll-y class="scroll_view">
            <div class="poup_content">
              <div class="line" v-for="(editItem, editIndex) in editPoupData" :key="editIndex">
                <uni-forms
                  ref="editFormRef"
                  :rules="editFormRules"
                  label-position="left"
                  :modelValue="editItem"
                  v-if="editHeaderInfo.type == 'weight'"
                >
                  <uni-forms-item :label="editItem.productName" name="weight">
                    <uni-easyinput
                      :clear-size="('18px' as any)"
                      type="digit"
                      v-model="editItem.weight"
                      placeholder="请输入重量"
                    />
                  </uni-forms-item>
                </uni-forms>
                <uni-forms
                  ref="editFormRef"
                  :rules="editFormRules"
                  label-position="left"
                  :modelValue="editItem"
                  v-if="editHeaderInfo.type == 'fixedPrice'"
                >
                  <uni-forms-item :label="editItem.productName" name="fixedPrice">
                    <uni-easyinput
                      :clear-size="('18px' as any)"
                      type="digit"
                      v-model="editItem.fixedPrice"
                      placeholder="请输入价格"
                    />
                  </uni-forms-item>
                </uni-forms>
              </div>
              <view class="button edit_weight_button" @click="saveChanges">提交</view>
            </div>
          </scroll-view>
        </div>
      </uni-popup>
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
import { ref, computed } from 'vue'
import { allOrderList, myOrderList } from '@/mock/mockOrder/index'
import { onReady, onShow } from '@dcloudio/uni-app'
import type { Datum, OrderDetail } from '@/mock/mockOrder/type'
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
const selectedDate = ref<any>('')
const selectedName = ref('')
const selectType = ref<any>('date') //date和daterange，不能以变量的形式写,设为any
const picker = ref()
const memberStore = useMemberStore()
const mockRole = ['admin', 'operator', 'customer']
const orderData = ref<Datum[]>()
const userRole = ref()
const editFormRef = ref<UniHelper.UniFormsInstance>()
const editHeaderInfo = ref({
  type: '',
  orderInfo: {
    date: '',
    name: '',
  },
})
const editFormRules: UniHelper.UniFormsRules = {
  // 对name字段进行必填验证
  weight: { rules: [{ required: true, errorMessage: '请输入重量', format: 'number' }] },
  fixedPrice: { rules: [{ required: true, errorMessage: '请输入价格', format: 'number' }] },
}
const isCustomer = computed(() => {
  return userRole.value == 'admin' || userRole.value == 'operator' ? false : true
})
const editPoup = ref<{
  open: (type?: UniHelper.UniPopupType) => void
  close: () => void
}>()
const editPoupData = ref<OrderDetail[]>()
const saveChanges = async () => {
  let isValid = true // 校验状态标志
  for (let i = 0; i < (editPoupData.value as any).length; i++) {
    const formRef = (editFormRef.value as any)[i]
    const isFormValid = await formRef?.validate?.()
    if (!isFormValid) {
      console.log('表单错误信息')
      isValid = false
      break // 如果校验不通过，则停止后续处理
    }
  }
  if (isValid) {
    // 所有表单校验通过，继续处理逻辑
    console.log('Saving changes:', editPoupData.value)
    // 可以将更新后的数据发送到服务器，或者使用 editPoupData.value 更新 Vuex store
    editPoup.value?.close()
    uni.showToast({
      title: '修改成功',
      icon: 'success',
      duration: 1500,
      mask: false,
    })
    console.log('Saving changes:', editPoupData.value)
    console.log('sb')
  }
}
const handlePoup = (e: any) => {
  console.log('poup状态', e)
}
/**
 * @description 区分编辑重量和价格
 * @param id：0重量，1价格
 * @example id=0或1
 **/
const hanleOrderEdit = (id: any, info: Datum) => {
  console.log('id', id, 'info', info)
  editHeaderInfo.value.orderInfo = { date: info.orderDate, name: info.userName }
  editPoupData.value = info.orderDetail
  const typeMap: { [key: number]: string } = {
    0: 'weight',
    1: 'fixedPrice',
  }
  if (typeMap[id]) {
    editHeaderInfo.value.type = typeMap[id]
    editPoup.value?.open('bottom')
  }
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
  { text: '全部', value: '' },
  { text: '崔芳', value: '崔芳' },
  { text: '侯娜', value: '侯娜' },
  { text: '王五', value: '王五' },
  // 更多选项...
])
const base_OrderData = ref()
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
  // 判断此时客户是否有选择
  if (selectedName.value?.length) {
    orderData.value = base_OrderData.value?.filter((o: Datum) => {
      return o.userName == selectedName.value
    })
  }
  orderData.value = filter_res
  console.log('orderData.value = ', orderData.value)
  // 得到类似 ["2023-09-04", "2023-09-20"]
  // 日期变化时触发筛选
}

const onNameChange = async (e: any) => {
  console.log('base_OrderData.value', base_OrderData.value)
  if (!e?.length) {
    console.log('为空')
    isCustomer.value ? await getCurrentUserOrderList() : await getAllOrderList()
    // 判断此时日期是否有选择
    if (selectedDate.value?.length) {
      orderData.value = base_OrderData.value?.filter((o: Datum) => {
        return o.orderDate == selectedDate.value
      })
    }
    //orderData.value = base_OrderData.value
    console.log('为空时候的orderdata', orderData.value)
    return
  } else {
    console.log('name', e, 'selectedDate.value?.length', selectedDate.value?.length)
    selectedName.value = e
    let filter_res: any
    // 如果先筛选了日期，就要根据日期的筛选结果来选
    if (selectedDate.value?.length) {
      console.log('orderData.valuexx', orderData.value)
      filter_res = orderData.value?.filter((o: Datum) => {
        return o.userName == e
      })
    } else {
      console.log('base_OrderDataxxx', base_OrderData.value)
      filter_res = base_OrderData.value?.filter((o: Datum) => {
        return o.userName == e
      })
    }
    orderData.value = filter_res
    console.log('orderData.value = ', orderData.value)
  }
}
// 初始化调用: 页面显示触发
// 判断是否有订单数据
const getAllOrderList = async () => {
  orderData.value = allOrderList.data as any
  console.log('orderData.value = ', orderData.value)
  // orderData.value[0].orderDetail[0].baselinePrice
}
const getCurrentUserOrderList = async () => {
  orderData.value = myOrderList.data
}
/**
 * @description 判断用户身份
 **/

const checkUserIdentity = async () => {
  // 可以通过memberStore来获取用户信息，包括角色信息，可以将userRole换成memberStore.profile的相关内容
  // if (memberStore.profile) {}
  console.log('check start')

  // mock user identity is customer,production should use async api to get
  // TODO:获取用户身份
  // userRole.value = mockRole[0]
  userRole.value = memberStore.profile?.role ?? 'admin'
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
  base_OrderData.value = orderData.value
  console.log('check over', orderData.value, 'isCustomer', isCustomer?.value)
}
onShow(async () => {
  // 模拟此处获取用户角色信息
  uni.showLoading({
    title: '加载中',
    mask: false,
  })
  await checkUserIdentity()
  console.log('onMounted')
  uni.hideLoading()
})
</script>
<style lang="scss" scoped>
//修改表单的字体大小
.line :deep(.uni-forms-item__label) {
  font-size: 30rpx !important;
  justify-content: flex-end !important;
  width: 140rpx !important;
}
.line :deep(.uni-easyinput__content-input) {
  font-size: 30rpx !important;
}
.line :deep(.uni-select__input-box) {
  font-size: 30rpx !important;
}
.poup_wrap {
  height: 55vh;
  //background-color: #27ba9b;
  .header {
    position: relative;
    widows: 100%;
    top: 0;
    padding: 10rpx;
    font-weight: 500;
    font-size: 35rpx;
    text-align: left;
    background-color: #f6f5f3;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .scroll_view {
    padding: 20rpx;
    height: 100%;
    .poup_content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      flex-direction: column;
      padding-bottom: 100rpx;
      .line {
        display: flex;
        width: 60%;
        flex-wrap: wrap;
        flex-direction: column;
      }
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 260rpx;
        padding: 15rpx 18rpx;
        line-height: 1.5;
        color: #fff;
        font-size: 32rpx;
        border-radius: 20rpx;
      }

      .primary {
        color: #fff;
        background-color: #27ba9b;
      }
      .edit_weight_button {
        background-color: #f0ad4e;
      }
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
.filter_action {
  position: relative;
  border-bottom: #333 solid 1px;

  .action_bar {
    position: sticky;
    z-index: 3;
    display: flex;
    top: 0;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 18rpx;

    .left {
      width: 45%;
    }
    .right {
      width: 30%;
    }
  }
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
  .total {
    font-size: 30rpx;
    color: #000;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .total text:nth-of-type(n + 2) {
    margin-left: 30rpx;
  }
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
        margin-right: -15rpx;
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
    width: max-content;
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
  .edit_weight_button {
    background-color: #f0ad4e;
  }
}
</style>
