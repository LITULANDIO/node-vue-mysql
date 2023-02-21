<template>
    <span v-if="isLoading" style="background-color: yellow; color: red">LOADING...</span>
    <div v-else  v-for="guest in guests">
        <div id="guest" class="flex">
            {{ guest.name }}
        </div>
    </div>
</template>

<script setup>
//# props
const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false
      },
    guests: {
        type: Array,
        required: true
    }
})
//#end
</script>

<style lang="scss" scoped>
#guest{
    background-image: url('/mysterious.png');
    background-position-x: center;
    background-size: cover;
    width: 8.7rem;
    height: 8.7rem;
    object-fit: revert-layer;
    opacity: 0.9;
    filter: sepia();
    border-radius: 15px;
    padding: 15px;
    margin: 5px;
}
</style>