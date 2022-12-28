import AuthStore from '@/composables/auth'
const { isAuthenticated } = AuthStore()
export default defineNuxtRouteMiddleware (() => {
     if (!isAuthenticated()) {
         return navigateTo('/');
     }
    })