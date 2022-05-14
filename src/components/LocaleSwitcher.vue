<template>
    <div class="language-switcher">
        <div
            ref="dropdownToggle"
            class="language-current toggle-arrow"
            @click="toggleDropdown"
        >
            {{ current.name }}
        </div>
        <div
            class="language-dropdown"
            v-show="isDropdownOpen"
            v-click-outside="onDropdownOutsideClick"
        >
            <div
                class="language-item"
                v-for="language in visibleLanguages"
                :key="language.name"
                @click="onLanguageSelect(language)"
            >
                {{ language.name }}
            </div>
        </div>
    </div>
</template>

<script>
import { LANGUAGES } from '@/constants';

export default {
    data() {
        return {
            current: LANGUAGES[0],
            isDropdownOpen: false,
        }
    },
    computed: {
        visibleLanguages() {
            return LANGUAGES.filter(language => language.code !== this.current.code);
        },
    },
    mounted() {
        this.setDefaultCurrent();
    },
    methods: {
        onLanguageSelect(language) {
            this.current = language;
            this.isDropdownOpen = false;
            this.setCurrentLocale(language.code);
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        onDropdownOutsideClick(event) {
            if (!(event.target == this.$refs.dropdownToggle)) {
                this.isDropdownOpen = false;
            }
        },
        setCurrentLocale(locale) {
            this.$root.$i18n.locale = locale;
            this.$router.push({ name: 'home', params: { lang: locale } })
        },
        setDefaultCurrent() {
            setTimeout(() => {
                const language = LANGUAGES.find(language => language.code === this.$i18n.locale);
                if (language) {
                    this.current = language;
                }
            }, 0);
        },
    }
}
</script>

<style lang="scss" scoped>
.language-switcher {
    position: relative;
}
.language-current {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
}
.language-dropdown {
    $width: 120px;
    position: absolute;
    width: $width;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    transition: opacity .2s;
}
.language-item {
    padding: 8px 10px;
    transition: all .2s;
    font-size: 18px;
    cursor: pointer;
    &:hover {
        background: #ececec;
    }
}
</style>
