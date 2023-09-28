import type { PageResult, GoodsItem } from './global'

/** 热门推荐-子类选项 */
export type SubTypeItem = {
  /** 子类id */
  id: string
  /** 子类标题 */
  title: string
  /** 子类对应的商品集合 */
  goodsItems: PageResult<GoodsItem>
}

/** 热门推荐 */
export type HotResult = {
  /** id信息 */
  id: string
  /** 活动图片 */
  bannerPicture: string
  /** 活动标题 */
  title: string
  /** 子类选项 */
  subTypes: SubTypeItem[]
}
interface Product {
  pid: number
  productName: string
  baselinePrice: string
  inventory: number
  picture: string
  spec: string[]
}

interface Category {
  cid: number
  categoryName: string
  bannerPicture: string
  products: Product[]
}

type Data = Category[]
