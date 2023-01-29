<template>
    <NuxtLayout/>
    <section id="modal">
      <Modal header="Afegir amic invisible" :show="isOpenModal" @onClose="onCloseModal">
            <VForm
              :validation-schema="schema"
              :initial-values="dataFriend"
              v-slot="{ meta: formMeta, errors: formErrors }"
              @submit="onSubmitFriend"
            >
              <TextField
                type="text"
                name="name"
                label="Name"
                placeholder="Name Friend"
                icon="fa-user"
                v-model="dataFriend.name"
                :value="dataFriend.name"
                @keyup="onKeyUp"
              />
                <div v-if="isShowDropdownUsers" class="searching">
                  <ul>
                    <li v-if="getUsers.length === 0">No existeix l'usuari</li>
                    <li @click="onSelectUser($event, user.id)" class="flex justify-start" v-for="user in getUsers" :key="user.id">
                      <img :src="user.photo" width="40" height="40"/>
                      <div class="ml-3">{{ user.user }}</div>
                    </li>
                  </ul>
                </div>
              <TextField
                type="text"
                name="email"
                label="Email"
                placeholder="Email"
                icon="fa-envelope"
                v-model="dataFriend.email"
                :value="dataFriend.email"
              />
              <div><button :class="{ 'cursor-pointer button': formMeta.valid, 'cursor-not-allowed button': !formMeta.valid }">Guardar</button></div>
            </VForm>
        </Modal>
    </section>
    <section class="flex justify-center items-center bottom-0">
      <div class="add-friend fixed" @click="onCreateFriend"><span>AFAGEIX INVITAT</span></div>
    </section>
</template>

<script setup>
/**
 *TODO !!
 * - ENVIAR EMAIL A USUARI amb códig al fer SUBMIT
 * - GUARDAR BBDD dades al grup => id usuari
 * - RECUPERAR DADES d'usuari mitjançant id usuari dels GUESTS
 * - Vista usuari la mateixa sense el botó AFAGEIX INVITAT
 * - BOTÓ veure amic invisible => redirect vista AMIC INIVISBLE
 */

import { ref, reactive, onMounted, onUpdated, computed, nextTick } from 'vue'
import { object, string, ref as yupRef } from "yup";
import { useStoreGroup } from '~~/stores/groups';
import { storeToRefs } from 'pinia'
import useUsers from '@/composables/users'
import useGroups from '@/composables/groups'

definePageMeta({
  middleware: ["auth"]
})

//#ref reactive const 
const storeGroup = useStoreGroup()
const { group } = storeToRefs(storeGroup)
const { getAllUsers } = useUsers()
const { addGuestInGroup, getGuests } = useGroups()
const schema = object({
  name: string().required(),
  email: string().required(),
});
const dataFriend = reactive({
  name: '',
  email: '',
  file: ''
})
const usersParsed = ref([])
const isOpenModal = ref(false);
const isShowDropdownUsers = ref(false)
const idGuest = ref('')
//#end

//#cycle life
onMounted(async() => {
  console.log(group.value)
  usersParsed.value = await getAllUsers()
  console.log('guests =>', await getGuests(group.value.id))
})
onUpdated(() => {
  if(dataFriend.name === ''){
    isShowDropdownUsers.value = false
  }
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
  nextTick(() => {
    idGuest.value = idUser
    console.log('id=>', idGuest.value)
    dataFriend.name = event.target.textContent
    isShowDropdownUsers.value = false
  })
}
const onKeyUp = () => {
  isShowDropdownUsers.value = dataFriend.name.length >= 3
}
const onSubmitFriend = async () => {
  await addGuestInGroup({idGroup: group.value.id, idGuest: idGuest.value})
}

//#end

</script>

<style lang="scss" scoped>
#modal{
  padding-top: 20rem;
  position: absolute;
  width: 100%;
  .button{
      padding: 0.5rem;
      border: 1px solid;
      border-radius: 0.3rem;
      color: #dbdbdb;
  }
}
.add-friend {
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

.searching{
  background: #3F3E3E;
  max-height: 150px;
  overflow-y: scroll;
  border: 2px solid;
  border-radius: 0.5rem;
  padding: 0.2rem;
  width: 100%;
  margin-right: 2rem;
  ul{
    li{
      background: #3F3E3E;
      color: yellow;
      border: 2px solid yellow;
      margin-bottom: 5px;
      padding: 10px;
      border-radius: 5px;
      filter: sepia();
      cursor: pointer;
      position: relative;
      z-index: 10;
      &:hover{
        background-color: grey;
        filter: sepia();

      }
      img{
        position: relative;
        z-index: 11;
        border-radius: 50%;
        filter: contrast(100%);
      }
    }
    li:last-child {
      margin-bottom: 0;
    }
  }
}

</style>