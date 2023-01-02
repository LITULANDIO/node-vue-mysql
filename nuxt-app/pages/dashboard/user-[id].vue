<template>
    <Navbar :user="user.name" @logout="onLogout"/>
    <section id="modal">
      <Modal header="Crear un gruo" :show="isOpenModal" @onClose="onCloseModal">
            <VForm
              :validation-schema="schema"
              :initial-values="dataUser"
              v-slot="{ meta: formMeta, errors: formErrors }"
              @submit=""
            >
              <TextField
                type="text"
                name="name"
                label="Name"
                placeholder="Name group"
                icon="fas fa-user"
                v-model="dataGroup.name"
              />
              <TextField
                type="date"
                name="date"
                label="Date"
                placeholder="Date"
                icon="fas fa-lock"
                v-model="dataGroup.date"
              />

              <TextField
                type="text"
                name="budget"
                label="Budget"
                placeholder="Budget"
                icon="fas fa-lock"
                v-model="dataGroup.budget"
              />
              <div><button :class="{ 'cursor-pointer button-disabled': formMeta.valid, 'cursor-not-allowed button': !formMeta.valid }">Entrar</button></div>
            </VForm>
        </Modal>
    </section>
    <div class="create-group" @click="onCreateGroup">CREAR GRUP</div>
</template>

<script setup>
import { reactive } from 'vue'
import AuthStore from '@/composables/auth'
import { useStoreAuth } from '~~/stores/auth';
import { object, string, ref as yupRef } from "yup";
import { storeToRefs } from 'pinia'
const { user } = storeToRefs(useStoreAuth())
const { clearAuthData } = AuthStore()

definePageMeta({
  middleware: ["auth"]
})
const isOpenModal = ref(false);
const onLogout = () => clearAuthData()
const onCreateGroup = () => isOpenModal.value = true
const onCloseModal = () => isOpenModal.value = false 
const dataGroup = reactive({
  name: '',
  date: '',
  budget: ''
})
const schema = object({
  name: string().required(),
  date: string().required(),
  budget: string().required()
});
</script>

<style lang="scss" scoped>
#modal{
  padding-top: 20rem;
  position: absolute;
  width: 100%;
}
.create-group{
  cursor: pointer;
  position: realtive;
  z-index: 999;
  bottom: 0;
}
</style>