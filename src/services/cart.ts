import type { CartItem, PoultryCart, PoultryCartItem } from '@/types/cart'
import { http } from '@/utils/http'
import { baseUrl } from '@/utils/setting'
/**
 * 加入购物车
 * @param data 请求体参数
 */
export const postMemberCartAPI = (data: { skuId: string; count: number }) => {
  return http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}

/**
 * 获取购物车列表
 */
export const getMemberCartAPI = () => {
  return http<CartItem[]>(
    {
      method: 'GET',
      url: '/member/cart',
    },
    baseUrl,
  )
}
/**
 * 获取购物车列表
 */
export const getPoultryCartAPI = (openId: string) => {
  return http<PoultryCart>(
    {
      method: 'GET',
      url: `/poultry/user/cart/${openId}`,
    },
    baseUrl,
  )
}

/**
 * 加入购物车
 */
export const addToUserCart = (openId: string, data: any) => {
  return http<PoultryCartItem[]>(
    {
      method: 'POST',
      url: `/poultry/user/addToCart/${openId}`,
      data,
    },
    baseUrl,
  )
}

/**
 * 删除/清空购物车单品
 * @param data 请求体参数 ids SKUID 集合
 */
export const deleteMemberCartAPI = (data: { ids: string[] }) => {
  return http({
    method: 'DELETE',
    url: '/member/cart',
    data,
  })
}

/**
 * 修改购物车单品
 * @param skuId SKUID
 * @param data selected 选中状态 count 商品数量
 */
export const putMemberCartBySkuIdAPI = (
  skuId: string,
  data: { selected?: boolean; count?: number },
) => {
  return http(
    {
      method: 'PUT',
      url: `/member/cart/${skuId}`,
      data,
    },
    baseUrl,
  )
}

/**
 * 修改购物车单品
 * @param itemId itemId
 * @param data selected 选中状态 number 商品数量
 */
export const putPoultryCartByItemIdAPI = (
  itemId: number,
  data: { selected?: boolean; number?: number },
) => {
  return http(
    {
      method: 'PUT',
      url: `/poultry/user/cart/${itemId}`,
      data,
    },
    baseUrl,
  )
}
/**
 * 删除/清空购物车单品
 * @param data 请求体参数 ids SKUID 集合
 */
export const deletePoultryCartAPI = (data: { itemIds: number[] }) => {
  return http(
    {
      method: 'DELETE',
      url: `/poultry/user/cart`,
      data,
    },
    baseUrl,
  )
}
/**
 * 购物车全选/取消全选
 * @param data selected 是否选中
 */
export const putPoultryCartSelectedAPI = (data: { selected: boolean; openId: string }) => {
  return http(
    {
      method: 'PUT',
      url: '/poultry/cart/selected',
      data,
    },
    baseUrl,
  )
}
/**
 * 购物车全选/取消全选
 * @param data selected 是否选中
 */
export const putMemberCartSelectedAPI = (data: { selected: boolean }) => {
  return http({
    method: 'PUT',
    url: '/member/cart/selected',
    data,
  })
}
