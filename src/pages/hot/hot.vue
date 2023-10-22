<script setup lang="ts">
import { getPoultryRecommendAPI } from '@/services/hot'
import type { Category } from '@/types/hot'
import { onHide, onLoad } from '@dcloudio/uni-app'
import { ref, type Directive, type DirectiveBinding } from 'vue'
import { checkLoginState } from '@/hooks/loginstate'
import { CustomerModal } from '@/hooks/loginstate/components/tologin'
import sbxtx from '@/components/mySkuPoup/sbxtxpoup.vue'
import { baseImgUrl } from '@/utils/setting'

// 在模板中启用 v-focus
const vSrc = (el: HTMLElement, binding: DirectiveBinding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  console.log('bing', binding.value)
  const productName = binding.value
  el.setAttribute('src', baseImgUrl + productName + '.png')
}

// 热门推荐页  标题和url
const urlMap = [
  { type: '1', title: '鸡类', url: '/hot/preference' }, //这里面是一个大类，读取到后会分成两个子类
  { type: '2', title: '鸭类', url: '/hot/inVogue' },
  { type: '3', title: '其他类', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
  //不传任何参数的话，可以返回所有的分类包括分类下的对应商品信息；可以进行后续的筛选;量不多，不考虑子类分页查询，直接返回全部就行
  { type: '5', title: '商品分类', url: '/poultry/getCategory' }, //鸡类
  { type: '6', title: '商品分类', url: '/poultry/getCategory' }, //鸭类
  { type: '7', title: '商品分类', url: '/poultry/getCategory' }, //其他
]
onHide(() => {
  console.log('onShow===hot', showPoup.value)
  if (showPoup.value) showPoup.value = false
})
// uniapp 获取页面参数
const query = defineProps<{
  type: string
}>()
console.log(query)
const currUrlMap = urlMap.find((v) => v.type === query.type)
// 动态设置标题
uni.setNavigationBarTitle({ title: currUrlMap!.title })

// 推荐封面图
const bannerPicture = ref('')
// 推荐选项
const subTypes = ref<Category[]>()
// 高亮的下标
const activeIndex = ref(1001)
// 获取热门推荐数据
const getHotRecommendData = async (query: any) => {
  const res: any = await getPoultryRecommendAPI(currUrlMap!.url, {
    // 技巧：环境变量，开发环境，修改初始页面方便测试分页结束
  })
  console.log('res.result', res.result)
  const typeMapping: { [key: string]: number } = {
    '5': 1001, // 第一个选项的映射索引为0
    '6': 1002, // 第二个选项的映射索引为1
    '7': 1003, // 第三个选项的映射索引为2
  }
  if (query.type in typeMapping) {
    const index = typeMapping[query.type]
    const currentTag = res.result.find((item: any) => item.cid == index)
    bannerPicture.value = currentTag.bannerPicture
    activeIndex.value = index
  }

  subTypes.value = res.result as any
  console.log('subTypes', subTypes.value)
}

// 页面加载
onLoad(async (query: any) => {
  console.log('query', query)
  uni.showLoading({
    title: '加载中',
    mask: false,
  })
  await getHotRecommendData(query)
  setTimeout(() => {
    uni.hideLoading()
  }, 500)
})
const isLogin = ref(false)
// 获取商品详情信息
const goodsId = ref()
const showPoup = ref(false)
const openPoup = async (goods_id: number) => {
  console.log(' isLogin.value', isLogin.value)
  isLogin.value = await checkLoginState()
  if (!isLogin.value) {
    // return CustomerModal('请先登录', '/pages/login/login')
  }
  console.log('hot===id', goods_id)
  showPoup.value = true
  goodsId.value = goods_id
}

// 切换tab
const changeTab = (index: number, item: Category) => {
  console.log('index', index, 'item', item)
  bannerPicture.value = item.bannerPicture
  console.log('bannerPicture', bannerPicture.value)
  activeIndex.value = item.cid
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
        :key="item.cid"
        class="text"
        :class="{ active: item.cid === activeIndex }"
        @tap="changeTab(index, item)"
        >{{ item.categoryName }}</text
      >
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      enable-back-to-top
      v-for="(item, index) in subTypes"
      :key="item.cid"
      v-show="activeIndex === item.cid"
      scroll-y
      class="scroll-view"
    >
      <view class="goods">
        <view class="navigator" v-for="goods in item.products" :key="goods.pid">
          <image
            class="thumb"
            :lazy-load="true"
            :src="baseImgUrl + goods.productName + '.png'"
          ></image>
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
              <view @click="openPoup(goods.pid)">
                <uni-icons type="plus-filled" color="#cf4444" size="31px" />
                <!-- <text class="icon-cart"></text> -->
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <navigator
      v-if="!showPoup"
      class="shop_cart"
      url="/pages/cart/cart2"
      open-type="navigate"
      hover-class="none"
    >
      <uni-icons type="cart" color="#276d33" size="45" />
    </navigator>
    <sbxtx v-model="showPoup" :goodsId="goodsId" />
  </view>
</template>

<style lang="scss" scoped>
.shop_cart {
  position: fixed;
  right: 5vw;
  bottom: 20vh;
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
.scroll-view {
  flex: 1;
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
</style>
