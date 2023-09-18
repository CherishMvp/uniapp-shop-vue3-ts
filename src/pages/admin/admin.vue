<script setup lang="ts">
import type { OrderDetail } from '@/mock/mockOrder/type'
import { getGoodsByIdAPI } from '@/services/goods'
import { getHotRecommendAPI } from '@/services/hot'
import type { SubTypeItem } from '@/types/hot'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 热门推荐页 标题和url
const urlMap = [
  { type: '1', title: '品类管理', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
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

/**
 * @description   上传图片 暂存图片，等待上传
 **/
const onPictureChange = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (res) => {
      // 本地路径
      const { tempFilePath } = res.tempFiles[0]
      productInfo.value.picture = tempFilePath
      console.log('current picture: ', productInfo.value.picture)
      // 上传
      // uploadFile(tempFilePath)最终提交的时候再上传
    },
  })
}

// 文件上传-兼容小程序端、H5端、App端
const uploadFile = (file: string) => {
  console.log('uploadFile', file)
  // 文件上传
  uni.uploadFile({
    url: '/member/profile/avatar',
    name: 'file',
    filePath: file,
    success: (res) => {
      if (res.statusCode === 200) {
        const avatar = JSON.parse(res.data).result.avatar
        // 个人信息页数据更新
        //profile.value!.avatar = avatar
        // Store头像更新
        //memberStore.profile!.avatar = avatar
        uni.showToast({ icon: 'success', title: '更新成功' })
      } else {
        uni.showToast({ icon: 'error', title: '出现错误' })
      }
    },
  })
}

// uniapp 获取页面参数
/**
 * TODO:
 * 假设用type=1作为全部商品的页面，作为基准用于增删改
 * subTypes可以作为鸡和鸭类等的子分类
 **/
const query = defineProps({
  type: {
    type: String,
    default: '1',
  },
})
console.log(query)
const currUrlMap = urlMap.find((v) => v.type === query.type)
// 动态设置标题
uni.setNavigationBarTitle({ title: currUrlMap!.title })

// 推荐封面图
const bannerPicture = ref('')
// 推荐选项
const subTypes = ref<(SubTypeItem & { finish?: boolean })[]>([])
// 高亮的下标
const activeIndex = ref(0)
// 获取热门推荐数据
const getHotRecommendData = async () => {
  const res = await getHotRecommendAPI(currUrlMap!.url, {
    // 技巧：环境变量，开发环境，修改初始页面方便测试分页结束
    page: import.meta.env.DEV ? 30 : 1,
    pageSize: 10,
  })
  // console.log(res.result.title)
  bannerPicture.value = res.result.bannerPicture
  subTypes.value = res.result.subTypes
}

// 页面加载
onLoad(() => {
  getHotRecommendData()
})

// 滚动触底
const onScrolltolower = async () => {
  // 获取当前选项
  const currsubTypes = subTypes.value[activeIndex.value]
  // 分页条件
  if (currsubTypes.goodsItems.page < currsubTypes.goodsItems.pages) {
    // 当前页码累加
    currsubTypes.goodsItems.page++
  } else {
    // 标记已结束
    currsubTypes.finish = true
    // 退出并轻提示
    return uni.showToast({ icon: 'none', title: '没有更多数据了~' })
  }

  // 调用API传参
  const res = await getHotRecommendAPI(currUrlMap!.url, {
    subType: currsubTypes.id,
    page: currsubTypes.goodsItems.page,
    pageSize: currsubTypes.goodsItems.pageSize,
  })
  // 新的列表选项
  const newsubTypes = res.result.subTypes[activeIndex.value]
  // 数组追加
  currsubTypes.goodsItems.items.push(...newsubTypes.goodsItems.items)
}
const baseProductInfo = {
  pid: '',
  cid: '',
  categoryName: '',
  productName: '',
  baselinePrice: 0,
  spec: ['小', '中', '大'],
  inventory: 0,
  picture: '',
}
// 直接在本地触发就行，poup写在本页
const productInfo = ref<Partial<OrderDetail>>({
  pid: '',
  cid: '',
  categoryName: '',
  productName: '',
  baselinePrice: 0,
  spec: ['小', '中', '大'],
  inventory: 0,
  picture: undefined,
})

