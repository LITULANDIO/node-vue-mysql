<template>
  <div>
    <Navbar :user="user.name" @logout="onLogout"/>
    <slot />
  </div>
</template>

<script setup>
import { useStoreAuth } from '~~/stores/auth';
import useAuth from '@/composables/auth';
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useStoreAuth())
const { clearAuthData } = useAuth()

const onLogout = () => clearAuthData()

definePageMeta({
  middleware: ["auth"]
})
</script>