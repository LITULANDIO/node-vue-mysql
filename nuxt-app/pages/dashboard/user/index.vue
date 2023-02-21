<template>
    <Title>Dashboard {{ user.name }}</Title>
    <NuxtLayout/>
    <section class="flex justify-center items-center flex-col">
      <Groups 
        :groups="groups"
        :isLoading="isLoading"
        @onClicked="onGoGroup"
      />
    </section>
    <section id="modal">
      <ModalCreateGroup 
        :isOpen="isOpenModalCreate"
        :dataUser="dataUser"
        :dataGroup="dataGroup"
        @onClose="onCloseModalCreate"
        @onSubmit="handleSubmit"
      />
      <ModalEntryGroup 
        :isOpen="isOpenModalEntryGroup"
        :dataUser="dataUser"
        :error="errorEntryGroup"
        @onClose="onCloseModalEntry"
        @onSubmit="onGoGroupWithCode"
      />
    </section>
    <section class="flex justify-center items-center bottom-0 fixed w-full mb-3">
      <Button label="CREAR GRUP" @onClicked="onCreateGroup"/>
      <Button label="UNIRSE A UN GRUP" @onClicked="onShowModalCodeGroup" class="ml-3"/>
    </section>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue'
import { DataProvider } from '@/data-provider/index'
import { useStoreAuth } from '~~/stores/auth';
import { useStoreGroup } from '~~/stores/groups';
import { storeToRefs } from 'pinia'

definePageMeta({
  middleware: ["auth"]
})

//# const, ref, reactive
const storeAuth = useStoreAuth()
const storeGroup = useStoreGroup()
const { user } = storeToRefs(storeAuth)
const { group, groups, isLoading } = storeToRefs(storeGroup)
const isOpenModalCreate = ref(false)
const isOpenModalEntryGroup = ref(false)
let dataGroup = reactive({
  id: 0,
  name: '',
  date: '',
  budget: '',
  admin: user.value.id,
  guests: 0
})
const dataUser = reactive({
  user: '',
  password: ''
})
const errorEntryGroup = ref('')
//# end 

//# computed
const unitGroup = computed(() => group.value)

//# end

//# events
const onCreateGroup = () => isOpenModalCreate.value = true
const onCloseModalCreate = () => isOpenModalCreate.value = false 
const onCloseModalEntry = () => isOpenModalEntryGroup.value = false 
const onShowModalCodeGroup = () => {
  isOpenModalEntryGroup.value = true
  dataUser.user = user.value.name
}
const handleSubmit = async () => {
  await storeGroup.addGroup({
    dataGroup, 
    idUser: user.value.id
  })
  isOpenModalCreate.value = false
}
const onGoGroup = (groupSelceted) => {
  unitGroup.value.id = groupSelceted.id
  unitGroup.value.admin = groupSelceted.admin
  unitGroup.value.name = groupSelceted.name
  unitGroup.value.date = groupSelceted.date
  unitGroup.value.budget = groupSelceted.budget
  unitGroup.value.snug = groupSelceted.snug
  navigateTo(`/dashboard/user/group/${groupSelceted.snug}`)
}
const onGoGroupWithCode = async () => {
  errorEntryGroup.value = ''
  const fetchUser = await DataProvider({
      providerType: 'GROUPS',
      type: 'MATCH_CODE',
      params: dataUser
    })
    if(fetchUser.body.error) {
      errorEntryGroup.value = fetchUser.body.msg
      return
    }
    navigateTo(`/dashboard/user/group/${fetchUser.body?.snug}`)
}
//# end

//# cycle life
onMounted(() => {
  storeGroup.getGroups(user.value.id)
})
//# end
</script>

<style lang="scss" scoped>
#modal{
  position: absolute;
  width: 100%;
}
input[type="date"]::-webkit-inner-spin-button,
                  ::-webkit-calendar-picker-indicator,
                  ::-webkit-datetime-edit{
        display: none;
    }
    
   
    /* mostrar el calendario al hacer click */
    input[type="date"]::-webkit-calendar-picker-indicator {
        display: block;
        background: transparent;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: auto;
    }
   
    /* mostrar la fecha seleccionada al estar en hover */
    input[type="date"]:hover::-webkit-datetime-edit {
        display: block;
    }
</style>