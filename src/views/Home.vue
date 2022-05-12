<template>
    <div class="main">
        <Converter/>
    </div>
</template>

<script>
import Converter from '@/components/Converter.vue';

export default {
    components: {
        Converter
    },
}
</script>

<style lang="scss">
.main {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px 0;
}
</style>
