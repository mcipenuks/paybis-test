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
    beforeMount() {
        this.setLocaleFromRoute();
    },
    methods: {
        setLocaleFromRoute() {
            setTimeout(() => {
                this.$root.$i18n.locale = this.$route.params?.lang ?? 'en';
            }, 0)
        },
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';
</style>
