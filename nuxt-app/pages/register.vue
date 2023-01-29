<template>
    <div class="wrapper">
      <div class="flex justify-center">
        <div class="sm:w-11/12 md:w-8/12 max-w-md  pl-5 pr-5 " >
          <VForm
            class="card"
            :validation-schema="schema"
            :initial-values="dataUser"
            v-slot="{ meta: formMeta, errors: formErrors }"
            @submit.prevent="onSubmit">
            <h2 class="display mt-2 mb-8">Registre</h2>
            <div class="flex justify-end img-preview">
              <img v-show="localImage" :src="localImage" /> 
            </div>
            <TextField
                type="text"
                name="user"
                label="User"
                placeholder="Usuari"
                icon="fas fa-user"
                check
                v-model="dataUser.user"
                :value="dataUser.user"
                />
            <div class="input-file">
              <input 
                type="file"
                @change="onPreviewImg"
                v-show="false"
                accept="image/png, image/jpeg"
                id="file_input">
                <div class="file-custom" @click="onSelectImage">Selecciona una imatge de perfil</div>
            </div>
            <TextField
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
              icon="fas fa-envelope"
              check
              v-model="dataUser.email"
              :value="dataUser.email"
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              icon="fas fa-lock"
              check
              v-model="dataUser.password"
              :value="dataUser.password"
            />
            <TextField
              type="password"
              name="confirmed"
              label="Confirm Password"
              placeholder="Confirm Password"
              icon="fas fa-lock"
              check
              v-model="dataUser.confirmed"
              :value="dataUser.confirmed"
  
            />
            <div class="flex items-center justify-between">
                <button
                class="button mt-3 hover:text-slate	"
                :class="{ 'cursor-pointer': formMeta.valid, 'cursor-not-allowed': !formMeta.valid }"
                :disabled="!formMeta.valid"
                type="submit"
                @click="onSubmit"
                >
                Registret
                </button>
                <nuxt-link to="/"><span class="text-xs">Ja estic registrat</span></nuxt-link>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { reactive } from 'vue'
  import { object, string, ref as yupRef } from "yup";
  import { configure } from "vee-validate";
  import { useRouter } from 'vue-router';

//#ref reactive const 
  const router = useRouter()
  const dataUser = reactive({ user: "", email: "", password: "", confirmed: "", photo: "" })
  const localImage = ref(null)
  configure({
    validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
    validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
    validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
    validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
  });
  const schema = object({
    email: string()
      .required()
      .email()
      .test(
        "is-taken",
        "El email ja es troba registrat",
        async (value) => !(await existingEmail(value))
      )
      .label("Email Address"),
    user: string().required(),
    password: string().required().min(8).label("Your Password"),
    confirmed: string()
      .required()
      .oneOf([yupRef("password")], "La contrassenya no coincideix") //Cross-Field Validation
      .label("La confirmació de la contras"),
  });
// #end

//#methods
 const existingEmail = async (email) => {
    const result = await useFetch('http://localhost:4000/api/users', { method: 'GET' })
   return result.data.value.body.find(data => data.email === email)
  };
//#end

//#events
  const onSubmit = async () => {
    dataUser.id = 0
    try{
        await useFetch('http://localhost:4000/api/users', { method: 'POST', body: JSON.stringify(dataUser),  headers: { Accept: "application/json" } })
        router.back()
    }catch(error){
        console.error(error)
    }
  }
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
//#end

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
    .button{
        padding: 0.5rem;
        border: 1px solid;
        border-radius: 0.3rem;
        color: #dbdbdb;
    }
    .img-preview{
      img{
        min-width: 80px;
        height: 80px;
        object-fit: fill;
        border-radius: 50%;
        position: absolute;
        top: 1rem;
        right: 2rem;
      }
    }
    .file-custom{
      text-align: center;
      padding: 0.5rem;
      margin-right: 2rem;
      border-radius: 0.3rem;
      color: #dbdbdb;
      width: 106%;
      background-color: #1c1e21;
      box-shadow: inset 0 0.0625em 0.225em 0.032222em rgba(10, 10, 10, 0.06);
      margin-bottom: 1rem;
      margin-top: 0.5rem;
      cursor: pointer;
      filter: sepia();
    }
  }
  </style>
  