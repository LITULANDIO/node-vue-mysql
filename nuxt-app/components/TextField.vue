
<template>
  <div class="field">
    <div class="field-body">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <VField :name="name" :rules="`required|${mame}`" v-slot="{ field, meta, errors }">
            <input
              v-bind="field"
              class="input"
              :style="{'marginBottom': !meta.valid && meta.touched ? '0' : '1rem'}"
              :placeholder="placeholder"
              autocomplete="off"
              :type="type"
              :name="name"
              @input="handleValue($event)" />
            <span class="icon is-small is-left">
              <font-awesome-icon :icon="icon" />
            </span>
            <span
              class="icon is-small is-right"
              v-if="meta.valid && meta.touched && check"
            >
              <font-awesome-icon icon="fas fa-check has-text-success" class="is-success" />
            </span>
            <span
              class="icon is-small is-right"
              v-else-if="!meta.valid && meta.touched && check"
            >
              <font-awesome-icon icon="fas fa-x has-text-danger" class="is-danger" />
            </span>
            <VErrorMessage :name="name" as="div" class="help is-danger text-xs" />
          </VField>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
  },
  placeholder: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  modelValue: {
        type: [String, Object],
        required: true
    },
  check: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:modelValue'])

const handleValue = (event) => {
    emit('update:modelValue', event.target.value)
}
</script>

<style lang="scss" scoped>
.control.has-icons-left .icon, .control.has-icons-right .icon {
    color: #dbdbdb;
    height: 2.5em;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 2.5em;
    z-index: 4;
}
.control.has-icons-right .icon.is-right {
    right: -2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0.5rem;
}
.control.has-icons-left .icon.is-left {
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0.5rem;
}

.field-body{
  display: flex;
    flex-basis: 0;
    flex-grow: 5;
    flex-shrink: 1;
}
.field-body>.field:not(.is-narrow) {
    flex-grow: 1;
}
.control{

  clear: both;
    font-size: 1rem;
    position: relative;
    text-align: inherit;
}
.input{
  box-shadow: inset 0 0.0625em 0.225em 0.032222em rgb(10 10 10 / 6%);
  max-width: 100%;
  width: 100%;
  height: 2.5rem;
  margin-top: 0.5rem;
  padding-left: 2.3rem;
  outline: none;
  border-radius: 0.2rem;
  color: grey;
}
.is-success{
  color: greenyellow;
}
.is-danger{
  color: red;
  //border: 1px solid red;

}
</style>


<!-- <template>
    <div style="display:block">
    <VField 
        :typw="inputType" 
        :name="name" 
        :rules="isRequired" 
        :placeholder="placeholder" 
        @input="handleValue($event)" />
    <VErrorMessage :name="placeholder" class="help is-danger" />
    </div>

</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    inputType: {
        type: String,
        default: 'text'
    },
    name: {
        type: String
    },
    placeholder: {
        type: String
    },
    modelValue: {
        type: [String, Object],
        required: true
    }
})
const emit = defineEmits(['update:modelValue'])


const handleValue = (event) => {
    emit('update:modelValue', event.target.value)
}
const isRequired = (value) => {
    if (value && value.trim()) {
        return true
    }
    return 'This is required'
}
</script>

<style lang="scss" scoped>
input{
    height: 2rem;
    margin-bottom: 0.5rem;
}
.is-danger{
    color: red;
    font-size: 0.7rem;
    display: block;
}
</style> -->