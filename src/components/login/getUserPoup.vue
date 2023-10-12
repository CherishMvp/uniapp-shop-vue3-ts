<template>
  <view v-if="props.modelValue">
    <!-- <u-popup :show="props.modelValue" mode="bottom" @close="getnickshow = false" round="16rpx"> -->
    <view class="getnickbox">
      <view class="flex_align_center">
        <image :src="project.logo" class="logoimg" mode="aspectFit"></image>
        <view class="name">
          {{ project.name }}
          <text>申请</text>
        </view>
      </view>
      <view class="m1 mt30">获取你的头像、昵称</view>
      <view class="m2">展示个人信息</view>
      <view class="xin1">
        <button
          class="flex_spacebetween buttoncss"
          open-type="chooseAvatar"
          @chooseavatar="chooseavatar"
        >
          <view class="flex_align_center toubox">
            <view class="t1">头像</view>
            <view v-if="avatar == ''" class="avatarbox">
              <u-icon name="account-fill" size="50" color="#999"></u-icon>
            </view>
            <image v-else :src="avatar" class="avatarimg"></image>
          </view>
          <u-icon name="arrow-right" size="25" color="#999"></u-icon>
        </button>
      </view>
      <view class="nick">
        <view class="n1">昵称:</view>
        <input type="nickname" v-model="nickname" placeholder="请输入昵称" />
      </view>
      <view class="fixedBtn wan">
        <button size="mini" open-type="getUserInfo" @click="getUserInfo" :plain="true" class="btn">
          完成
        </button>
      </view>
    </view>
    <!-- </u-popup> -->
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { onMounted } from 'vue'
import { ref, reactive } from 'vue'

const getnickshow = ref(false)
const project = reactive({
  name: '',
  logo: '',
})
const props = defineProps<{
  modelValue: boolean
}>()
const emits = defineEmits(['update:modelValue'])
const avatar = ref('')
const nickname = ref()
const baseUrl = ref()
onMounted(() => {
  console.log('props', props.modelValue)

  // 获取项目的 logo 和 名称
  uni.getSystemInfo({
    success: (res) => {
      project.name = res.appName
    },
  })
  project.logo = ''
})
// 选择用户头像， 重点， 得调用下上传图片接口
const chooseavatar = (e: any) => {
  uni.uploadFile({
    url: baseUrl + 'api/common/upload',
    filePath: e.detail.avatarUrl,
    name: 'file',
    formData: {
      is_wxhead: 1,
    },
    header: {
      // Authorization: uni.getStorageSync("token")
    },
    success: (r): any => {
      let imgData = JSON.parse(r.data)
      console.log(imgData)
      avatar.value = imgData.data.fullurl
    },
  })
}

const getUserInfo = async () => {
  if (avatar.value == '') {
    uni.showToast({
      title: '请选择头像',
      icon: 'none',
    })
    return
  }
  // 坑，，，点击昵称后，开发者工具上 一直提示 昵称是空，但是 真机上 是正常的
  if (nickname.value == '') {
    uni.showToast({
      title: '请编辑用户昵称或昵称不能使用特殊字符',
      icon: 'none',
    })
    return
  }
  const rawData = {
    language: 'zh_CN',
    nickName: nickname.value,
    avatarUrl: avatar.value,
  }
  console.log('rawData', rawData)
  emits('update:modelValue', false)
  //   that.wxlogin()
}
</script>

<style scoped lang="scss">
.getnickbox {
  padding: 40rpx 20rpx;
  .logoimg {
    width: 50rpx;
    height: 50rpx;
  }
  .name {
    margin-left: 20rpx;
    text {
      margin-left: 10rpx;
    }
  }
  .m1 {
    font-weight: 500;
  }
  .m2 {
    padding-bottom: 30rpx;
    border-bottom: 1rpx solid #f2f2f2;
    color: #999;
    padding-top: 10rpx;
    font-size: 24rpx;
  }
  .xin1 {
    border-bottom: 1rpx solid #f2f2f2;
    margin-bottom: 30rpx;
    .toubox {
      padding: 10rpx 0;
      display: flex;
      align-items: center;
      .t1 {
        font-size: 28rpx;
        margin-right: 30rpx;
      }
      .avatarbox {
        width: 100rpx;
        height: 100rpx;
        border-radius: 20rpx;
      }
      .avatarimg {
        width: 100rpx;
        height: 100rpx;
        border-radius: 20rpx;
      }
    }
  }
  .buttoncss {
    background-color: #fff;
    border-radius: 0px;
    border: 0rpx solid transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  button::after {
    border: 0px solid rgba(0, 0, 0, 0.2);
  }
  .nick {
    padding-bottom: 30rpx;
    border-bottom: 2rpx solid #f2f2f2;
    display: flex;
    align-items: center;
    padding-left: 14px;
    padding-right: 14px;
    .n1 {
      font-size: 28rpx;
      margin-right: 30rpx;
    }
  }
  .wan {
    position: relative;
    height: 100rpx;
    box-shadow: 0rpx 0rpx 0rpx 0rpx;
    margin-top: 30rpx;
  }

  .mt30 {
    margin-top: 30rpx;
  }
}
.flex_align_center {
  display: flex;
  align-items: center;
}
</style>
