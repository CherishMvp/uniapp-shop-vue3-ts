<script setup lang="ts">
import { postLoginWxMinAPI, postPhoneNumberAPI } from '@/services/login'
import { getUserProfileAPI, putUserProfileAPI } from '@/services/profile'
import { useMemberStore } from '@/stores'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { onMounted, ref } from 'vue'
import type { PolutryLoginResult } from '@/types/member'
import { roleMap } from '@/types/enum'
import getUserPoup from '@/components/login/getUserPoup.vue'
// 获取屏幕边界到安全区域距离

// 获取个人信息，修改个人信息需提供初始值
const profile = ref()
const props = defineProps(['isUpdate'])
const showPopup = ref(false)
const isLoginPopupVisible = ref(false)
const submit = (e: any) => {
  console.log('e', e)
}
const memberStore = useMemberStore()

/**
 * 拿到最新的用户信息，同时写入token
 **/
const getCurrentUserInfo = async () => {
  uni.showLoading({
    title: '加载中',
    mask: false,
  })
  // 获取最新的用户信息
  const res = await wx.login()
  code = res.code

  const userInfo = await postLoginWxMinAPI({ code })
  console.log('userInfo', userInfo)
  const memberStore = useMemberStore()
  memberStore.setProfile(userInfo.result)
  console.log('profile.value', profile.value)
  console.log('memberStore.profile', memberStore.profile)
  profile.value = memberStore.profile
  uni.hideLoading()
  // check userName whether is default
  if (userInfo.result.userName == '微信用户') await checkUserInfo()
}
const checkUserInfo = async () => {
  console.log('sb')
  await onSubmit()
}
const mycode = ref()
const getUserInfo1 = async () => {
  const res = await wx.login()
  mycode.value = res.code
  console.log('拿到code', mycode.value)
}
const getUserInfo = async () => {
  console.log('执行获取')
  true &&
    uni.getUserProfile({
      desc: 'xx',
      success(result) {
        console.log('result', result)
        const { encryptedData, iv, rawData } = result
        console.log('拿到准备解密的参数', rawData, 'iv', iv, 'enc', encryptedData)
        const res = getUserProfileAPI({
          code: mycode.value,
          encryptedData,
          iv,
          rawData,
        })
        console.log('resss', res)
      },
    })
}
onShow(async () => {
  console.log('能用吗')
  await getCurrentUserInfo()
})
// 登陆逻辑,直接在当前页面处理就行
//
// #ifdef MP-WEIXIN
// 获取 code 登录凭证
let code = ''
onLoad(async () => {
  console.log('onshow处理逻辑就行')
  // const res = await wx.login()
  // code = res.code
  // await onGetUserInfo(code)
})
onMounted(() => {})
// 先判断有没有存储过的用户信息，后面再决定传参注册
const onGetUserInfo = async (code: string) => {
  console.log('拿到请求openid的code', code)
  const res = await postLoginWxMinAPI({ code })
  console.log('res', res)
  if (!res.result.token) {
    uni.showModal({
      title: '提示',
      content: '是否登陆',
      confirmColor: '#242',
      success: ({ confirm, cancel }) => {
        if (confirm) {
          console.log('confirm', confirm)
          // isLoginPopupVisible.value = true
        }
      },
    })
    return
  }
  loginSuccess(res.result) //如果有openid返回，则保存信息
  console.log('拿到token相关信息22', res)
}
const loginSuccess = (profile: PolutryLoginResult) => {
  // 保存会员信息
  const memberStore = useMemberStore()
  // TODO 设为admin用户
  //profile.role = 'operator'
  memberStore.setProfile(profile)
  // 成功提示
  // uni.showToast({ icon: 'success', title: '登录成功' })
  setTimeout(() => {
    // 页面跳转
    getCurrentUserInfo()
    console.log('登录成功 不必跳转;更新当前用户信息')
    // uni.switchTab({ url: '/pages/my/my' })
    // uni.navigateBack()
  }, 500)
}

// #endif

// 计算手机号码格式
function maskPhoneNumber(phoneNumber: string) {
  return phoneNumber?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') ?? '未知'
}

const onLogin = async () => {
  await onGetUserInfo(code)
  console.log('准备跳转到登录页面登陆')
}
// 退出登录
const onLogout = () => {
  // 模态弹窗
  uni.showModal({
    content: '是否退出登录？',
    confirmColor: '#27BA9B',
    success: (res) => {
      if (res.confirm) {
        // 清理用户信息
        memberStore.clearProfile()
        // 返回上一页
        // uni.navigateBack()
      }
    },
  })
}

