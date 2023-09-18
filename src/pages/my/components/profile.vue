<script setup lang="ts">
import { getMemberProfileAPI, putMemberProfileAPI } from '@/services/profile'
import { useMemberStore } from '@/stores'
import type { Gender, ProfileDetail } from '@/types/member'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 获取屏幕边界到安全区域距离

// 获取个人信息，修改个人信息需提供初始值
const profile = ref()
const getMemberProfileData = async () => {
  // const res = await getMemberProfileAPI()
  // profile.value = res.result
  profile.value = memberStore.profile
}

onLoad(() => {
  // getMemberProfileData()
  console.log(' memberStore.profile', memberStore.profile)
  profile.value = memberStore.profile
  console.log('profile', profile.value)
})

const memberStore = useMemberStore()

// 登陆逻辑
const onLogin = () => {
  console.log('处理简单的登陆逻辑')
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
        uni.navigateBack()
      }
    },
  })
}

// 点击保存提交表单
const onSubmit = async () => {
  const { nickname, gender, birthday } = profile.value
  const res = await putMemberProfileAPI({
    nickname,
  })
  // 更新Store昵称
  memberStore.profile!.nickname = res.result.nickname
  uni.showToast({ icon: 'success', title: '保存成功' })
  setTimeout(() => {
    uni.navigateBack()
  }, 400)
}
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <!-- 表单 -->
    <view class="form" v-if="memberStore.profile">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">昵称</text>
          <text class="input" type="text" placeholder="请填写昵称">{{ profile?.nickname }}</text>
        </view>
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account placeholder">{{ profile?.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">权限</text>
          <text class="account placeholder">{{ profile?.role ?? '未知' }}</text>
        </view>
        <view class="form-item">
          <text class="label">手机号码</text>
          <text class="account placeholder">{{ profile?.account }}</text>
        </view>
        <hr />
      </view>
      <!-- 提交按钮 -->
      <button @tap="onLogout" class="form-button">退出登陆</button>
    </view>
    <view v-else>
      <div class="form">
        <navigator @tap="onLogin" url="/pages/login/login" hover-class="none">
          <button class="form-button">立即登陆</button>
        </navigator>
      </div>
    </view>
  </view>
</template>

<style lang="scss">
.form {
  background-color: #ffffff !important;
  width: 80vw;
  border-radius: 80rpx;
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
}
/* 操作按钮 */
.action {
  text-align: center;
  line-height: 90rpx;
  margin-top: 40rpx;
  font-size: 32rpx;
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
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
