<template>
    <section id="groups">
        <span v-if="isLoading" style="background-color: yellow; color: red">LOADING...</span>
        <div v-else class="box-group" v-for="group in groups" :key="group.id">
            <div @click="onClicked(group)">{{ group.name }}</div>
        </div>
    </section>
</template>

<script setup>
//# props
const props = defineProps({
    groups: {
        type: Array,
        required: true
      },
    isLoading: {
        type: Boolean,
        default: false
    }
})
//#end

//# emits
const emit = defineEmits(['onClicked'])

const onClicked = (group) => emit("onClicked", group)
//#

</script>

<style lang="scss" scoped>
#groups{
    max-height: 38rem;
    overflow: scroll;
    margin-top: 2rem;
    .box-group{
    min-width: 15rem;
    margin-bottom: 0.5rem;
    text-align: center;
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
}
</style>