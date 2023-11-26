<template>
  <view class="upload">
    <uni-file-picker
      ref="imagesRef"
      v-model="imageValue"
      :imageStyles="imageStyles"
      file-mediatype="image"
      @progress="progress"
      @success="success"
      @fail="fail"
      limit="1"
      :auto-upload="true"
      @select="selectImg($event)"
      @delete="delImg($event)"
    >
    </uni-file-picker>
    <!-- <button @click="upload">上传文件</button> -->
  </view>
</template>

<script setup lang="ts">
import type { ALOS } from '@/types/alos'
import { baseUploadUrl } from '@/utils/setting'
import { onMounted, ref, watch } from 'vue'
const imageValue = ref()
const imagesRef = ref()
const props = defineProps(['productName', 'isSuccess'])
const emits = defineEmits(['uploadPicture', 'tmpImgPath'])
const ALOSCONF = ref<ALOS>()
watch(
  props,
  () => {
    if (props.isSuccess) {
      console.log('删除缓存')
      imagesRef.value.clearFiles(0)
    }
  },
  {
    immediate: true,
    deep: true,
  },
)
const upload = async () => {
  const imgUrl = fileInfo.value.imgUrl
  const key = `poultry-image/${props.productName}.${fileInfo.value.imgType}`
  uni.showLoading({ title: '正在上传图片中...' })
  console.log('alcon', ALOSCONF.value)
  uni.uploadFile({
    url: fileInfo.value.ossUrl,
    filePath: imgUrl,

    name: 'file',

    header: { 'Content-Type': 'image/png' },
    formData: {
      name: props.productName ?? '',
      key: key,
      policy: ALOSCONF.value!.policy,
      OSSAccessKeyId: ALOSCONF.value!.OSSAccessKeyId,
      success_action_status: '200',
      signature: ALOSCONF.value!.signature,
    },
    success: (res: any) => {
      if (res.statusCode == '200') {
        const imgUrl = fileInfo.value.ossUrl + '/' + key
        console.log('最终的路径', imgUrl)

        emits('uploadPicture', { imgUrl })
      } else {
        console.log(res)
      }
    },
    complete: () => {
      uni.hideLoading()
    },
  })
}

onMounted(async () => {
  console.log('mounted')
})
const fileInfo = ref({
  imgUrl: '',
  key: '',
  ossUrl: baseUploadUrl,
  imgType: '',
})
const selectImg = async (e: any) => {
  console.log('e', e)
  const tempFilePaths = e.tempFilePaths
  const imgUrl = tempFilePaths[0]
  if (!imgUrl.includes('.png')) {
    uni.showToast({
      title: '图片格式不正确',
      icon: 'error',
      duration: 1500,
      mask: false,
    })
    return
  }
  fileInfo.value.imgUrl = imgUrl
  fileInfo.value.imgType = imgUrl.split('.').pop()
  emits('tmpImgPath', { imgUrl })
  uni.showToast({
    title: '选择图片成功...',
    icon: 'success',
    mask: true,
  })
}

const delImg = (e: any) => {
  console.log('e', e)
  emits('tmpImgPath', { imgUrl: '' })
}

const progress = (e: any) => {
  console.log('上传进度：', e)
}

const success = (e: any) => {
  console.log('上传成功')
}

const fail = (e: any) => {
  console.log('上传失败：', e)
}
const imageStyles = {
  width: 64,
  height: 64,
  border: {
    radius: '10%',
  },
}
const listStyles = {
  border: true,

  dividline: true,

  borderStyle: {
    width: 1,
    color: 'blue',
    style: 'dashed',
    radius: 2,
  },
}
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  align-items: center;
}
</style>
