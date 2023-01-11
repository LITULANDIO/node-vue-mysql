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
              />
              <TextField
                type="text"
                name="email"
                label="Email"
                placeholder="Email"
                icon="fa-envelope"
                v-model="dataFriend.email"
              />
              <div class="input-file">
                  <input 
                    type="file"
                    @change="onPreviewImg"
                    v-show="false"
                    accept="image/png, image/jpeg"
                    id="file_input"
                    >
                <div class="file-custom" @click="onSelectImage">Selecciona una imatge de perfil</div>
              </div>
              <div class="flex justify-center img-preview">
                <img v-show="localImage" :src="localImage" /> 
              </div>
              <div><button :class="{ 'cursor-pointer button': formMeta.valid, 'cursor-not-allowed button': !formMeta.valid }">Guardar</button></div>
            </VForm>
        </Modal>
    </section>
    <section class="flex justify-center items-center bottom-0">
      <div class="add-friend fixed" @click="onCreateFriend"><span>AFAGEIX INVITAT</span></div>
    </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { object, string, ref as yupRef } from "yup";
const schema = object({
  name: string().required(),
  email: string().required(),
  file: string().required()
});
const dataFriend = reactive({
  name: '',
  email: '',
  file: ''
})
const localImage = ref(null)
const isOpenModal = ref(false);
const onCreateFriend = () => isOpenModal.value = true
const onCloseModal = () => isOpenModal.value = false 
const onPreviewImg = (event) => {
  const input = event.target;
  if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => localImage.value = e.target.result; 
      reader.readAsDataURL(input.files[0]);
    }
}
const onSelectImage = () =>{
  document.getElementById('file_input').click()
}

definePageMeta({
  middleware: ["auth"]
})
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
.img-preview{
  img{
    min-width: 150px;
    height: 150px;
    object-fit: fill;
    border-radius: 50%;
  }

}
.file-custom{
  text-align: center;
  padding: 0.5rem;
  margin-right: 2rem;
  border-radius: 0.3rem;
  color: #dbdbdb;
  width: 100%;
  background-color: #1c1e21;
  box-shadow: inset 0 0.0625em 0.225em 0.032222em rgba(10, 10, 10, 0.06);
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
  filter: sepia();
}

</style>