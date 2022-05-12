<template>
    <Home/>
</template>

<script>
import Home from '@/views/Home.vue';

export default {
    components: {
        Home
    },
}
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body {
    background: #201f2c;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
