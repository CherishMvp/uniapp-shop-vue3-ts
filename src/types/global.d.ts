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
  goods_desc: string
  /** 商品折扣 */
  goods_discount?: number
  /** id */
  goods_id: string
  /** 商品名称 */
  goods_name: string
  /** 商品已下单数量 */
  goods_orderNum: number
  /** 商品图片 */
  goods_picture: string
  /** 商品价格 */
  goods_price: number
}
