<template>
    <div v-if="isShow" class="searching">
        <ul>
        <li v-if="users.length === 0">No existeix l'usuari</li>
        <li @click="onClicked($event, user.id)" class="flex justify-start" v-for="user in users" :key="user.id">
            <img :src="user.photo" width="40" height="40"/>
            <div class="ml-3">{{ user.user }}</div>
        </li>
        </ul>
    </div>
    <div v-if="isGuest" class="exist-guest">Ja has afegit aquest usuari</div>
</template>

<script setup>
import { onUpdated } from 'vue'
//# props
const props = defineProps({
    users: {
        type: Array,
        required: true
      },
    guest: {
        type: Object,
        required: true
    },
    isShow: {
        type: Boolean,
        default: false
    },
    isGuest: {
        type: Boolean,
        default: false
    }

})
//#end

//# emits
const emit = defineEmits(['onClicked'])
const onClicked = ($event, user) => emit("onClicked", $event, user)
//#

//# cycle life
onUpdated(() => {
    if(props.guest.name === ''){
        props.isShow = false
    }
})
//#end

</script>

<style lang="scss" scoped>
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
.exist-guest{
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
  width: 105%;
}
</style>