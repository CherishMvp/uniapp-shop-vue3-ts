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
            @maskClick="handleDateeClear"
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
            @change.stop="onNameChange"
          />
        </div>
      </div>
    </div>
    <scroll-view scroll-y class="scroll_view">
      <!-- 使用isOrderList代替 -->
      <!-- <text class="header_tip" v-if="orderData?.length">普通用户只显示最近三笔订单 </text> -->
      <div class="order_wrap" v-if="orderData?.length">
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
                            detail.productName == '饲料' || detail.productName == '玉米'
                              ? '斤'
                              : '只'
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
              <!-- TODO:后续要在pinia中添加角色的信息 -->
              <view class="footer" v-if="!isCustomer">
                <view
                  @tap="sendTemplateInfo(item)"
                  v-if="false && (userRole == 'operator' || userRole == 'admin')"
                  class="button edit_weight_button"
                  >发送订阅消息</view
                >
                <view
                  @tap="getOrderDetail(item)"
                  v-if="false && (userRole == 'operator' || userRole == 'admin')"
                  class="button edit_weight_button"
                  >获取该笔订单详情</view
                >
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
          v-if="!orderData?.length"
          url="/pages/index/index"
          open-type="switchTab"
          hover-class="none"
        >
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
  <uni-popup
    style="z-index: 2"
    background-color="#fafafa"
    :safe-area="false"
    ref="editPoup"
    @change="handlePoup"
    type="bottom"
    @mask-click="closePoup"
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
              <uni-forms-item
                :label="editItem.productName + '(' + editItem.spec + ')' + editItem.number + '只'"
                name="weight"
              >
                <uni-easyinput
                  :clear-size="('18px' as any)"
                  type="digit"
                  :clearable="true"
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
              <!-- 使用v-if配合默认值使用，未输入价格的时候 就使用默认值就行 -->
              <uni-forms-item
                :label="editItem.productName + '(' + editItem.spec + ')'"
                name="fixedPrice"
              >
                <!-- 此处可知，:value就是可用作默认值，v-model是双向绑定的内容 -->
                <!--  Number(editItem.fixedPrice) ? editItem.fixedPrice :editItem.baselinePrice这种写法可以在清除v-model内容的时候，使用:value的默认值  -->
                <uni-easyinput
                  :clear-size="('18px' as any)"
                  :clearable="true"
                  v-model="editItem.fixedPrice"
                  type="digit"
                  placeholder="请输入价格"
                  v-if="Number(editItem.fixedPrice)"
                />
                <uni-easyinput
                  v-else
                  :clear-size="('18px' as any)"
                  :clearable="true"
                  v-model="editItem.baselinePrice"
                  type="digit"
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import type { Datum, OrderDetail } from '@/mock/mockOrder/type'
import { useMemberStore } from '@/stores'
import {
  getPoultryOrderByIdAPI,
  postPoultryWeightAPI,
  getAllUsersAPI,
  postTemplateInfo,
  getOrderInfoByOrderIdAPI,
} from '@/services/order'
import { CustomerModal } from '@/hooks/loginstate/components/tologin'

const selectedDate = ref<any>('')
const selectedName = ref('')
const selectType = ref<any>('date')
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
const editFormRules: UniHelper.UniFormsRules = {
  weight: { rules: [{ required: true, errorMessage: '请输入重量', format: 'number' }] },
  fixedPrice: { rules: [{ required: false, errorMessage: '请输入价格', format: 'number' }] },
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
  let isValid = true
  for (let i = 0; i < (editPoupData.value as any).length; i++) {
    const formRef = (editFormRef.value as any)[i]
    const isFormValid = await formRef?.validate?.()
    if (!isFormValid) {
      console.log('表单错误信息')
      isValid = false
      break
    }
  }
  if (isValid) {
    console.log('Saving changes:', editPoupData.value)

    if (editHeaderInfo.value.type == 'weight') {
      const newItems = editPoupData.value!.map(({ id, weight }) => ({
        id,
        weight,
        oid: current_oid.value,
      }))
      console.log('newItems', newItems)
      await postPoultryWeightAPI(newItems)
      editPoup.value?.close()
      uni.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 1500,
        mask: false,
      })
      await getAllOrderList(true)
      console.log('更新成功')
      return
    }
    if (editHeaderInfo.value.type == 'fixedPrice') {
      const newItems = editPoupData.value!.map(({ id, fixedPrice, baselinePrice }) => ({
        id,
        fixedPrice: Number(fixedPrice) ? fixedPrice : baselinePrice,
        oid: current_oid.value,
      }))
      console.log('newItems', newItems)
      await postPoultryWeightAPI(newItems)
      editPoup.value?.close()
      uni.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 1500,
        mask: false,
      })
      await getAllOrderList(true)
      console.log('更新成功')
      return
    }
  }
}
const closePoup = async () => {
  await getAllOrderList()
}
const handlePoup = (e: any) => {
  console.log('poup状态', e)
}
// 发送模板消息
const sendTemplateInfo = async (item: any) => {
  console.log('item', item)
  // 订单详情页面获取
  const res = await postTemplateInfo({ orderId: item.id, openId: item.openId })
  console.log('res', res)
  uni.showToast({
    title: res.result.message,
    icon: 'loading',
    mask: true,
  })
}
// 获取订单详情
const getOrderDetail = async (item: any) => {
  console.log('item', item)
  uni.navigateTo({
    url: '/pages/order/orderDetail' + `?orderId=${item.id}&openId=${item.openId}`,
  })
}
const current_oid = ref()
const isLogin = ref(false)
const hanleOrderEdit = (id: any, info: Datum) => {
  console.log('登陆状态', isLogin)
  if (!isLogin) {
    return
  }
  current_oid.value = info.id
  console.log('id', id, 'info', info, 'current_oid', current_oid.value)
  editHeaderInfo.value.orderInfo = { date: info.orderDate, name: info.userName }
  editPoupData.value = info.orderDetail
  console.log('当前编辑信息', editPoupData.value)

  const typeMap: { [key: number]: string } = {
    0: 'weight',
    1: 'fixedPrice',
  }
  if (id == 0) {
    editPoupData.value.forEach((item: any) => {
      if (!Number(item.weight)) {
        item.weight = undefined
      }
    })
  }
  console.log('当前编辑信息22', editPoupData.value)

  if (typeMap[id]) {
    editHeaderInfo.value.type = typeMap[id]
    editPoup.value?.open()
  }
}

