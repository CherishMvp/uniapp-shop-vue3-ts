import { postValidToken } from '@/services/profile'
import { useMemberStore } from '@/stores/modules/member'

/**
 * 校验token是否过期
 **/
export const checkLoginState = async (): Promise<boolean> => {
  const memberStore = useMemberStore()
  console.log('memberStore.profile?.token', memberStore.profile?.token)
  const isExpired = await postValidToken({ token: memberStore.profile?.token })
  console.log('isExpired', isExpired)
  return isExpired.result
}
