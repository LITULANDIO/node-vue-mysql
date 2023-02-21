import { defineStore, acceptHMRUpdate } from 'pinia'
import { DataProvider } from '@/data-provider/index'

export const useStoreGuest = defineStore('guests', {
  state: () => {
    return {
     data: null,
     isLoading: false
    }
  },
  actions: {
    async getGuests (id) {
       this.isLoading = true
        const guests = await DataProvider({
            providerType: 'GUESTS',
            type: 'GET_GUESTS',
            params: id
        })
       this.data = guests?.body
       this.isLoading = false
    },
    async addGuestInGroup ({guest, id}) {
      this.isLoading = true
      await DataProvider({
          providerType: 'GUESTS',
          type: 'INSERT_GUEST',
          params: JSON.parse(JSON.stringify(guest))
      })
    this.getGuests(id)
    this.isLoading = false
    } 
  },
  getter: {},
  persist: true
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreGuest, import.meta.hot))
}

