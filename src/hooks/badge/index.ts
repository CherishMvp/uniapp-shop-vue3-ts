import { useMemberStore } from '@/stores'
import { useCartStore } from '@/stores/modules/cartd'
import { getPoultryCartAPI as getCartAPI } from '@/services/cart'

const getPoultryCartAPI = async () => {
  const memberStore = useMemberStore()
  const cartStore = useCartStore()
  const openId = memberStore.profile!.openId
  const res = await getCartAPI(openId)
  console.log('response==length', res.result)
}
