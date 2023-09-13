import type { GoodsResult } from '@/types/goods'
import { http } from '@/utils/http'

/**
 * 商品详情
 * @param id 商品id
 */
export const getGoodsByIdAPI = (id: string) => {
  return http<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: { id },
  })
}
export const getGoodsByIdAPI_Express = (id: string) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'http://localhost:3000/users/goods',
      data: { id },
      method: 'GET',
      success: ({ data, statusCode, header }) => {
        console.log('dataa', data)
        resolve(data)
      },
      fail: (error) => {},
    })
  })
}
