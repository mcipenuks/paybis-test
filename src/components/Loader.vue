<template>
    <div class="spinner"></div>
</template>

<style lang="scss" scoped>
.spinner {
    width: 24px;
    height: 24px;
    top: calc(50% - 12px);
    right: 0;
    border-radius: 100%;
    border: 2px solid #fff;
    border-right: 2px solid transparent;
    animation: spin .5s linear infinite;
}

@keyframes spin {
    to {transform: rotate(360deg);}
}

</style>
