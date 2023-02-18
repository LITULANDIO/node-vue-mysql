import { defineStore, acceptHMRUpdate } from 'pinia'
import { DataProvider } from '@/data-provider/index'

export const useStoreGroup = defineStore('groups', {
  state: () => {
    return {
    group: {
      id: '',
      admin: '',
      name: '',
      date: '',
      budget: '',
      snug: '',
    },
     groups: [],
     isLoading: false
    }
  },
  actions: {
    async getGroups (id) {
        this.isLoading = true
        const fetchGroup = await DataProvider({
             providerType: 'GROUPS',
             type: 'GET_GROUPS',
         })
        this.groups = fetchGroup.body.filter(group => group.admin === id)
        this.isLoading = false
    },
    async addGroup ({dataGroup: dataGroup, idUser: iduser}) {
      this.isLoading = true
      await DataProvider({
          providerType: 'GROUPS',
          type: 'INSERT_GROUP',
          params: JSON.parse(JSON.stringify(dataGroup))
        })
      await this.getGroups(iduser)
      this.isLoading = false
      }
  },
  getter: {},
  persist: true
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreGroup, import.meta.hot))
}
