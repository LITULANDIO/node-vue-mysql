<template>
    <Title>Dashboard {{ user.name }}</Title>
    <NuxtLayout/>
    <section class="flex justify-center items-center flex-col">
      <div class="box-group" v-for="group in groups.values" :key="group.id">
        <div @click="onGoGroup(group)">{{ group.name }}</div>
      </div>
    </section>
    <section id="modal">
      <Modal header="Crear un grupo" :show="isOpenModal" @onClose="onCloseModal">
            <VForm
              :validation-schema="schema"
              :initial-values="dataUser"
              v-slot="{ meta: formMeta, errors: formErrors }"
              @submit="onSubmitGroup"
            >
              <TextField
                type="text"
                name="name"
                label="Name"
                placeholder="Name group"
                icon="fa-people-line"
                v-model="dataGroup.name"
              />
              <TextField
                type="date"
                name="date"
                label="Date"
                placeholder="Date"
                icon="fa-calendar-days"
                v-model="dataGroup.date"
              />

              <TextField
                type="text"
                name="budget"
                label="Budget"
                placeholder="Budget"
                icon="fa-sack-dollar"
                v-model="dataGroup.budget"
              />
              <div><button :class="{ 'cursor-pointer button-disabled': formMeta.valid, 'cursor-not-allowed button': !formMeta.valid }">Guardar</button></div>
            </VForm>
        </Modal>
    </section>
    <section class="flex justify-center items-center bottom-0">
      <div class="create-group fixed" @click="onCreateGroup"><span>CREAR GRUP</span></div>
    </section>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue'
import { DataProvider } from '@/data-provider/index'
import { useStoreAuth } from '~~/stores/auth';
import { useStoreGroup } from '~~/stores/groups';
import { object, string, ref as yupRef } from "yup";
import { storeToRefs } from 'pinia'
import useGroups from '@/composables/groups'
const storeAuth = useStoreAuth()
const storeGroup = useStoreGroup()
const { user } = storeToRefs(storeAuth)
const { group } = storeToRefs(storeGroup)
const { getGroups } = useGroups()
const router = useRoute()
const route = useRouter()
console.log({route}, {router})
console.log(router.params.id)

definePageMeta({
  middleware: ["auth"]
})
const isOpenModal = ref(false);
const unitGroup = computed(() => group.value)
const groups = reactive([])
const onCreateGroup = () => isOpenModal.value = true
const onCloseModal = () => isOpenModal.value = false 
const dataGroup = reactive({
  id: 0,
  name: '',
  date: '',
  budget: '',
  admin: user.value.id,
  guests: 0
})
const schema = object({
  name: string().required(),
  date: string().required(),
  budget: string().required()
});
const onSubmitGroup = async () => {
  await DataProvider({
      providerType: 'GROUPS',
      type: 'INSERT_GROUP',
      params: JSON.parse(JSON.stringify(dataGroup))
    })
}
const onGoGroup = (group) => {
  unitGroup.value.admin = group.admin
  unitGroup.value.name = group.name
  unitGroup.value.date = group.date
  unitGroup.value.budget = group.budget
  unitGroup.value.guests = group.guests
  navigateTo(`/dashboard/user/group/${group?.code.split('/')[1] || group?.code}`)
}
onMounted(async () => {
  groups.values = await getGroups(user.value.id)
})
</script>

<style lang="scss" scoped>
#modal{
  padding-top: 10rem;
  position: absolute;
  width: 100%;
  .button{
      padding: 0.5rem;
      border: 1px solid;
      border-radius: 0.3rem;
      color: #dbdbdb;
  }
}
.create-group, .box-group{
  cursor: pointer;
  position: realtive;
  z-index: 999;
  bottom: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  color: white;
  background: #3F3E3E;
  border: 2px solid yellow;
  box-shadow:0 0 0 0.2rem #3F3E3E;
  filter:sepia()
}
.box-group{
  min-width: 15rem;
  margin-bottom: 0.5rem;
  text-align: center;

}
</style>