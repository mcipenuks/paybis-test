<template>
    <div class="converter-group">
        <div class="input-group">
            <div
                ref="dropdownToggle"
                class="dropdown-toggle toggle-arrow"
                :class="{ 'active': isDropdownOpen }"
                @click="toggleDropdown"
            >
                <span class="active-currency">{{ activeCurrency.code }}</span>
            </div>
            <input
                type="number"
                class="converter-input"
                :disabled="isLoading"
                :value="value"
                :placeholder="placeholder"
                step="0.01"
                @input="onInput($event.target.valueAsNumber)"
            >
            <Loader v-show="isLoading"/>
        </div>
        <div
            class="list-dropdown"
            v-show="isDropdownOpen"
            v-click-outside="onDropdownOutsideClick"
        >
            <div class="search-input-wrapper">
                <input v-model="search" type="text" placeholder="Search..." class="search-input">
            </div>
            <div class="list">
                <div
                    v-for="currency in searchedCurrencyList"
                    class="list-item"
                    :class="{ 'active': isActiveCurrency(currency) }"
                    :key="currency.code"
                    @click="onCurrencySelect(currency)"
                >
                    <span class="currency-code">{{ currency.code }}</span>
                    <span class="currency-name">{{ currency.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/common/Loader.vue';

export default {
    name: 'ConverterInput',
    components: {
        Loader
    },
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
        currencyList: {
            type: Array,
            required: true,
        },
        isLoading: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    data() {
        return {
            search: '',
            activeCurrency: null,
            isDropdownOpen: false
        };
    },
    created() {
        this.setDefaultActiveCurrency();
    },
    computed: {
        searchedCurrencyList() {
            return this.currencyList.filter(currency => {
                const searchQuery = this.search.toLowerCase();
                const codeMatched = currency.code.toLowerCase().includes(searchQuery);
                const nameMatched = currency.name.toLowerCase().includes(searchQuery);

                return codeMatched || nameMatched;
            });
        },
    },
    methods: {
        onInput(value) {
            this.$emit('on-input', value);
        },
        onCurrencySelect(currency) {
            this.activeCurrency = currency;
            this.search = '';
            this.isDropdownOpen = false;
            this.$emit('on-currency-select', currency);
        },
        isActiveCurrency(currency) {
            return this.activeCurrency.code === currency.code;
        },
        setDefaultActiveCurrency() {
            if (!this.activeCurrency) {
                this.activeCurrency = this.currencyList[0];
            }
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        onDropdownOutsideClick(event) {
            if (!(event.target == this.$refs.dropdownToggle)) {
                this.isDropdownOpen = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.converter-group {
    position: relative;
}
.converter-input {
    width: 100%;
    border: 0;
    background-color: transparent;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    padding: 8px;
    outline: none;
    transition: all .2s;
    &:disabled {
        opacity: 0.5;
    }
    &::placeholder {
        color: #9d9d9d;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    &[type=number] {
        -moz-appearance: textfield;
    }
}
.input-group {
    display: flex;
    align-items: center;
    border-bottom: 4px solid #8f8acd;
    width: 350px;
    &:deep(.spinner) {
        flex-shrink: 0;
    }
}
.dropdown-toggle {
    cursor: pointer;
    min-width: 80px;
    background: #8f8acd;
    border-radius: 4px;
    padding: 2px 8px;
    display: flex;
    align-items: center;
}
.active-currency {
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    pointer-events: none;
}
.list-dropdown {
    z-index: 10;
    position: absolute;
    background: #fff;
    width: 100%;
    top: 100%;
    left: 0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}
.list {
    max-height: 300px;
    overflow-y: auto;
}
.list-item {
    padding: 8px;
    cursor: pointer;
    &:hover {
        background: #d6c8ff;
    }
    &.active {
        background: #bba4ff;
        .currency-code,
        .currency-name {
            color: #fff;
        }
    }
}
.currency-code {
    display: inline-block;
    font-weight: 700;
    margin-right: 8px;
    min-width: 35px;
}
.currency-name {
    font-size: 14px;
    font-weight: 500;
    color: #5e5e5e;
}
.search-input-wrapper {
    padding: 6px;
}
.search-input {
    padding: 8px;
    width: 100%;
}
</style>
