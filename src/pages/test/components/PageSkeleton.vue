<!--
此文件为开发者工具生成，生成时间: 2023/9/15上午12:20:02
使用方法：
在 /Users/cherish/Documents/vscode/家禽预定管理系统/uniapp-shop-vue3-ts/dist/dev/mp-weixin/pages/test/test.wxml 引入模板

```
<import src="test.skeleton.wxml"/>
<template is="skeleton" wx:if="{{loading}}" />
```

在 /Users/cherish/Documents/vscode/家禽预定管理系统/uniapp-shop-vue3-ts/dist/dev/mp-weixin/pages/test/test.wxss 中引入样式
```
@import "./test.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->
<template name="skeleton">
  <view class="sk-container">
    <view class="viewport data-v-1950f93b">
      <scroll-view scroll-y="true" class="scroll_view data-v-1950f93b" enable-back-to-top="true">
        <view class="filter_action data-v-1950f93b">
          <view
            is="node-modules/@dcloudio/uni-ui/lib/uni-section/uni-section"
            class="data-v-1950f93b"
          >
            <view class="uni-section section--uni-section">
              <view class="uni-section-header section--uni-section-header">
                <view
                  class="uni-section-header__decoration section--uni-section-header__decoration line section--line"
                ></view>
                <view class="uni-section-header__content section--uni-section-header__content">
                  <text
                    class="uni-section__content-title section--uni-section__content-title distraction section--distraction sk-transparent sk-text-14-2857-483 sk-text"
                    style="font-size: 14px; color: #333"
                    >选择对应的时间</text
                  >
                </view>
                <view
                  class="uni-section-header__slot-right section--uni-section-header__slot-right"
                ></view>
              </view>
              <view
                class="uni-section-content section--uni-section-content"
                style="padding: "
              ></view>
            </view>
          </view>
          <view class="uni-date datetime-picker--uni-date">
            <view class="uni-date-editor datetime-picker--uni-date-editor">
              <view class="uni-date-editor--x datetime-picker--uni-date-editor--x">
                <view
                  class="uni-date-x datetime-picker--uni-date-x uni-date-single datetime-picker--uni-date-single"
                >
                  <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
                    <text
                      class="uni-icons icons--uni-icons uniui-calendar icons--uniui-calendar sk-pseudo sk-pseudo-circle"
                      style="color: #c0c4cc; font-size: 22px"
                    ></text>
                  </view>
                  <view
                    class="uni-date__x-input datetime-picker--uni-date__x-input sk-image"
                    disabled="true"
                    placeholder="选择日期"
                    type="text"
                    value="true"
                  ></view>
                </view>
              </view>
            </view>
            <view
              is="node-modules/@dcloudio/uni-ui/lib/uni-datetime-picker/calendar"
              class="r datetime-picker--r"
              data-c-h="false"
            >
              <view class="uni-calendar calendar--uni-calendar"></view>
            </view>
          </view>
          <view class="data-v-1950f93b">
            <view
              is="node-modules/@dcloudio/uni-ui/lib/uni-section/uni-section"
              class="data-v-1950f93b"
            >
              <view class="uni-section section--uni-section">
                <view class="uni-section-header section--uni-section-header">
                  <view
                    class="uni-section-header__decoration section--uni-section-header__decoration line section--line"
                  ></view>
                  <view class="uni-section-header__content section--uni-section-header__content">
                    <text
                      class="uni-section__content-title section--uni-section__content-title distraction section--distraction sk-transparent sk-text-14-2857-189 sk-text"
                      style="font-size: 14px; color: #333"
                      >选择客户姓名</text
                    >
                  </view>
                  <view
                    class="uni-section-header__slot-right section--uni-section-header__slot-right"
                  ></view>
                </view>
                <view
                  class="uni-section-content section--uni-section-content"
                  style="padding: "
                ></view>
              </view>
            </view>
            <view
              is="node-modules/@dcloudio/uni-ui/lib/uni-data-select/uni-data-select"
              class="data-v-1950f93b"
            >
              <view class="uni-stat__select select--uni-stat__select">
                <view class="uni-stat-box select--uni-stat-box">
                  <view class="uni-select select--uni-select">
                    <view class="uni-select__input-box select--uni-select__input-box">
                      <view
                        class="uni-select__input-text select--uni-select__input-text uni-select__input-placeholder select--uni-select__input-placeholder sk-transparent sk-text-14-2857-752 sk-text"
                        >请选择</view
                      >
                      <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
                        <text
                          class="uni-icons icons--uni-icons uniui-bottom icons--uniui-bottom sk-pseudo sk-pseudo-circle"
                          style="color: #999; font-size: 14px"
                        ></text>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="order_wrap data-v-1950f93b">
          <view
            is="node-modules/@dcloudio/uni-ui/lib/uni-section/uni-section"
            class="mycard data-v-1950f93b"
          >
            <view class="uni-section section--uni-section">
              <view class="uni-section-header section--uni-section-header">
                <view
                  class="uni-section-header__decoration section--uni-section-header__decoration circle section--circle"
                ></view>
                <view class="uni-section-header__content section--uni-section-header__content">
                  <text
                    class="uni-section__content-title section--uni-section__content-title distraction section--distraction sk-transparent sk-text-14-2857-625 sk-text"
                    style="font-size: 20; color: #000"
                    >1991-06-08订货汇总</text
                  >
                </view>
                <view
                  class="uni-section-header__slot-right section--uni-section-header__slot-right"
                ></view>
              </view>
              <view class="uni-section-content section--uni-section-content" style="padding: ">
                <view
                  is="node-modules/@dcloudio/uni-ui/lib/uni-group/uni-group"
                  class="data-v-1950f93b"
                >
                  <view
                    class="uni-group group--uni-group uni-group--card group--uni-group--card"
                    style="margin-top: 10px"
                  >
                    <view
                      class="uni-group__title group--uni-group__title"
                      style="padding-left: 15px"
                    >
                      <text
                        class="uni-group__title-text group--uni-group__title-text sk-transparent sk-text-14-2857-636 sk-text"
                        >客户姓名: 侯娜</text
                      >
                    </view>
                    <view class="uni-group__content group--uni-group__content">
                      <view class="group data-v-1950f93b">
                        <view class="content data-v-1950f93b">
                          <view class="detail data-v-1950f93b">
                            <view
                              class="index data-v-1950f93b sk-transparent sk-text-14-2857-56 sk-text"
                              style="background-position-x: 50%"
                              >1 .</view
                            >
                            <view
                              class="name data-v-1950f93b sk-transparent sk-text-14-2857-292 sk-text"
                              >老鸽 87 只</view
                            >
                            <view
                              class="base_price data-v-1950f93b sk-transparent sk-text-14-2857-737 sk-text"
                              >78 元/斤</view
                            >
                            <view
                              class="spec data-v-1950f93b sk-transparent sk-text-14-2857-920 sk-text"
                              >规格 中</view
                            >
                          </view>
                        </view>
                        <view class="content data-v-1950f93b">
                          <view class="detail data-v-1950f93b">
                            <view
                              class="index data-v-1950f93b sk-transparent sk-text-14-2857-691 sk-text"
                              style="background-position-x: 50%"
                              >2 .</view
                            >
                            <view
                              class="name data-v-1950f93b sk-transparent sk-text-14-2857-472 sk-text"
                              >鸽子 64 只</view
                            >
                            <view
                              class="base_price data-v-1950f93b sk-transparent sk-text-14-2857-323 sk-text"
                              >70 元/斤</view
                            >
                            <view
                              class="spec data-v-1950f93b sk-transparent sk-text-14-2857-29 sk-text"
                              >规格 小</view
                            >
                          </view>
                        </view>
                        <view class="content data-v-1950f93b">
                          <view class="detail data-v-1950f93b">
                            <view
                              class="index data-v-1950f93b sk-transparent sk-text-14-2857-628 sk-text"
                              style="background-position-x: 50%"
                              >3 .</view
                            >
                            <view
                              class="name data-v-1950f93b sk-transparent sk-text-14-2857-980 sk-text"
                              >鸽子 67 只</view
                            >
                            <view
                              class="base_price data-v-1950f93b sk-transparent sk-text-14-2857-955 sk-text"
                              >87 元/斤</view
                            >
                            <view
                              class="spec data-v-1950f93b sk-transparent sk-text-14-2857-434 sk-text"
                              >规格 中</view
                            >
                          </view>
                        </view>
                        <view class="content data-v-1950f93b">
                          <view class="detail data-v-1950f93b">
                            <view
                              class="index data-v-1950f93b sk-transparent sk-text-14-2857-840 sk-text"
                              style="background-position-x: 50%"
                              >4 .</view
                            >
                            <view
                              class="name data-v-1950f93b sk-transparent sk-text-14-2857-844 sk-text"
                              >鸽子 72 只</view
                            >
                            <view
                              class="base_price data-v-1950f93b sk-transparent sk-text-14-2857-260 sk-text"
                              >89 元/斤</view
                            >
                            <view
                              class="spec data-v-1950f93b sk-transparent sk-text-14-2857-743 sk-text"
                              >规格 中</view
                            >
                          </view>
                        </view>
                        <view class="content data-v-1950f93b">
                          <view class="detail data-v-1950f93b last-detail">
                            <view
                              class="index data-v-1950f93b sk-transparent sk-text-14-2857-963 sk-text"
                              style="background-position-x: 50%"
                              >5 .</view
                            >
                            <view
                              class="name data-v-1950f93b sk-transparent sk-text-14-2857-668 sk-text"
                              >乳鸽 10 只</view
                            >
                            <view
                              class="base_price data-v-1950f93b sk-transparent sk-text-14-2857-305 sk-text"
                              >99 元/斤</view
                            >
                            <view
                              class="spec data-v-1950f93b sk-transparent sk-text-14-2857-63 sk-text"
                              >规格 小</view
                            >
                          </view>
                        </view>
                        <view class="footer data-v-1950f93b">
                          <view
                            class="button delete-button data-v-1950f93b sk-transparent sk-text-8-3333-121 sk-text"
                            >删除</view
                          >
                          <view
                            class="button primary data-v-1950f93b sk-transparent sk-text-8-3333-549 sk-text"
                            >编辑</view
                          >
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view
            is="node-modules/@dcloudio/uni-ui/lib/uni-section/uni-section"
            class="mycard data-v-1950f93b"
          >
            <view class="uni-section section--uni-section">
              <view class="uni-section-header section--uni-section-header">
                <view
                  class="uni-section-header__decoration section--uni-section-header__decoration circle section--circle"
                ></view>
                <view class="uni-section-header__content section--uni-section-header__content">
                  <text
                    class="uni-section__content-title section--uni-section__content-title distraction section--distraction sk-transparent sk-text-14-2857-745 sk-text"
                    style="font-size: 20; color: #000"
                    >2021-07-30订货汇总</text
                  >
                </view>
                <view
                  class="uni-section-header__slot-right section--uni-section-header__slot-right"
                ></view>
              </view>
              <view class="uni-section-content section--uni-section-content" style="padding: ">
                <view
                  is="node-modules/@dcloudio/uni-ui/lib/uni-group/uni-group"
                  class="data-v-1950f93b"
                >
                  <view
                    class="uni-group group--uni-group uni-group--card group--uni-group--card"
                    style="margin-top: 10px"
                  >
                    <view
                      class="uni-group__title group--uni-group__title"
                      style="padding-left: 15px"
                    >
                      <text
                        class="uni-group__title-text group--uni-group__title-text sk-transparent sk-text-14-2857-123 sk-text"
                        >客户姓名: 崔芳</text
                      >
                    </view>
                    <view class="uni-group__content group--uni-group__content">
                      <view class="group data-v-1950f93b">
                        <view class="content data-v-1950f93b">
                          <view class="detail data-v-1950f93b">
                            <view
                              class="index data-v-1950f93b sk-transparent sk-text-14-2857-402 sk-text"
                              style="background-position-x: 50%"
                              >1 .</view
                            >
                            <view
                              class="name data-v-1950f93b sk-transparent sk-text-14-2857-911 sk-text"
                              >水鸭 78 只</view
                            >
                            <view
                              class="base_price data-v-1950f93b sk-transparent sk-text-14-2857-618 sk-text"
                              >29 元/斤</view
                            >
                            <view
                              class="spec data-v-1950f93b sk-transparent sk-text-14-2857-943 sk-text"
                              >规格 小</view
                            >
                          </view>
                        </view>
                        <view class="content data-v-1950f93b">
                          <view class="detail data-v-1950f93b">
                            <view
                              class="index data-v-1950f93b sk-transparent sk-text-14-2857-566 sk-text"
                              style="background-position-x: 50%"
                              >2 .</view
                            >
                            <view
                              class="name data-v-1950f93b sk-transparent sk-text-14-2857-345 sk-text"
                              >白母鸭 48 只</view
                            >
                            <view
                              class="base_price data-v-1950f93b sk-transparent sk-text-14-2857-735 sk-text"
                              >11 元/斤</view
                            >
                            <view
                              class="spec data-v-1950f93b sk-transparent sk-text-14-2857-337 sk-text"
                              >规格 中</view
                            >
                          </view>
                        </view>
                        <view class="content data-v-1950f93b">
                          <view class="detail data-v-1950f93b last-detail">
                            <view
                              class="index data-v-1950f93b sk-transparent sk-text-14-2857-40 sk-text"
                              style="background-position-x: 50%"
                              >3 .</view
                            >
                            <view
                              class="name data-v-1950f93b sk-transparent sk-text-14-2857-571 sk-text"
                              >白母鸭 28 只</view
                            >
                            <view
                              class="base_price data-v-1950f93b sk-transparent sk-text-14-2857-92 sk-text"
                              >68 元/斤</view
                            >
                            <view
                              class="spec data-v-1950f93b sk-transparent sk-text-14-2857-542 sk-text"
                              >规格 大</view
                            >
                          </view>
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<style lang="scss">
/*
此文件为开发者工具生成，生成时间: 2023/9/15上午12:20:02

在 /Users/cherish/Documents/vscode/家禽预定管理系统/uniapp-shop-vue3-ts/dist/dev/mp-weixin/pages/test/test.wxss 中引入样式
```
@import "./test.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
.sk-transparent {
  color: transparent !important;
}
.sk-text-14-2857-483 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 37.6923rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-189 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 37.6923rpx;
  position: relative !important;
}
.sk-text-14-2857-752 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.3077rpx;
  position: relative !important;
}
.sk-text-14-2857-625 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.0769rpx;
  position: relative !important;
}
.sk-text-14-2857-636 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 37.6923rpx;
  position: relative !important;
}
.sk-text-14-2857-56 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-292 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-737 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-920 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-691 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-472 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-323 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-29 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-628 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-980 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-955 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-434 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-840 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-844 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-260 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-743 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-963 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-668 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-305 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-63 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-8-3333-121 {
  background-image: linear-gradient(
    transparent 8.3333%,
    #eeeeee 0%,
    #eeeeee 91.6667%,
    transparent 0%
  ) !important;
  background-size: 100% 30rpx;
  position: relative !important;
}
.sk-text-8-3333-549 {
  background-image: linear-gradient(
    transparent 8.3333%,
    #eeeeee 0%,
    #eeeeee 91.6667%,
    transparent 0%
  ) !important;
  background-size: 100% 30rpx;
  position: relative !important;
}
.sk-text-14-2857-745 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.0769rpx;
  position: relative !important;
}
.sk-text-14-2857-123 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 37.6923rpx;
  position: relative !important;
}
.sk-text-14-2857-402 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-911 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-618 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-943 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-566 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-345 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-735 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-337 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-40 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-571 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-92 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}
.sk-text-14-2857-542 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
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
.sk-image {
  background: #efefef !important;
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
