import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStoreGroup = defineStore('group', {
  state: () => {
    return {
     group: {
        admin: '',
        name: '',
        date: '',
        budget: '',
        guests: null
     }

    }
  },
  actions: {},
  getter: {},
  persist: true
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreGroup, import.meta.hot))
}