import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStoreAuth = defineStore('auth', {
  state: () => {
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