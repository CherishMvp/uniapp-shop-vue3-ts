import type { LoginResult, NewUserInfo, PolutryLoginResult } from '@/types/member'
import { http } from '@/utils/http'
import { baseUrl } from '@/utils/setting'

type LoginWxMinParams = {
  code: string
  phoneCode?: string //用于获取手机号码
  encryptedData?: string
  iv?: string
}
/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxMinAPI = (data: NewUserInfo & any) => {
  return http<PolutryLoginResult>(
    {
      method: 'POST',
      url: '/poultry/user/code',
      data: data,
    },
    baseUrl,
  )
}
/**
 * 家禽预定小程序获取用户手机号码
 **/
export const postPhoneNumberAPI = (code: string, userInfo: any) => {
  return http<any>(
    {
      method: 'POST',
      url: '/poultry/user/getPhoneNumber',
      data: { code: code, userInfo },
    },
    baseUrl,
  )
}
/**
 * 小程序登录_内测版
 * @param phoneNumber 模拟手机号码
 */
export const postLoginWxMinSimpleAPI = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}

type LoginParams = {
  account: string
  password: string
}
/**
 * 传统登录-用户名+密码
 * @param data 请求参数
 */
export const postLoginAPI = (data: LoginParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login',
    data,
  })
}
