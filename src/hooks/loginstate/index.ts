import { useMemberStore } from '@/stores/modules/member'

export const checkLoginState = async () => {
  const memberStore = useMemberStore()
  return memberStore.profile?.openId ? true : false
}
