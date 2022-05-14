<template>
    <Header/>
    <router-view/>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
    components: {
        Header
    },
    mounted() {
        this.setLocaleFromRoute();
    },
    methods: {
        setLocaleFromRoute() {
            console.warn('App', this.$route);
        },
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';
</style>
