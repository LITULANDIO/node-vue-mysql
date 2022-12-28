<template>
    <Navbar :user="user" @logout="onLogout"/>
</template>

<script setup>
import { computed } from 'vue'
import AuthStore from '@/composables/auth'
import { useStoreAuth } from '~~/stores/auth';
const store = useStoreAuth()
const { clearAuthData } = AuthStore()

definePageMeta({
  middleware: ["auth"]
})
const onLogout = () => clearAuthData()
const user = computed(() => store.user?.name)
</script>

<style lang="scss" scoped></style>