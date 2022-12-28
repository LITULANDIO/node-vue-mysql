<template>
    <Navbar user="Litus" @logout="onLogout"/>
</template>

<script setup>
import AuthStore from '@/composables/auth'
const { clearAuthData } = AuthStore()

definePageMeta({
  middleware: ["auth"]
})
const onLogout = () => clearAuthData()
</script>

<style lang="scss" scoped></style>