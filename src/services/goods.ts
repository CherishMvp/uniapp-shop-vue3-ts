import type { GoodsResult } from '@/types/goods'
import { http } from '@/utils/http'
import { baseUrl } from '@/utils/setting'

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
/**
 * 商品详情
 * @param id 商品id
 */
export const getPoultryGoodsByIdAPI = (pid: number) => {
  return http<any>(
    {
      method: 'GET',
      url: '/poultry/getProduct',
      data: { pid },
    },
    baseUrl,
  )
}
/**
 * 获取key和proxy
 **/
export const getPostObjectParamsAPI = () => {
  return http<any>(
    {
      method: 'GET',
      url: '/poultry/getPostObjectParamsAPI',
    },
    baseUrl,
  )
}
/**
 * 创建/修改商品
 * @param id 商品id
 */
export const updatePoultryGoodsAPI = (data: any, pid?: number) => {
  return http<any>(
    {
      method: 'POST',
      url: '/poultry/createProduct',
      data: { ...data, pid },
    },
    baseUrl,
  )
}