const updateUserInfo = async (userName: any) => {
  const newUserInfo = { userName: userName, openId: memberStore.profile?.openId }
  const res: any = await putUserProfileAPI({
    ...newUserInfo,
  })
  // 更新Store昵称
  uni.showLoading({
    title: '加载中',
    mask: true,
  })
  console.log('res', res.result)
  if (!res.result) {
    uni.showToast({
      title: '不能重复修改用户名',
      icon: 'error',
      duration: 1000,
      mask: false,
    })
    return
  }
  setTimeout(() => {
    console.log('res.result.userName', res.result.userName)
    memberStore.profile!.userName = res.result.userName
    uni.hideLoading()
    uni.showToast({
      title: '修改成功',
      icon: 'success',
      duration: 500,
      mask: true,
    })
  }, 1000)
}

// 点击保存提交表单
const onSubmit = async () => {
  uni.showModal({
    title: '为了更好的用户体验，输入您的姓名',
    editable: true,
    showCancel: true,
    placeholderText: '请输入你的名字',
    success: ({ confirm, cancel, content }) => {
      console.log('confirm', confirm)
      if (confirm) {
        console.log('得到新的用户名', content)
        updateUserInfo(content)
        return
      }
      if (cancel) {
        console.log('取消修改用户名', cancel)
        return
      }
    },
  })
}
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <!-- 表单 -->
    <!-- 旧版本获取用户信息 -->
    <div class="mock_userinfo" v-if="false">
      <text>模拟获取用户信息</text>
      <button type="primary" color="#bfa" @click="getUserInfo1">重新拿code</button>

      <button type="primary" color="#bfa" @click="getUserInfo">获取用户信息</button>
      <!-- <get-user-poup v-model="showPopup" /> -->
    </div>

    <text class="header">用户信息</text>

    <view class="form" v-if="memberStore.profile?.token">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">用户名</text>
          <text class="input placeholder" type="text" placeholder="请填写昵称"
            >{{ profile?.userName }}
          </text>
        </view>
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account placeholder">{{ profile?.openId?.slice(0, 8) }}</text>
        </view>
        <view class="form-item">
          <text class="label">权限</text>
          <text class="account placeholder">{{ roleMap.get(profile?.role) ?? '未知' }}</text>
        </view>
        <view class="form-item">
          <text class="label">手机号码</text>
          <text class="account placeholder" style="color: rgb(97, 195, 162)">{{
            maskPhoneNumber(profile?.phoneNumber)
          }}</text>
        </view>
        <hr />
      </view>
      <!-- 提交按钮 -->
      <div class="footer">
        <button @tap="onLogout" class="form-button">退出登陆</button>
        <button @tap="onSubmit" class="form-button">修改用户名</button>
        <navigator v-if="false" url="/pages/login/login" class="form-navigator">老登陆</navigator>
      </div>
    </view>
    <view v-else>
      <!-- 未点击录入信息 -->
      <div class="form">
        <navigator url="/pages/login/login" hover-class="none">
          <button class="form-button">立即登陆</button>
        </navigator>
      </div>
      <edit-info :isVisible.sync="isLoginPopupVisible" @submit="submit" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.mock_userinfo {
  display: flex;
  flex-direction: column;
}
.form {
  background-color: #ffffff !important;
  width: 80vw;
  border-radius: 80rpx;
  .form-item {
    font-size: 20px;
    .input {
      width: 200rpx;
      overflow: hidden;
    }
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    .form-button {
      // width: 190rpx;
    }
    .form-button:first-child {
      background: burlywood !important;
    }
  }
}
page {
  background-color: #faf8f8;
}
.login_button {
  padding: 1;
}
.viewport {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .header {
    font-size: 45rpx;
    letter-spacing: 5rpx;
    text-align: center;
    line-height: 1;
    margin: 55rpx;
    font-weight: 600;
  }
}
/* 操作按钮 */
.action {
  text-align: center;
  line-height: 90rpx;
  margin-top: 40rpx;
  font-size: 35rpx;
  color: #333;
  .button {
    background-color: #fff;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 35rpx;
    min-width: 235rpx;
    background-color: #27ba9b;
  }
}
</style>
