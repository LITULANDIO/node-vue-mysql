<template>
    <nav>
        <div class="flex justify-between">
            <div class="text-white flex items-center text-1xl"><span>Friendly</span><span class="text-2xl ml-3 icon">🎭</span></div>
            <div class="text-white flex items-center text-1xl mr-8">
                <span class="mr-3">Hola <span class="text-1xl icon mr-1">👋</span> {{ user }}</span>
                <font-awesome-icon @click="onLogout" icon="fa-solid fa-right-from-bracket" class="text-1xl cursor-pointer" />
            </div>
        </div>
    </nav>
</template>

<script setup>
const props = defineProps({
    user:{
        type: String,
        required: true
    }
})
const emit = defineEmits(['logout'])
const onLogout = () => emit('logout')
</script>

<style lang="scss" scoped>
nav{
    position: fixed;
    margin-top: -5rem;
    padding: 1rem;
    width: 100%;
    background-color: #1c1e21;
    border-bottom: 1px solid rgba(84, 84, 84, .48);
    .icon{
        filter: sepia(1);
    }
}
</style>