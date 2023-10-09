import type { ProfileDetail } from '@/types/member'
import { http } from '@/utils/http'
import { baseUrl } from '@/utils/setting'

type LoginWxMinParams = {
  code?: string
  phoneCode?: string //用于获取手机号码
  encryptedData?: string
  iv?: string
  rawData: string
}
type CommonRes<T> = {
  result: T
  code: number
  message: string
}
/**
 * 验证token有效性
 **/

export const postValidToken = (data: any) => {
  return http<any>(
    {
      method: 'POST',
      url: '/poultry/validToken',
      data,
    },
    baseUrl,
  )
}
/**
 * 获取用户信息
 **/
export const getUserProfileAPI = (data: any) => {
  return http<LoginWxMinParams>(
    {
      method: 'POST',
      url: '/poultry/user/info',
      data,
    },
    baseUrl,
  )
}
/**
 * 修改个人信息
 * @param data 请求体参数
 */
export const putUserProfileAPI = (data: any) => {
  return http<ProfileDetail>(
    {
      method: 'PUT',
      url: '/poultry/user/userinfo',
      data,
    },
    baseUrl,
  )
}
