<script setup lang="ts">
import { CustomerModal } from '@/hooks/loginstate/components/tologin'
import type { OrderDetail } from '@/mock/mockOrder/type'
import {
  updatePoultryGoodsAPI,
  getPoultryGoodsByIdAPI,
  getPostObjectParamsAPI,
} from '@/services/goods'
import { getPoultryRecommendAPI } from '@/services/hot'
import { useMemberStore } from '@/stores'
import type { Category } from '@/types/hot'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import upload from '@/components/upload.vue'
import type { ALOS } from '@/types/alos'
import { baseImgUrl, baseUploadUrl } from '@/utils/setting'

// 热门推荐页 标题和url
// 热门推荐页  标题和url
const urlMap = [
  { type: '1', title: '鸡类', url: '/hot/preference' }, //这里面是一个大类，读取到后会分成两个子类
  { type: '2', title: '鸭类', url: '/hot/inVogue' },
  { type: '3', title: '其他类', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
  //不传任何参数的话，可以返回所有的分类包括分类下的对应商品信息；可以进行后续的筛选;量不多，不考虑子类分页查询，直接返回全部就行
  { type: '5', title: '商品分类', url: '/poultry/getCategory' },
]

/**
 * @description 商品分类数组
 **/
const range = [
  { value: '鸡类', text: '鸡类' },
  { value: '鸭类', text: '鸭类' },
  { value: '其他', text: '其他' },
]
const inputClearSize = ref<any>('18px')
/**
 * @description 处理分类选择
 **/
const categoryChange = (e: any) => {
  console.log('已选择分类', e)
}

// 多选数据源
const specList = [
  { text: '小', value: '小' },
  { text: '中', value: '中' },
  { text: '大', value: '大' },
]

const uploadState = ref(false)

// uniapp 获取页面参数
/**
 * TODO:
 * 假设用type=1作为全部商品的页面，作为基准用于增删改
 * subTypes可以作为鸡和鸭类等的子分类
 **/
const query = defineProps({
  type: {
    type: String,
    default: '5',
  },
})
console.log(query)
const currUrlMap = urlMap.find((v) => v.type === query.type)
// 动态设置标题
uni.setNavigationBarTitle({ title: currUrlMap!.title })

// 推荐封面图
const bannerPicture = ref('')
// 推荐选项
const subTypes = ref<Category[]>()
// 高亮的下标
const activeIndex = ref(0)
// 获取热门推荐数据
const getHotRecommendData = async () => {
  const res: any = await getPoultryRecommendAPI(currUrlMap!.url, {})
  console.log('res.result', res.result)
  if (!res.result.length) {
    isData.value = false
    return
  }
  isData.value = true
  bannerPicture.value = res.result[0].bannerPicture //默认进来给他第一个选项的宣传图
  subTypes.value = res.result as any
}

// 判断用户角色
const roleValue = ref()
const getMemberInfo = async () => {
  const memberStore = useMemberStore()
  console.log('memberStore.profile', memberStore.profile)
  roleValue.value = memberStore.profile?.role
  if (memberStore.profile?.token) isLogin.value = true
}
onShow(async () => {
  await getMemberInfo()
  console.log('rooleValue: ', roleValue.value)
})
// 页面加载
onLoad(async () => {
  uni.showLoading({
    title: '加载中',
    mask: false,
  })
  await getHotRecommendData()
  await getUploadConfig()
  console.log('onload获取上传秘钥，两小时过期')
  setTimeout(() => {
    uni.hideLoading()
  }, 500)
})

const baseProductInfo = {
  pid: undefined,
  categoryName: '',
  productName: '',
  baselinePrice: undefined,
  spec: ['小', '中', '大'],
  inventory: undefined,
  picture: '',
}
// 直接在本地触发就行，poup写在本页
const productInfo = ref<Partial<OrderDetail>>({
  pid: undefined,
  categoryName: '',
  productName: '',
  baselinePrice: undefined,
  spec: ['小', '中', '大'],
  inventory: undefined,
  picture: '',
})

// uni-ui 弹出层组件 ref
const isEditPoup = ref(false)
const editPoup = ref<{
  open: (type?: UniHelper.UniPopupType) => void
  close: () => void
}>()
const isLogin = ref(false)

const isData = ref(false)

const openPoup = async (type: string, goods_id?: number) => {
  console.log('商品ID', goods_id, 'type', type)
  console.log('isLogin', isLogin.value)
  if (!isLogin) {
    CustomerModal('请先登录', '/pages/login/login')
    return
  }
  if (type == 'edit') {
    uni.showLoading({
      title: '加载中',
      mask: false,
    })
    productInfo.value = await getGoodsByIdData(goods_id!)
    console.log('productInfo.value', productInfo.value)
    // 读取对应ID的数据，进行编辑
    isEditPoup.value = true
    uni.hideLoading()
    editPoup.value?.open('bottom')
    return
  }

  if (type == 'add') {
    uni.showLoading({
      title: '加载中',
      mask: false,
    })
    // 使用默认的表单数据进行添加商品的操作
    isEditPoup.value = false
    uni.hideLoading()
    editPoup.value?.open('bottom')
    return
  }
}
// 获取商品详情信息
const getGoodsByIdData = async (goods_id: number) => {
  console.log('goods_id: ' + goods_id)
  const res: any = await getPoultryGoodsByIdAPI(goods_id)
  const { categoryInfo, ...rest } = res.result.items
  return { ...rest, ...categoryInfo }
}
const editFormRules: UniHelper.UniFormsRules = {
  categoryName: { rules: [{ required: true, errorMessage: '请选择分类', format: 'string' }] },
  productName: { rules: [{ required: true, errorMessage: '请输入商品名称', format: 'string' }] },
  baselinePrice: { rules: [{ required: true, errorMessage: '请输入基准价格', format: 'number' }] },
  spec: { rules: [{ required: true, errorMessage: '请输入价格', format: 'string' }] },
  inventory: { rules: [{ required: true, errorMessage: '请输入库存', format: 'number' }] },
}

const isImgReceived = ref(false)
/**
 * 处理图片url
 **/
const receiveTmpImgUrl = (e: { imgUrl: string }) => {
  console.log('e.imgUrl', e.imgUrl)
  if (e.imgUrl) {
    isImgReceived.value = true //有改变图片就重新上传
    fileInfo.value.imgUrl = e.imgUrl
    fileInfo.value.imgType = e.imgUrl.split('.').pop()!
    console.log('获得临时路径图片', fileInfo.value.imgUrl)
  } else {
    isImgReceived.value = false
  }
}

/**
 * @description 编辑校验表单
 **/

const ALOSCONF = ref<ALOS>()
const fileInfo = ref({
  imgUrl: '',
  key: '',
  ossUrl: baseUploadUrl,
  imgType: '',
  productName: '',
})
/**
 * 获取上传参数
 **/
const getUploadConfig = async () => {
  ALOSCONF.value = (await getPostObjectParamsAPI()).result
  console.log(' ALOSCONF.value', ALOSCONF.value)
}
const handleImgUpload = async () => {
  //获取图片临时路径
  const imgUrl = fileInfo.value.imgUrl
  const productName = fileInfo.value.productName
  fileInfo.value.key = `poultry-image/${productName}.${fileInfo.value.imgType}`
  uni.showLoading({ title: '正在上传图片中...' })
  console.log('alcon', ALOSCONF.value)
  uni.uploadFile({
    //图片上传地址
    url: fileInfo.value.ossUrl,
    filePath: imgUrl,
    //上传名字，注意与后台接收的参数名一致
    name: 'file',
    // fileType: 'image',
    //设置请求头
    header: { 'Content-Type': 'image/png' },
    formData: {
      name: productName ?? '',
      key: fileInfo.value.key,
      policy: ALOSCONF.value!.policy, // 输入你获取的的policy
      OSSAccessKeyId: ALOSCONF.value!.OSSAccessKeyId, // 输入你的AccessKeyId
      success_action_status: '200', // 让服务端返回200,不然，默认会返回204
      signature: ALOSCONF.value!.signature, // 输入你获取的的signature
    },
    success: (res: any) => {
      console.log('res', res)
    },
    complete: () => {
      uni.hideLoading()
      console.log('sbasdjashdkj')
      const imgUrl = fileInfo.value.ossUrl + '/' + fileInfo.value.key
      console.log('最终的路径', imgUrl)
    },
  })
}

const submitForm = async () => {
  console.log('edit===', productInfo.value)
  await saveChanges()
}
const editFormRef = ref<UniHelper.UniFormsInstance>()
const saveChanges = async () => {
  let isValid = true // 校验状态标志
  const formRef = editFormRef.value // 获取表单引用
  const isFormValid = await formRef?.validate?.() // 校验表单
  if (!isFormValid) {
    console.log('表单错误信息')
    isValid = false
  }

  if (isValid) {
    fileInfo.value.productName = productInfo.value.productName!
    const { pid, picture, ...rest } = productInfo.value
    // 判断是否需要修改图片
    let res: any
    console.log('isImgReceived.value', isImgReceived.value)
    if (!isImgReceived.value) {
      console.log('不修改图片')
      res = await updatePoultryGoodsAPI(rest, pid)
    } else {
      // 更新数据库,包括图片
      console.log('修改图片')
      await handleImgUpload()
      res = await updatePoultryGoodsAPI(
        { ...rest, ...{ picture: fileInfo.value.ossUrl + '/' + fileInfo.value.key } },
        pid,
      )
    }
    if (res.result.pid) {
      await getHotRecommendData()
      uni.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 1500,
        mask: false,
      })
      editPoup.value?.close()
    } else if (res.result == '无对应的分类') {
      uni.showToast({
        title: res.result,
        icon: 'error',
        duration: 1500,
        mask: false,
      })
    }
    // TODO 更新成功后，恢复表单表单默认数据
    uploadState.value = true
    isImgReceived.value = false
    productInfo.value = { ...productInfo.value, ...baseProductInfo }
  }
}
const handleEditPoup = (e: any) => {
  if (!e.show) {
    productInfo.value = { ...productInfo.value, ...baseProductInfo }
    editFormRef.value?.clearValidate?.()
  }
}
// 切换tab
const changeTab = (index: number, item: Category) => {
  bannerPicture.value = item.bannerPicture
  console.log('bannerPicture', bannerPicture.value)
  activeIndex.value = index
}
</script>

