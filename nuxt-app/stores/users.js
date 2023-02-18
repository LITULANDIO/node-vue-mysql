import { defineStore, acceptHMRUpdate } from 'pinia'
import { DataProvider } from "@/data-provider/index"
 
export const useStoreUsers = defineStore('store', {
  state: async () => {
    return {
     users: null

    }
  },
  actions: {
    getAllUsers: async function() {
        const users = await DataProvider({
            providerType: 'USERS',
            type: 'GET_USERS',
          })
        this.users = users?.data?.body   
    }
  },
  getter: {
    getUsers: state => state.users,
  },
  persist: true
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreUsers, import.meta.hot))
}

