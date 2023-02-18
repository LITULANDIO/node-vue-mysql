import { defineStore, acceptHMRUpdate } from 'pinia'
import { DataProvider } from '@/data-provider/index'

export const useStoreGroup = defineStore('group', {
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
     loading: ''

    }
  },
  actions: {
    async getGroups (id) {
        const groups = await DataProvider({
             providerType: 'GROUPS',
             type: 'GET_GROUPS',
         })
         console.log({groups})
        return groups.body.filter(group => group.admin === id)
     }
  },
  getter: {},
  persist: true
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreGroup, import.meta.hot))
}


const getGroups = async (id) => {
    const groups = await DataProvider({
         providerType: 'GROUPS',
         type: 'GET_GROUPS',
     })
    return groups.body.filter(group => group.admin === id)
 }