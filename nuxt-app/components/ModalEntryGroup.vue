<template>
    <Modal header="Entra al grup" :show="isOpen" @onClose="onClose">
        <VForm
        :validation-schema="schema"
        :initial-values="dataUser"
        v-slot="{ meta: formMeta, errors: formErrors }"
        @submit="onSubmit"
        >
        <TextField
            type="text"
            name="user"
            label="User"
            placeholder="Usuari"
            icon="fas fa-user"
            v-model="dataUser.user"
            :value="dataUser.user"
        />
        <TextField
            type="password"
            name="code"
            label="Code group"
            placeholder="Code group"
            icon="fas fa-lock"
            v-model="dataUser.password"
            :value="dataUser.password"
        />
        <div v-if="error" class="mb-3 text-red-600">{{ error }}</div>
        <div><button @click="onSubmit" :class="{ 'cursor-pointer button-disabled': formMeta.valid, 'cursor-not-allowed btn-allowed': !formMeta.valid }">Entrar</button></div>
        </VForm>
    </Modal> 
</template>

<script setup>
import { object, string, ref as yupRef } from "yup";

//# props
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
    error: {
        type: String,
        default: ''
    },
    dataUser: {
        type: Object,
        default: {
            user: '',
            password: ''
        }
    },
})
//#end

//# emits
const emit = defineEmits(['onClose', 'onSubmit', 'onClicked'])

const onClose = () => emit("onClose")
const onSubmit = () => emit("onSubmit")
//#

//# const ref
const schema = object({
  name: string().required(),
  date: string().required(),
  budget: string().required()
});
//#end
</script>

<style lang="scss" scope>
.button-disabled{
    padding: 0.5rem;
    border: 1px solid;
    border-radius: 0.3rem;
    color: #dbdbdb;
    &:hover{
    box-shadow: 0px 0px 0px 1px white;
    border-radius: 0.3rem;
    background-color: #3F3E3E;
    color: white
    }
}
.btn-allowed{
      padding: 0.5rem;
      border: 1px solid;
      border-radius: 0.3rem;
      color: #dbdbdb;
  }
</style>