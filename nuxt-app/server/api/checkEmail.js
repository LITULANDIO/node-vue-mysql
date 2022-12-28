import { DataProvider } from '@/data-provider/index'

export default defineEventHandler(async (email) => {
    console.log({email})
  const result = await DataProvider({
    providerType: 'USERS',
    type: 'GET_USERS'
  })
  result.body.find(user => user.email === email)
  console.log({result})
  return result;
});