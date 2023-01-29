<template>
  <div class="wrapper">
    <div class="flex justify-center">
      <div
        class="sm:w-11/12 md:w-8/12 max-w-md  pl-5 pr-5 "
      >
        <VForm
          class="card"
          :validation-schema="schema"
          :initial-values="dataUser"
          v-slot="{ meta: formMeta, errors: formErrors }"
          @submit.prevent="onLogin"
        >
          <h1 class="display mt-2 mb-5">Iniciar sessió</h1>
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
            name="password"
            label="Password"
            placeholder="Password"
            icon="fas fa-lock"
            v-model="dataUser.password"
            :value="dataUser.password"
          />
          <span class="text-sm text-red-600">{{ errorLogin }}</span>
          <div class="flex items-center justify-between">
            <button
              class="button mt-3 hover:text-slate	"
              :class="{ 'cursor-pointer': formMeta.valid, 'cursor-not-allowed': !formMeta.valid }"
              :disabled="!formMeta.valid"
              type="submit"
              @click="onLogin"
            >
              Inicia sessió
            </button>
            <nuxt-link to="/register"><span class="text-xs">¿No t'has registrat?</span></nuxt-link>
          </div>
        </VForm>
        <Modal header="Entra al grup" :show="isOpenModal" @onClose="onCloseModal">
          <VForm
            :validation-schema="schema"
            :initial-values="dataUser"
            v-slot="{ meta: formMeta, errors: formErrors }"
            @submit=""
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
            <div><button :class="{ 'cursor-pointer button-disabled': formMeta.valid, 'cursor-not-allowed button': !formMeta.valid }">Entrar</button></div>
          </VForm>
        </Modal>
      </div>
    </div>
    <div class="flex items-center justify-center mt-5" @click="onOpenModal"><div class="join-group text-center" data-text="UNIRSE A UN GRUP">UNIRSE A UN GRUP</div></div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { object, string, ref as yupRef } from "yup";
import { configure } from "vee-validate";
import { DataProvider } from '@/data-provider/index'
import { useStoreAuth } from '~~/stores/auth';
const store = useStoreAuth()
const { user } = storeToRefs(store)
const errorLogin = ref('')
const dataUser = reactive({ user: "", password: ""})
const isOpenModal = ref(false);

const onLogin = async () => {
  const result = await DataProvider({
    providerType: 'AUTH',
    type: 'LOGIN',
    params: dataUser
  })
  if(result.data.body.error){
    errorLogin.value = result.data.body.msg
  } else {
    user.value.id = result.data.body.id 
    user.value.name = result.data.body.user 
    navigateTo(`/dashboard/user`);
  }
};

const onOpenModal = () => {
  isOpenModal.value = true
}
const onCloseModal = () => { 
  isOpenModal.value = false 
}
configure({
  validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});
const schema = object({
  user: string().required(),
  password: string().required().label("Your Password"),

});
</script>

<style lang="scss" scoped>
 .wrapper {
  min-width: 100%;
  min-height: 100%;
  background-size: cover;
  background-position: center;
  .card{
      background-color: #fff;
      border-radius: 0.25rem;
      box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
      /* color: #4a4a4a; */
      max-width: 100%;
      position: relative;
      padding: 2rem;
      padding-right: 4rem;
  }
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
  .button{
      padding: 0.5rem;
      border: 1px solid;
      border-radius: 0.3rem;
      color: #dbdbdb;
  }
  .join-group{
    cursor: pointer;
    background-color: #3F3E3E;
    color: white;
    padding: 0.7rem;
    box-shadow: 0px 0px 0px 1px white;
    border-radius: 0.3rem;
    &:before{
      text-shadow: 0px 0px 20px  yellow;
      position: absolute;
      content: attr(data-text);
      animation: flicker 8s linear forwards;
      filter: blur(10px) brightness(0);
      animation-delay: 1s;
    }
  }
  @keyframes flicker{
    0%{
      filter: blur(5px) brightness(1);
    }
    3%{
      filter: blur(5px) brightness(0);
    }
    6%{
      filter: blur(5px) brightness(0);
    }
    7%{
      filter: blur(5px) brightness(1);
    }
    8%{
      filter: blur(5px) brightness(0);
    }
    9%{
      filter: blur(5px) brightness(1);
    }
    10%{
      filter: blur(5px) brightness(0);
    }
    20%{
      filter: blur(5px) brightness(1);
    }
  }
 }
</style>
