<template>
    <NuxtLayout/>
    <section id="modal">
      <Guests 
        v-if="data"
        :isLoading="isLoading"
        :guests="data.guests"
      />
      <ModalAddGuest 
        :isOpen="isOpenModal"
        :guest="dataFriend"
        :isShowDropdownUsers="isShowDropdownUsers"
        :isExistedGuest="isExistedGuest"
        :users="getUsers"
        @onClose="onCloseModal"
        @onKeyUp="onKeyUp"
        @onClicked="onSelectUser"
        @onSubmit="onSubmitFriend"
      />
    </section>
    <section class="flex justify-center items-center bottom-0">
      <Button label="AFAGEIX INVITAT" @onClicked="onCreateFriend" class="fixed"/>
    </section>
</template>

<script setup>
/**
 *TODO !!
 * =============================================================
 * - Vista usuari la mateixa sense el botó AFAGEIX INVITAT
 * - BOTÓ veure amic invisible => redirect vista AMIC INIVISBLE
 * =============================================================
 */

import { ref, reactive, onMounted, onUpdated, computed, nextTick } from 'vue'
import { useStoreGroup } from '~~/stores/groups';
import { useStoreGuest } from '~~/stores/guests';
import { storeToRefs } from 'pinia'
import useUsers from '@/composables/users'
import { DataProvider } from '@/data-provider/index'
definePageMeta({
  middleware: ["auth"]
})

//#ref reactive const 
const storeGroup = useStoreGroup()
const storeGuest = useStoreGuest()
const { group } = storeToRefs(storeGroup)
const { data, isLoading } = storeToRefs(storeGuest)
const { getAllUsers } = useUsers()
const route = useRoute()
const dataFriend = reactive({
  name: '',
  send: '',
  to: '',
  file: ''
})
const usersParsed = ref([])
const isOpenModal = ref(false);
const isShowDropdownUsers = ref(false)
const idGuest = ref('')
const isExistedGuest = ref(false)
const id = ref('')
//#end

//#cycle life
onMounted(async() => {
  if (route.params.id) {
    id.value = route.params.id
  }
 usersParsed.value = await getAllUsers()
 await storeGuest.getGuests(id.value)
})
//#end

//#computed
const getUsers = computed(() => {
  return usersParsed.value.filter(user => user?.user.toLowerCase().includes(dataFriend.name.toLowerCase()))
})
//#end

//#events
const onCreateFriend = () => isOpenModal.value = true
const onCloseModal = () => isOpenModal.value = false 
const onSelectUser = (event, idUser) => {
  console.log(event, idUser)
  nextTick(() => {
    idGuest.value = idUser
    console.log('id=>', idGuest.value)
    dataFriend.name = event.target.textContent
    isShowDropdownUsers.value = false
  })
}
const onKeyUp = () => {
  isShowDropdownUsers.value = dataFriend.name.length >= 3
  isExistedGuest.value = false
}
const onSubmitFriend = async () => {
  const isExistGuest = data.value.guests.some(guest => guest.id === idGuest.value)
  if (isExistGuest) {
    isExistedGuest.value = true
    return
  }
  await storeGuest.addGuestInGroup({
    data: {idGroup: group.value.id, idGuest: idGuest.value},
    id: id.value
  })
  isOpenModal.value = false
  DataProvider({
    providerType: 'MAIL',
    type: 'SENDMAIL',
    params: {
      sender: dataFriend.send,
      to: dataFriend.to,
      name: group.value.name,
      user: dataFriend.name,
      idAdmin: group.value.admin,
      
    }
  })
}
//#end

</script>

<style lang="scss" scoped>
#modal{
  position: absolute;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
}
</style>