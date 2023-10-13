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
// import { getPostObjectParamsAPI } from '@/services/goods'
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
  //获取图片临时路径
  const imgUrl = fileInfo.value.imgUrl
  const key = `poultry-image/${props.productName}.${fileInfo.value.imgType}`
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
      name: props.productName ?? '',
      key: key,
      policy: ALOSCONF.value!.policy, // 输入你获取的的policy
      OSSAccessKeyId: ALOSCONF.value!.OSSAccessKeyId, // 输入你的AccessKeyId
      success_action_status: '200', // 让服务端返回200,不然，默认会返回204
      signature: ALOSCONF.value!.signature, // 输入你获取的的signature
    },
    success: (res: any) => {
      if (res.statusCode == '200') {
        const imgUrl = fileInfo.value.ossUrl + '/' + key
        console.log('最终的路径', imgUrl)
        // 将图片路径返回给父级，写入数据库
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
/**
 * 获取上传参数
 **/
// const getUploadConfig = async () => {
//   ALOSCONF.value = (await getPostObjectParamsAPI()).result
//   console.log(' ALOSCONF.value', ALOSCONF.value)
// }
onMounted(async () => {
  console.log('mounted')
  // await getUploadConfig()
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
// 获取上传进度
const progress = (e: any) => {
  console.log('上传进度：', e)
}

// 上传成功
const success = (e: any) => {
  console.log('上传成功')
}

// 上传失败
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
  // 是否显示边框
  border: true,
  // 是否显示分隔线
  dividline: true,
  // 线条样式
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
