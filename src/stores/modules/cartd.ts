import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as string[],
  }),
  getters: {
    itemCount(): number {
      return this.items.length
    },
  },
  actions: {
    addItem(item: string): void {
      this.items.push(item)
    },
    removeItem(index: number): void {
      this.items.splice(index, 1)
    },
    clearItems(): void {
      this.items = []
    },
  },
  persist: {
    storage: {
      getItem(key) {
        return localStorage.getItem(key)
      },
      setItem(key, value) {
        localStorage.setItem(key, value)
      },
    },
  },
})
