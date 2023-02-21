<template>
    <div class="button" @click="onClicked"><span>{{ label }}</span></div>
</template>

<script setup>

//# props
const props = defineProps({
    label: {
        type: String,
        default: ''
      }
})
//#end

//# emits
const emit = defineEmits(['onClicked'])

const onClicked = () => emit("onClicked")
//#
</script>

<style lang="scss" scoped>
.button{
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
</style>