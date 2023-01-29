import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStoreGroup = defineStore('group', {
  state: () => {
    return {
     group: {
        id: '',
        admin: '',
        name: '',
        date: '',
        budget: '',
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