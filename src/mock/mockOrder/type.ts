export interface myResponse {
  code: string
  /**
   * 指定用户订单最多为3，最少为0
   */
  data: Datum[]
  message: string
}
export interface OrderInfo {
  data: Datum[]
}
export interface Datum {
  createTime: string
  orderDate: string
  orderDetail: OrderDetail[]
  /**
   * 最多有三个订单
   */
  orderId: string
  updateTime: string
  /**
   * 这种情况，usereName要返回一样的
   */
  userName: string
}

export interface OrderDetail {
  baselinePrice: string
  categoryName: string
  fixedPrice: string
  inventory: number
  number: number
  productName: string
  spec: string
  totalPrice: string
  weight: number
}
