import type { myResponse } from './type'

export const myHotList = {
  code: '1',
  msg: '操作成功',
  result: [
    {
      id: '1',
      pictures: [
        'https://yanxuan-item.nosdn.127.net/28dedcc7805456a1f8f79b7baf8c46aa.png',
        'https://yanxuan-item.nosdn.127.net/9d9590bdb4f7cdd874de6a4554abcff9.jpg',
      ],
      title: '鸭类',
      alt: '肉类鲜美',
      target: '10050',
      type: 1,
    },
    {
      id: '2',
      pictures: [
        'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-05/7f483771-6831-4a7a-abdb-2625acb755f3.png',
        'https://yanxuan-item.nosdn.127.net/9d5d0083264344b5d85acde13570d025.jpg',
      ],
      title: '鸡类',
      alt: '肉质最甜美',
      target: '10050',
      type: 2,
    },
  ],
}
/**
 * @description 只返回指定用户的订单（要求最近三单）
 **/
export const allOrderList = {
  code: '200',
  data: [
    {
      orderId: '62',
      userName: '侯娜',
      orderDate: '1991-06-08',
      createTime: '1694683213',
      updateTime: '1694683213',
      orderDetail: [
        {
          categoryName: '其他',
          number: 87,
          weight: 5,
          baselinePrice: '78',
          fixedPrice: '47',
          totalPrice: '82',
          productName: '老鸽',
          spec: '中',
          inventory: 2,
        },
        {
          categoryName: '其他',
          number: 64,
          weight: 45,
          baselinePrice: '70',
          fixedPrice: '29',
          totalPrice: '37',
          productName: '鸽子',
          spec: '小',
          inventory: 99,
        },
        {
          categoryName: '鸭类',
          number: 67,
          weight: 51,
          baselinePrice: '87',
          fixedPrice: '69',
          totalPrice: '84',
          productName: '鸽子',
          spec: '中',
          inventory: 81,
        },
        {
          categoryName: '鸭类',
          number: 72,
          weight: 35,
          baselinePrice: '89',
          fixedPrice: '99',
          totalPrice: '66',
          productName: '鸽子',
          spec: '中',
          inventory: 73,
        },
        {
          categoryName: '鸭类',
          number: 10,
          weight: 90,
          baselinePrice: '99',
          fixedPrice: '40',
          totalPrice: '52',
          productName: '乳鸽',
          spec: '小',
          inventory: 14,
        },
      ],
    },
    {
      orderId: '61',
      userName: '崔芳',
      orderDate: '2021-07-30',
      createTime: '1694683213',
      updateTime: '1694683213',
      orderDetail: [
        {
          categoryName: '鸡类',
          number: 78,
          weight: 79,
          baselinePrice: '29',
          fixedPrice: '3',
          totalPrice: '55',
          productName: '水鸭',
          spec: '小',
          inventory: 35,
        },
        {
          categoryName: '鸭类',
          number: 48,
          weight: 90,
          baselinePrice: '11',
          fixedPrice: '40',
          totalPrice: '5',
          productName: '白母鸭',
          spec: '中',
          inventory: 49,
        },
        {
          categoryName: '鸡类',
          number: 28,
          weight: 25,
          baselinePrice: '68',
          fixedPrice: '34',
          totalPrice: '36',
          productName: '白母鸭',
          spec: '大',
          inventory: 8,
        },
      ],
    },
    {
      orderId: '20',
      userName: '王军',
      orderDate: '1987-04-25',
      createTime: '1694683213',
      updateTime: '1694683213',
      orderDetail: [
        {
          categoryName: '其他',
          number: 36,
          weight: 91,
          baselinePrice: '19',
          fixedPrice: '47',
          totalPrice: '15',
          productName: '老鸽',
          spec: '中',
          inventory: 35,
        },
        {
          categoryName: '鸭类',
          number: 68,
          weight: 33,
          baselinePrice: '53',
          fixedPrice: '10',
          totalPrice: '81',
          productName: '鸽子',
          spec: '中',
          inventory: 5,
        },
      ],
    },
  ],
  message: 'fugiat do minim adipisicing quis',
}
/**
 * @description 返回所有用户所有时间的订单
 **/
export const myOrderList: myResponse = {
  code: '200',
  data: [
    {
      orderId: '33000019920425879X',
      userName: '测试用户',
      orderDate: '2020-11-12',
      createTime: '1694683664',
      updateTime: '1694683664',
      orderDetail: [
        {
          categoryName: '其他',
          number: 8,
          weight: 56,
          baselinePrice: '72',
          fixedPrice: '81',
          totalPrice: '77',
          productName: '白母鸭',
          spec: '小',
          inventory: 58,
        },
        {
          categoryName: '鸡类',
          number: 53,
          weight: 61,
          baselinePrice: '33',
          fixedPrice: '28',
          totalPrice: '8',
          productName: '水鸭',
          spec: '小',
          inventory: 31,
        },
        {
          categoryName: '鸭类',
          number: 13,
          weight: 4,
          baselinePrice: '37',
          fixedPrice: '28',
          totalPrice: '46',
          productName: '鸽子',
          spec: '小',
          inventory: 77,
        },
        {
          categoryName: '鸭类',
          number: 100,
          weight: 21,
          baselinePrice: '15',
          fixedPrice: '89',
          totalPrice: '64',
          productName: '乳鸽',
          spec: '中',
          inventory: 11,
        },
      ],
    },
    {
      orderId: '650000197301198632',
      userName: '测试用户',
      orderDate: '2000-05-21',
      createTime: '1694683664',
      updateTime: '1694683664',
      orderDetail: [
        {
          categoryName: '鸡类',
          number: 83,
          weight: 80,
          baselinePrice: '31',
          fixedPrice: '20',
          totalPrice: '48',
          productName: '水鸭',
          spec: '中',
          inventory: 63,
        },
        {
          categoryName: '鸡类',
          number: 1,
          weight: 51,
          baselinePrice: '88',
          fixedPrice: '20',
          totalPrice: '90',
          productName: '白母鸭',
          spec: '中',
          inventory: 99,
        },
        {
          categoryName: '鸭类',
          number: 86,
          weight: 52,
          baselinePrice: '74',
          fixedPrice: '76',
          totalPrice: '39',
          productName: '鸽子',
          spec: '小',
          inventory: 30,
        },
      ],
    },
  ],
  message: 'et ut sunt ullamco dolor',
}
