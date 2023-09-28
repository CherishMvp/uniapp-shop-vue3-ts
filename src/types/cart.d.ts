/** 购物车类型 */
export type CartItem = {
  /** 商品 ID */
  id: string
  /** SKU ID */
  skuId: string
  /** 商品名称 */
  name: string
  /** 图片 */
  picture: string
  /** 数量 */
  count: number
  /** 加入时价格 */
  price: number
  /** 当前的价格 */
  nowPrice: number
  /** 库存 */
  stock: number
  /** 是否选中 */
  selected: boolean
  /** 属性文字 */
  attrsText: string
  /** 是否为有效商品 */
  isEffective: boolean
}
/**
 * Request
 */
export interface PoultryCartItem {
  itemId: number
  number: number
  pid: number
  productDetail: ProductDetail
  spec: string
  selected: boolean
}

export interface ProductDetail {
  baselinePrice: string
  inventory: number
  picture: string
  pid: number
  productName: string
  spec: string[]
}

/** 购物车类型 */
export type PoultryCart = {
  /** 商品 ID */
  cartId: number
  openId: string
  userName: string
  createTime: string
  updateTime: string
  cartItems: PoultryCartItem[]
}
