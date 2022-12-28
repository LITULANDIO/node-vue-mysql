import { defineStore, acceptHMRUpdate } from 'pinia'
 
export const useStoreAuth = defineStore('store', {
  state: async () => {
    return {
     user: {
        id: null,
        name: '',
        photo: ''
     }

    }
  },
  actions: {},
  getter: {},
  persist: true
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreAuth, import.meta.hot))
}