<template>
    <div class="input-wrapper">
        <input
            type="number"
            class="converter-input"
            :value="value"
            :placeholder="placeholder"
            @input="$emit('on-input', $event.target.valueAsNumber)"
        >
        <div class="option-toggle"></div>
    </div>
</template>

<script>
export default {
    name: 'ConverterInput',
    props: {
        value: {
            type: [String, Number],
            default: '',
            required: false,
        },
        placeholder: {
            type: String,
            default: '0',
            required: false,
        },
        selectOptions: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
        };
    },
}
</script>

<style lang="scss" scoped>
.converter-input {
    border: 0;
    background-color: transparent;
    border-bottom: 4px solid #fff;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    padding: 8px;
    outline: none;
    &::placeholder {
        color: #fff;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    &[type=number] {
        -moz-appearance: textfield;
    }
}
</style>
