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
  mutations: {
    setUser(state, payload) {
        state.user.id = payload.id
        state.user.name = payload.user
    }
  },
  getter: {
    getUser: state => state.user,
  },
  persist: true
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreAuth, import.meta.hot))
}