// uni-ui 弹出层组件 ref
const isEditPoup = ref(false)
const editPoup = ref<{
  open: (type?: UniHelper.UniPopupType) => void
  close: () => void
}>()
const openPoup = async (type: string, goods_id?: string) => {
  console.log('收到本页点击的商品ID', goods_id, 'type', type)
  if (type == 'edit') {
    uni.showLoading({
      title: '加载中',
      mask: false,
    })
    await getGoodsByIdData(goods_id!)
    // 读取对应ID的数据，进行编辑
    productInfo.value = {
      pid: '46',
      cid: '81',
      categoryName: '鸡类',
      productName: '母鸡',
      baselinePrice: 64,
      spec: ['中'],
      inventory: 25,
      picture: 'http://dummyimage.com/400x400',
    }
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
    productInfo.value = { ...productInfo.value, ...baseProductInfo }
    isEditPoup.value = false
    uni.hideLoading()
    editPoup.value?.open('bottom')
    return
  }
}
// 获取商品详情信息
const getGoodsByIdData = async (goods_id: string) => {
  console.log('goods_id: ' + goods_id)
  const res = await getGoodsByIdAPI(goods_id)
  console.log('获取到对应的数据', res)
  // productInfo.value = res.result as any
  console.log('根据传来的ID获取商品详情：', productInfo.value)
  // SKU组件所需格式
  // productInfo.value获取数据
}
const editFormRules: UniHelper.UniFormsRules = {
  categoryName: { rules: [{ required: true, errorMessage: '请选择分类', format: 'string' }] },
  productName: { rules: [{ required: true, errorMessage: '请输入商品名称', format: 'string' }] },
  baselinePrice: { rules: [{ required: true, errorMessage: '请输入基准价格', format: 'number' }] },
  spec: { rules: [{ required: true, errorMessage: '请输入价格', format: 'string' }] },
  inventory: { rules: [{ required: true, errorMessage: '请输入库存', format: 'number' }] },
}
/**
 * @description 编辑校验表单
 **/

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
    // 表单校验通过，继续处理逻辑
    console.log(
      'productInfo.value.picturexxx',
      productInfo.value.picture,
      typeof productInfo.value.picture,
    )
    console.log('picture: ', productInfo.value.picture)
    console.log('Saving changes:', productInfo.value)
    //TODO 可以将更新后的数据发送到服务器，或者使用 productInfo.value 更新 Vuex store
    uploadFile(productInfo.value.picture!) //最终提交的时候再上传
    editPoup.value?.close()
    uni.showToast({
      title: '修改成功',
      icon: 'success',
      duration: 1500,
      mask: false,
    })
    console.log('Saving changes:', productInfo.value)
    // TODO 更新成功后，恢复表单表单默认数据
    //productInfo.value = baseProductInfo
    console.log('sb', baseProductInfo)
  }
}
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image class="image" mode="widthFix" :src="bannerPicture"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        v-for="(item, index) in subTypes"
        :key="item.id"
        class="text"
        :class="{ active: index === activeIndex }"
        @tap="activeIndex = index"
        >{{ item.title }}</text
      >
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      enable-back-to-top
      v-for="(item, index) in subTypes"
      :key="item.id"
      v-show="activeIndex === index"
      scroll-y
      class="scroll-view"
      @scrolltolower="onScrolltolower"
    >
      <view class="goods">
        <view class="navigator" v-for="goods in item.goodsItems.items" :key="goods.id">
          <image class="thumb" :src="goods.picture"></image>
          <view class="right">
            <view class="name ellipsis">{{ goods.name }}</view>
            <view class="inventory">库存: 899</view>
            <view class="price">
              <view>
                <!-- <text class="symbol">¥</text> -->
                <text class="number">{{ goods.price }}元/斤</text>
              </view>
              <view @click="openPoup('edit', goods.id)">
                <uni-icons type="compose" color="#27ba9b" size="30px" />
                <!-- <text class="icon-cart"></text> -->
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="loading-text">
        {{ item.finish ? '没有更多数据了~' : '正在加载...' }}
      </view>
    </scroll-view>
  </view>
  <!-- 底部弹出的编辑商品的poup -->
  <uni-popup ref="editPoup" background-color="#fafafa">
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
                  <uni-icons type="upload" color="#27ba9b" size="26" @click="onPictureChange" />
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
  <view class="addProductButton" @click="openPoup('add')">
    <uni-icons type="plus-filled" color="#599b7f" size="55px" />
  </view>
</template>

<style lang="scss" scoped>
.align_center :deep(.uni-forms-item__content) {
  display: flex;
  align-items: center;
}
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
        width: 70%;
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
  height: calc(100% - 20px); //flex:1会出现无法滚动到底部的问题
  overflow: hidden;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
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
    height: 88rpx;
    font-size: 30rpx;
  }
  .inventory {
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 32rpx;
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
