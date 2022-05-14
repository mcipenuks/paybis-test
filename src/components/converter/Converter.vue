<template>
    <div>
        <div class="converter-title">{{ converterTitle }}</div>
        <div class="converter-wrapper">
            <ConverterInput
                :value="cryptoAmount"
                :currency-list="CRYPTO_CURRENCIES"
                @onInput="onCryptoInput"
                @onCurrencySelect="onCurrencySelect($event)"
            />
            <div class="equal-sign">=</div>
            <ConverterInput
                :value="fiatPrice"
                :formatted-value="formattedFiatPrice"
                :currency-list="FIAT_CURRENCIES"
                :is-loading="isLoading"
                has-formatted-input
                @onInput="onFiatInput"
                @onCurrencySelect="onCurrencySelect($event)"
            />
        </div>
        <div class="converter-disclaimer">{{ $t('converter.priceDisclaimer') }}</div>
    </div>
</template>

<script>
import ConverterInput from '@/components/converter/ConverterInput.vue';
// TODO: format input currency
import { currencyFormatter } from '@/helpers';
import { fetchTickerPair } from '@/api';
import { TICKER_RATE, INPUT_TYPE_FIAT, INPUT_TYPE_CRYPTO, CRYPTO_CURRENCIES, FIAT_CURRENCIES } from '@/constants';

export default {
    name: 'Converter',
    components: {
        ConverterInput
    },
    data() {
        return {
            CRYPTO_CURRENCIES,
            FIAT_CURRENCIES,
            cryptoAmount: 1,
            fiatPrice: 0,
            tickerInfo: null,
            activeInput: INPUT_TYPE_CRYPTO,
            cryptoCurrency: CRYPTO_CURRENCIES[0],
            fiatCurrency: FIAT_CURRENCIES[0],
            fetchInterval: null,
            isLoading: false,
        }
    },
    mounted() {
        this.startFetchInterval();
    },
    beforeDestroy() {
        clearInterval(this.fetchInterval);
    },
    computed: {
        converterTitle() {
            return this.$t('converter.cryptoToFiat', {
                crypto: this.cryptoCurrency.code,
                fiat: this.fiatCurrency.code,
            })
        },
        formattedFiatPrice() {
            return currencyFormatter(this.fiatPrice);
        },
    },
    methods: {
        onFiatInput(value) {
            this.fiatPrice = value;
            this.activeInput = INPUT_TYPE_FIAT;
            this.updateCryptoAmount();
        },
        onCryptoInput(value) {
            this.cryptoAmount = value;
            this.activeInput = INPUT_TYPE_CRYPTO;
            this.updateFiatPrice();
        },
        onCurrencySelect(currency) {
            this[currency.type+'Currency'] = currency;
            this.startFetchInterval();
        },
        updateFiatPrice() {
            const price = this.cryptoAmount * (this.tickerInfo?.a[0] ?? 0);
            this.fiatPrice = price;
        },
        updateCryptoAmount() {
            const amount = this.fiatPrice / (this.tickerInfo?.a[0] ?? 0);
            this.cryptoAmount = amount.toFixed(8);
        },
        updateInputsOnTicker() {
            if (this.activeInput === INPUT_TYPE_FIAT) {
                this.updateCryptoAmount();
            } else {
                this.updateFiatPrice();
            }
        },
        startFetchInterval() {
            clearInterval(this.fetchInterval);
            this.isLoading = true;
            this.fetchTickerPair();
            this.fetchInterval = setInterval(() => this.fetchTickerPair(), TICKER_RATE);
        },
        async fetchTickerPair() {
            this.tickerInfo = await fetchTickerPair(this.cryptoCurrency.code, this.fiatCurrency.code);
            this.isLoading = false;
            this.updateInputsOnTicker();
        },
    },
}
</script>

<style lang="scss" scoped>
.converter-title {
    font-size: 60px;
    font-weight: 700;
    text-align: center;
    color: #fff;
    margin-bottom: 100px;
}
.converter-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.converter-disclaimer {
    font-size: 12px;
    color: #adadad;
    margin-top: 10px;
}
.equal-sign {
    font-size: 48px;
    font-weight: 700;
    margin: 0 40px;
    color: #fff;
}
</style>
