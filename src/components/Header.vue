<template>
    <div class="header">
        <LocaleSwitcher/>
    </div>
</template>

<script>
import LocaleSwitcher from '@/components/LocaleSwitcher.vue';
export default {
   components: {
       LocaleSwitcher,
   }
}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
