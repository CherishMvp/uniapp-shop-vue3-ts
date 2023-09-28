export const CustomerModal = (
  content: string,
  targetPath: string,
  isSwitchTab: boolean = false,
) => {
  return uni.showModal({
    title: '提示',
    content: content,
    confirmColor: '#4a98',
    showCancel: true,
    success: ({ confirm, cancel }) => {
      if (confirm) {
        if (!isSwitchTab) uni.navigateTo({ url: targetPath })
        else uni.switchTab({ url: targetPath })
      }
    },
  })
}
