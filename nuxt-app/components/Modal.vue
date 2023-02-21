<template>
        <div v-if="show" class="overflow-modal"></div>
        <Transition>
        <section  v-if="show">
        <div class="modal w-10/12 max-w-md ">
            <div class="modal-header">
            <h2>{{ header }}</h2>
            <font-awesome-icon icon="fas fa-xmark" class="w-6 modal-close"  @click="onClose" />
            </div>
            <div class="modal-content">
            <slot></slot>
            </div>
        </div>
        </section>
    </Transition>
  </template>
  
  <script setup>

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
      },
      header: {
        type: String,
        default: ""
      }
})
const emit = defineEmits(['onClose'])

const onClose = () => emit("onClose")

</script>
  
  <style lang="scss" scoped>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    position: relative;
    .modal {
      border: 1px solid;
      border-radius: 8px;
      padding: 15px;
      position: fixed;
      top: 50%;
      z-index: 9999;
      background: white;
      margin-top: 0rem; //-15rem;
      &-header {
        display: flex;
        justify-content: space-between;
      }
      &-content{
        padding: 1rem 2.5rem 0rem 0.5rem;
        height: auto;
      }
      &-close {
        cursor: pointer;
        &:hover {
          color: grey;
          cursor: pointer;
        }
      }
    }
  }
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.overflow-modal{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: black;
    opacity: .5;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
  </style>
  