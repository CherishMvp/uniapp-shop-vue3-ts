/** 通用分页结果类型 */
export type PageResult<T> = {
  /** 列表数据 */
  items: T[]
  /** 总条数 */
  counts: number
  /** 当前页数 */
  page: number
  /** 总页数 */
  pages: number
  /** 每页条数 */
  pageSize: number
}

/** 通用分页参数类型 */
export type PageParams = {
  /** 页码：默认值为 1 */
  page?: number
  /** 页大小：默认值为 10 */
  pageSize?: number
}

/** 通用商品类型 */
export type GoodsItem = {
  /** 商品描述 */
  desc: string
  /** 商品折扣 */
  discount: number
  /** id */
  id: string
  /** 商品名称 */
  name: string
  /** 商品已下单数量 */
  orderNum: number
  /** 商品图片 */
  picture: string
  /** 商品价格 */
  price: number
}
/** 通用分页结果类型 */
export type PoultryPageResult<T> = {
  /** 列表数据 */
  items: T[]
  /** 总条数 */
  counts: number
  /** 当前页数 */
  currentPage: number
  /** 总页数 */
  totalPages: number
  /** 每页条数 */
  pageSize: number
}

/** 通用分页参数类型 */
export type PoultryPageParams = {
  /** 页码：默认值为 1 */
  page?: number
  /** 页大小：默认值为 10 */
  pageSize?: number
  id?: number
}

/** 通用商品类型 */
export type PoultryGoodsItem = {
  /** 商品描述 */
  desc?: string
  /** 商品折扣 */
  discount?: number
  /** id */
  pid: number
  /** 商品名称 */
  productName: string
  /** 商品已下单数量 */
  orderNum?: number
  /** 商品图片 */
  picture: string
  /** 商品价格 */
  baselinePrice: number
  /**
   * 库存
   **/
  inventory: number
  /**
   * 库存
   **/
  spec: string[]
}
