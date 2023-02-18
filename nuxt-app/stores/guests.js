import { defineStore, acceptHMRUpdate } from 'pinia'
import { DataProvider } from '@/data-provider/index'

export const useStoreGuest = defineStore('guests', {
  state: () => {
    return {
     data: null,
     loading: ''
    }
  },
  actions: {
    async getGuests (id) {
        const guests = await DataProvider({
            providerType: 'GUESTS',
            type: 'GET_GUESTS',
            params: id
        })
       return this.data = guests?.body
    }
  },
  getter: {},
  persist: true
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreGuest, import.meta.hot))
}