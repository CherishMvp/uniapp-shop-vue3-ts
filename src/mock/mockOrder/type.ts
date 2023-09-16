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
  pid?: string
  cid?: string
  picture?: string | undefined
  baselinePrice: number
  categoryName: string
  fixedPrice: number
  inventory: number
  number: number
  productName: string
  spec: string[]
  totalPrice: number
  weight: number
}
export interface ProductInfo {
  /**
   * 基本价格
   */
  baselinePrice: number
  /**
   * 分类（鸡鸭等）
   */
  categoryName: string
  /**
   * 分类ID（父级ID）
   */
  cid: string
  /**
   * 修正价格应该是对于某个客户的某个商品的价格，不能触发全部的改动；对于单独客户的修正价格，单独存放在一个表中维护
   */
  fixedPrice: number
  /**
   * 库存
   */
  inventory: number
  /**
   * 图片链接（存在阿里云OSS上）
   */
  picture: string
  /**
   * 商品ID
   */
  pid: string
  /**
   * 商品名称
   */
  productName: string
  /**
   * 应该是json格式存入数据库中，["小","中","大"]
   */
  spec: string
}