const nameOptions = ref([])
const getUserList = async () => {
  console.log('sb')
  nameOptions.value = (await getAllUsersAPI()).result
}
const onDateChange = async (e: any) => {
  console.log('当前选中的日期为：', e, typeof e)
  curent_searchInfo.value.orderDate = e
  orderData.value = (await getPoultryOrderByIdAPI(curent_searchInfo.value)).result
}

const handleDateeClear = () => {
  picker.value?.clear()
  curent_searchInfo.value.orderDate = ''
}
const onNameChange = async (e: any) => {
  console.log('ee', e)
  selectedName.value = e
  curent_searchInfo.value.openId = e
  orderData.value = (await getPoultryOrderByIdAPI(curent_searchInfo.value)).result
}

const curent_searchInfo = ref({
  openId: '',
  orderDate: '',
  userName: '',
})
const getAllOrderList = async (justUpdateCurrent: boolean = false) => {
  console.log('curent_searchInfo.valuexxx', curent_searchInfo.value)
  console.log('memberStore.profile!.openId', memberStore.profile!.openId)
  console.log('userRole.value ', userRole.value)
  curent_searchInfo.value.openId = userRole.value != 'customer' ? '' : memberStore.profile!.openId
  if (justUpdateCurrent) {
    curent_searchInfo.value.openId = selectedName.value
  }
  console.log('curent_searchInfo', curent_searchInfo.value)
  console.log('userRole', userRole.value)

  const res = await getPoultryOrderByIdAPI(curent_searchInfo.value)
  console.log('res.result', res.result)
  orderData.value = res.result

  await getUserList()
}

const checkUserIdentity = async () => {
  console.log('check start')

  if (memberStore.profile?.token) {
    userRole.value = memberStore.profile?.role
    if (userRole.value) {
      await getAllOrderList()
      isLogin.value = true
    } else {
      orderData.value = []
      isLogin.value = false
    }
    console.log('check over', orderData.value, 'isCustomer', isCustomer?.value)
  }
}
onShow(async () => {
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
.line :deep(.uni-forms-item__label) {
  font-size: 35rpx !important;
  justify-content: flex-end !important;

  flex: 1;
  height: 50px !important;
}

.line :deep(.uni-forms-item) {
  align-items: center !important;
}
.line :deep(.uni-easyinput__content-input) {
  font-size: 35rpx !important;
}
.line :deep(.uni-select__input-box) {
  font-size: 35rpx !important;
}
.poup_wrap {
  height: 70vh;
  overflow: hidden;

  .header {
    position: relative;
    line-height: 1.2;
    widows: 100%;
    top: 0;
    padding: 10rpx;
    font-weight: 500;
    font-size: 40rpx;
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
        width: 80%;
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
        font-size: 30rpx;
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
    font-size: 35rpx;
    margin: 20rpx 0;
  }
  .button {
    width: 240rpx !important;
    height: 60rpx;
    line-height: 60rpx;
    margin-top: 20rpx;
    font-size: 30rpx;
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
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.filter_action {
  position: relative;
  border-bottom: #333 solid 1px;

  .action_bar {
    position: sticky;
    z-index: 1;
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
  .footer {
    height: 60rpx;
    width: 100%;
    margin-top: 20rpx;

    line-height: 60rpx;
    display: flex;
    align-items: center;
    font-size: 30rpx;
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
    font-size: 30rpx;
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
