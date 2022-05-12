<template>
    <div class="converter-wrapper">
        <ConverterInput
            :value="cryptoAmount"
            :selectOptions="[]"
            @onInput="onCryptoInput"
        />
        <div class="equal-sign">=</div>
        <ConverterInput
            :value="fiatPrice"
            :selectOptions="[]"
            @onInput="onFiatInput"
        />
    </div>
</template>

<script>
import ConverterInput from '@/components/ConverterInput.vue';
import { fetchTickerPair } from '@/api';

const TICKER_RATE = 3000;
const FIAT_INPUT_KEY = 'fiat';
const CRYPTO_INPUT_KEY = 'crypto';

export default {
    name: 'Converter',
    components: {
        ConverterInput
    },
    data() {
        return {
            cryptoAmount: 1,
            fiatPrice: 0,
            cryptoCode: 'BTC',
            fiatCode: 'USD',
            tickerInfo: null,
            activeInput: CRYPTO_INPUT_KEY,
        }
    },
    mounted() {
        this.fetchTickerPair();
        setInterval(() => this.fetchTickerPair(), TICKER_RATE);
    },
    methods: {
        onFiatInput(value) {
            this.fiatPrice = value;
            this.activeInput = FIAT_INPUT_KEY;
            this.updateCryptoAmount();
        },
        onCryptoInput(value) {
            this.cryptoAmount = value;
            this.activeInput = CRYPTO_INPUT_KEY;
            this.updateFiatPrice();
        },
        updateFiatPrice() {
            const price = this.cryptoAmount * (this.tickerInfo?.a[0] ?? 0);
            this.fiatPrice = price.toFixed(2);
        },
        updateCryptoAmount() {
            const amount = this.fiatPrice / (this.tickerInfo?.a[0] ?? 0);
            this.cryptoAmount = amount.toFixed(8);
        },
        updateInputsOnTicker() {
            if (this.activeInput === FIAT_INPUT_KEY) {
                this.updateCryptoAmount();
            } else {
                this.updateFiatPrice();
            }
        },
        async fetchTickerPair() {
            this.tickerInfo = await fetchTickerPair(this.cryptoCode, this.fiatCode);
            this.updateInputsOnTicker();
        },
    },
}
</script>

<style lang="scss" scoped>
.converter-wrapper {
    display: flex;
    align-items: center;
}
.equal-sign {
    font-size: 48px;
    font-weight: 700;
    margin: 0 40px;
    color: #fff;
}
</style>
