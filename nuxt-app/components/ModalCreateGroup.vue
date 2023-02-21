<template>
      <Modal header="Crear un grupo" :show="isOpen" @onClose="onClose">
            <VForm
              :validation-schema="schema"
              :initial-values="dataUser"
              v-slot="{ meta: formMeta, errors: formErrors }"
              @submit="onSubmit"
            >
              <TextField
                type="text"
                name="name"
                label="Name"
                placeholder="Name group"
                icon="fa-people-line"
                v-model="dataGroup.name"
                :value="dataGroup.name"
              />
              <TextField
                type="date"
                name="date"
                label="Date"
                placeholder="Date"
                icon="fa-calendar-days"
                v-model="dataGroup.date"
                :value="dataGroup.date"
              />

              <TextField
                type="text"
                name="budget"
                label="Budget"
                placeholder="Budget"
                icon="fa-sack-dollar"
                v-model="dataGroup.budget"
                :value="dataGroup.budget"
              />
              <div><button :class="{ 'cursor-pointer button-disabled': formMeta.valid, 'cursor-not-allowed btn-allowed': !formMeta.valid }">Guardar</button></div>
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
      dataUser: {
        type: Object,
        default: {
            user: '',
            password: ''
        }
      },
      dataGroup: {
        type: Object,
        default: {
            id: 0,
            name: '',
            date: '',
            budget: '',
            admin: 0,
            guests: 0
        }
    }
})
//#end

//# emits
const emit = defineEmits(['onClose', 'onSubmit'])

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