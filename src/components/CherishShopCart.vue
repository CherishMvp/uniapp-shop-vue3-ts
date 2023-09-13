<template>
  <div>
    <div class="wrapper" :class="{ showCart: !isToshow, hideCart: isToshow }">
      <div class="content" v-if="!isToshow" @click="goCartPage">
        <uni-icons type="cart" :color="$uni_xtx_color" size="45" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const $uni_xtx_color = '#27ba9b'
const isToshow = ref(false)

const goCartPage = () => {
  uni.switchTab({ url: '/pages/cart/cart' })
}

uni.$on('showCart', (data) => {
  isToshow.value = data.show
})
</script>

<style scoped lang="scss">
.wrapper {
  padding: 3px;
  .content {
    position: absolute;
    left: 5vw;
    bottom: 15vh;
    z-index: 999;
  }
}
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.showCart {
  animation-name: fadeInLeft;
}

@keyframes fadeOutLeft {
  from {
    margin-left: 20px;
  }

  to {
    margin-left: -150vw;
    display: none;
  }
}

.hideCart {
  animation-name: 0.5 fadeOutLeft;
}
</style>
