<template>
    <Header/>
    <router-view/>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
    components: {
        Header
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';
</style>
