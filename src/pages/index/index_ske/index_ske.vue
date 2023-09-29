<template name="skeleton">
  <view class="sk-container">
    <view class="viewport data-v-6f3cd88d">
      <scroll-view
        :enable-back-to-top="true"
        :refresher-enabled="true"
        :scroll-y="true"
        class="scroll-view data-v-6f3cd88d"
      >
        <view is="components/XtxSwiper" class="data-v-6f3cd88d">
          <view class="carousel XtxSwiper--carousel">
            <swiper :circular="true" :interval="3000" :current="0" :autoplay="true">
              <swiper-item
                style="
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  transform: translate(0%, 0px) translateZ(0px);
                "
              >
                <navigator class="navigator XtxSwiper--navigator" hover-class="none">
                  <image class="image XtxSwiper--image sk-image" mode="aspectFill"></image>
                </navigator>
              </swiper-item>
            </swiper>
            <view class="indicator XtxSwiper--indicator">
              <text class="dot XtxSwiper--dot active XtxSwiper--active"></text>
              <text class="dot XtxSwiper--dot"></text>
              <text class="dot XtxSwiper--dot"></text>
            </view>
          </view>
        </view>
        <view is="pages/index/components/HotPanel" class="data-v-6f3cd88d">
          <view class="panel HotPanel--panel hot HotPanel--hot">
            <view class="item HotPanel--item">
              <view class="title HotPanel--title">
                <text
                  class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-136 sk-text"
                  >鸡类</text
                >
                <text
                  class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-383 sk-text"
                  >好吃</text
                >
              </view>
              <navigator class="cards HotPanel--cards" hover-class="none">
                <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
              </navigator>
            </view>
            <view class="item HotPanel--item">
              <view class="title HotPanel--title">
                <text
                  class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-862 sk-text"
                  >鸭类</text
                >
                <text
                  class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-477 sk-text"
                  >也好吃</text
                >
              </view>
              <navigator class="cards HotPanel--cards" hover-class="none">
                <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
              </navigator>
            </view>
          </view>
        </view>
        <view is="components/XtxGuess" class="r data-v-6f3cd88d">
          <view class="caption XtxGuess--caption">
            <text
              class="text XtxGuess--text sk-transparent sk-text-0-0000-556 sk-text sk-pseudo sk-pseudo-circle"
              style="font-size: 18px"
              >猜你喜欢</text
            >
          </view>
          <view class="guess XtxGuess--guess">
            <view class="guess-item XtxGuess--guess-item">
              <image class="image XtxGuess--image sk-image" mode="aspectFill"></image>
              <view class="name XtxGuess--name sk-transparent sk-text-0-0000-935 sk-text">231</view>
              <view class="price XtxGuess--price">
                <text class="sk-transparent sk-text-0-0000-297 sk-text">77.00元/斤</text>
                <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
                  <text
                    class="uni-icons icons--uni-icons uniui-plus-filled icons--uniui-plus-filled sk-pseudo sk-pseudo-circle"
                    style="color: #276d33; font-size: 32px"
                  ></text>
                </view>
              </view>
            </view>
            <view class="guess-item XtxGuess--guess-item">
              <image class="image XtxGuess--image sk-image" mode="aspectFill"></image>
              <view class="name XtxGuess--name sk-transparent sk-text-0-0000-1000 sk-text"
                >测试24</view
              >
              <view class="price XtxGuess--price">
                <text class="sk-transparent sk-text-0-0000-706 sk-text">76.00元/斤</text>
                <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
                  <text
                    class="uni-icons icons--uni-icons uniui-plus-filled icons--uniui-plus-filled sk-pseudo sk-pseudo-circle"
                    style="color: #276d33; font-size: 32px"
                  ></text>
                </view>
              </view>
            </view>
            <view class="guess-item XtxGuess--guess-item"></view>
            <view class="guess-item XtxGuess--guess-item"></view>
          </view>
        </view>
      </scroll-view>
      <navigator class="shop_cart data-v-6f3cd88d" hover-class="none" open-type="navigate">
        <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons" class="data-v-6f3cd88d">
          <text
            class="uni-icons icons--uni-icons uniui-cart icons--uniui-cart sk-pseudo sk-pseudo-circle"
            style="color: #276d33; font-size: 45px"
          ></text>
        </view>
      </navigator>
    </view>
  </view>
</template>

<style lang="scss" scoped>
/*
此文件为开发者工具生成，生成时间: 2023/9/29上午9:17:13

在 /Users/cherish/Documents/vscode/家禽预定管理系统/uniapp-shop-vue3-ts/dist/build/mp-weixin/pages/index/index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
.sk-transparent {
  color: transparent !important;
}
.sk-text-14-2857-136 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 53.8462rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-383 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-862 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 53.8462rpx;
  position: relative !important;
}
.sk-text-14-2857-477 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-0-0000-556 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 34.6154rpx;
  position: relative !important;
}
.sk-text-0-0000-935 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 38.4615rpx;
  position: relative !important;
}
.sk-text-0-0000-297 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 38.4615rpx;
  position: relative !important;
}
.sk-text-0-0000-1000 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 38.4615rpx;
  position: relative !important;
}
.sk-text-0-0000-706 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 38.4615rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