<template>
  <view class="viewport" v-if="roleValue == 'admin'">
    <!-- 推荐封面图 -->
    <div class="first_part" v-if="isData">
      <view class="cover">
        <image class="image" mode="widthFix" :src="bannerPicture"></image>
      </view>
      <!-- 推荐选项 -->
      <view class="tabs">
        <text
          v-for="(item, index) in subTypes"
          :key="item.cid"
          class="text"
          :class="{ active: index === activeIndex }"
          @tap="changeTab(index, item)"
          >{{ item.categoryName }}</text
        >
      </view>
      <!-- 推荐列表 -->
      <scroll-view
        enable-back-to-top
        v-for="(item, index) in subTypes"
        :key="item.cid"
        v-show="activeIndex === index"
        scroll-y
        class="scroll-view"
      >
        <view class="goods">
          <view class="navigator" v-for="goods in item.products" :key="goods.pid">
            <image class="thumb" :src="baseImgUrl + goods.productName + '.png'"></image>
            <view class="right">
              <view class="name ellipsis">{{ goods.productName }}</view>
              <view class="inventory">
                <view>
                  <text> 库存 </text>
                  {{ goods.inventory }}
                </view>
              </view>
              <view class="price">
                <view>
                  <!-- <text class="symbol">¥</text> -->
                  <text class="number">{{ goods.baselinePrice }}元/斤</text>
                </view>
                <view @click="openPoup('edit', goods.pid)">
                  <uni-icons type="compose" color="#27ba9b" size="30px" />

                  <!-- <text class="icon-cart"></text> -->
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </div>
    <!-- 底部弹出的编辑商品的poup -->
    <uni-popup ref="editPoup" background-color="#fafafa" @change="handleEditPoup">
      <div class="poup_wrap">
        <div class="header">{{ isEditPoup ? '修改商品' : '新增商品' }}</div>
        <scroll-view scroll-y class="scroll_view">
          <div class="poup_content">
            <div class="line">
              <uni-forms
                ref="editFormRef"
                label-width="140rpx"
                label-align="right"
                :modelValue="productInfo"
                :rules="editFormRules"
              >
                <uni-forms-item label="分类" name="categoryName">
                  <uni-data-select
                    v-model="productInfo.categoryName"
                    :localdata="range"
                    :clear-size="inputClearSize"
                    placeholder="请选择分类"
                  ></uni-data-select>
                </uni-forms-item>
                <uni-forms-item label="商品名" name="productName">
                  <uni-easyinput
                    type="text"
                    :clear-size="inputClearSize"
                    v-model="productInfo.productName"
                    placeholder="请输入商品名称"
                  />
                </uni-forms-item>
                <uni-forms-item label="基础价格" name="baselinePrice">
                  <uni-easyinput
                    :clear-size="inputClearSize"
                    type="digit"
                    v-model="productInfo.baselinePrice"
                    placeholder="请输入基准价格"
                  />
                </uni-forms-item>
                <div class="align_center">
                  <uni-forms-item label="规格" name="spec">
                    <uni-data-checkbox
                      selectedColor="#27ba9b"
                      selectedTextColor="#27ba9b"
                      v-model="productInfo.spec"
                      multiple
                      :localdata="specList"
                    />
                  </uni-forms-item>
                </div>

                <uni-forms-item label="库存" name="inventory">
                  <uni-easyinput
                    :clear-size="inputClearSize"
                    type="number"
                    v-model="productInfo.inventory"
                    placeholder="请输入库存"
                  />
                </uni-forms-item>
                <div class="align_center">
                  <uni-forms-item label="商品图">
                    <!-- <uni-icons type="upload" color="#27ba9b" size="26" @click="onPictureChange" /> -->
                    <upload
                      :product-name="productInfo.productName"
                      :is-success="uploadState"
                      @tmp-img-path="receiveTmpImgUrl"
                    />
                  </uni-forms-item>
                </div>
              </uni-forms>
            </div>
            <view class="button edit_weight_button" @click="submitForm">提交</view>
          </div>
        </scroll-view>
      </div>
    </uni-popup>
    <!-- 添加商品按钮 -->
    <div class="sec_part">
      <view class="addProductButton" @click="openPoup('add')">
        <uni-icons type="plusempty" color="#599b7f" size="55px" />
      </view>
    </div>
  </view>
  <view v-else>
    <view class="customer_info"> <text>暂无权限</text> </view>
  </view>
