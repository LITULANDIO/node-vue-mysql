import { DataProvider } from '@/data-provider/index'

export default defineEventHandler(async (data) => {
  const result = await DataProvider({
    providerType: 'USERS',
    type: 'INSERT_USER',
    params: data
  })
  return result
});