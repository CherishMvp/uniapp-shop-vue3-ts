import type { PoultryCartItem } from '@/types/cart'
import type { OrderListResult } from '@/types/order2'
import type {
  OrderCreateParams,
  OrderListParams,
  OrderLogisticResult,
  OrderPreResult,
  OrderResult,
} from '@/types/order2'
import { http } from '@/utils/http'

import { baseUrl } from '@/utils/setting'

/**
 * 填写订单-获取预付订单
 */
export const getMemberOrderPreAPI = () => {
  return http<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre',
  })
}

/**
 * 填写订单-获取立即购买订单
 */
export const getMemberOrderPreNowAPI = (data: {
  skuId: string
  count: string
  addressId?: string
}) => {
  return http<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre/now',
    data,
  })
}

/**
 * 填写订单-再次购买
 * @param id 订单id
 */
export const getMemberOrderRepurchaseByIdAPI = (id: string) => {
  return http<OrderPreResult>({
    method: 'GET',
    url: `/member/order/repurchase/${id}`,
  })
}

/**
 * 提交订单
 * @param data 请求参数
 */
export const postMemberOrderAPI = (data: OrderCreateParams) => {
  return http<{ id: string }>({
    method: 'POST',
    url: '/member/order',
    data,
  })
}

/**
 * 获取订单详情
 * @param id 订单id
 */
export const getMemberOrderByIdAPI = (id: string) => {
  return http<OrderResult>({
    method: 'GET',
    url: `/member/order/${id}`,
  })
}

/**
 * 获取订单详情
 * @param openId 用户openId
 */
export const getPoultryOrderByIdAPI = (data: any) => {
  return http<any>(
    {
      method: 'GET',
      url: `/poultry/orderinfo`,
      data,
    },
    baseUrl,
  )
}
/**
 * 获取指定订单ID的订单详情
 * @param openId 用户openId
 * @param orderId 订单ID
 */
export const getOrderInfoByOrderIdAPI = (data: any) => {
  return http<any>(
    {
      method: 'GET',
      url: `/poultry/findByOrderID`,
      data,
    },
    baseUrl,
  )
}
/**
 * 发送模板信息
 **/
export const postTemplateInfo = (data: any) => {
  return http<any>(
    {
      method: 'POST',
      url: `/poultry/muban`,
      data,
    },
    baseUrl,
  )
}

/**
 * 创建订单
 */
export const createOrderAPI = (data: any) => {
  return http<PoultryCartItem[]>(
    {
      method: 'POST',
      url: `/poultry/createOrder`,
      data,
    },
    baseUrl,
  )
}

/**
 * 修改商品
 */
export const uploadPictureAPI = (data: any) => {
  return http<any>(
    {
      method: 'POST',
      url: `/poultry/user/admin/picture`,
      data,
    },
    baseUrl,
  )
}

/**
 * 修改重量、修正价格
 * @param updateInfo 更新信息
 */
export const postPoultryWeightAPI = (updateInfo: any) => {
  return http<any>(
    {
      method: 'PUT',
      url: '/poultry/orderinfo',
      data: updateInfo,
    },
    baseUrl,
  )
}
/**
 * 筛选用户信息
 */
export const getAllUsersAPI = () => {
  return http<any>(
    {
      method: 'GET',
      url: '/poultry/user/allUsers',
    },
    baseUrl,
  )
}

/**
 * 模拟发货-内测版
 * @description 在DEV环境下使用，仅在订单状态为待发货时，可模拟发货，调用后订单状态修改为待收货，包含模拟物流。
 * @param id 订单id
 */
export const getMemberOrderConsignmentByIdAPI = (id: string) => {
  return http({
    method: 'GET',
    url: `/member/order/consignment/${id}`,
  })
}

/**
 * 确认收货
 * @description 仅在订单状态为待收货时，可确认收货。
 * @param id 订单id
 */
export const putMemberOrderReceiptByIdAPI = (id: string) => {
  return http<OrderResult>({
    method: 'PUT',
    url: `/member/order/${id}/receipt`,
  })
}

/**
 * 获取订单物流
 * @description 仅在订单状态为待收货，待评价，已完成时，可获取物流信息。
 * @param id 订单id
 */
export const getMemberOrderLogisticsByIdAPI = (id: string) => {
  return http<OrderLogisticResult>({
    method: 'GET',
    url: `/member/order/${id}/logistics`,
  })
}

/**
 * 删除订单
 * @description 仅在订单状态为待评价，已完成，已取消时，可删除订单。
 * @param data ids 订单集合
 */
export const deleteMemberOrderAPI = (data: { ids: string[] }) => {
  return http({
    method: 'DELETE',
    url: `/member/order`,
    data,
  })
}

/**
 * 取消订单
 * @description 仅在订单状态为待付款时，可取消订单。
 * @param id 订单id
 * @param data cancelReason 取消理由
 */
export const getMemberOrderCancelByIdAPI = (id: string, data: { cancelReason: string }) => {
  return http<OrderResult>({
    method: 'PUT',
    url: `/member/order/${id}/cancel`,
    data,
  })
}

/**
 * 获取订单列表
 * @param data orderState 订单状态
 */
export const getMemberOrderAPI = (data: OrderListParams) => {
  return http<OrderListResult>({
    method: 'GET',
    url: `/member/order`,
    data,
  })
}