</template>

<style lang="scss" scoped>
.align_center :deep(.uni-forms-item__content) {
  display: flex;
  align-items: center;
}
//修改表单的字体大小
.line :deep(.uni-forms-item__label) {
  font-size: 35rpx !important;
  justify-content: flex-end !important;
  width: 250rpx !important;
}
.line :deep(.uni-easyinput__content-input) {
  font-size: 35rpx !important;
}
.line :deep(.uni-select__input-box) {
  font-size: 35rpx !important;
}

.line :deep(.uni-select__selector-item) {
  font-size: 35rpx;
}
.poup_wrap {
  height: 65vh;
  //background-color: #27ba9b;
  .header {
    position: relative;
    widows: 100%;
    top: 0;
    padding: 10rpx;
    font-weight: 500;
    font-size: 40rpx;
    text-align: left;
    background-color: #f6f5f3;
  }
  .scroll_view {
    height: 100%;
    padding: 20rpx;

    .poup_content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      flex-direction: column;
      padding-bottom: 100rpx;

      .line {
        display: flex;
        width: 85%;
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
        font-size: 35rpx;
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

page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 180rpx 0 0;
  position: relative;
}
.customer_info {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 45rpx;
  font-weight: 600;
  height: 80vh;
  letter-spacing: 8rpx;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  .image {
    width: 750rpx;
  }
}
.scroll_view {
  height: 100%; //flex:1会出现无法滚动到底部的问题
  overflow: hidden;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 40rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    //width: 345rpx;
    width: 100%;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
    display: flex;
    .right {
      flex: 1;
      margin-left: 20rpx;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
    }
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    line-height: 1;
    font-size: 40rpx;
    width: 100%;
  }
  .inventory {
    font-size: 35rpx;
    color: #333;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .number {
      font-size: 40rpx;
    }
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
.addProductButton {
  position: absolute;
  left: 10px;
  bottom: 10vh;
  z-index: 33;
}
</style>
