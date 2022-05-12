Develop multilingual cryptocurrency converter SPA using vue.js
User should be able to select currency and market, enter amount and immediately get calculated value.
Since user has entered amount calculated value should be recalculated by interval or in real-time.
Example:
https://paybis.com/bitcoin-calculator/

Requirements:
input fiat (standard currency, USD or EUR) amount and select fiat currency
input cryptocurrency amount and select cryptocurrency
possibility change language (for example ENG/RUS)
rate limit 1 req./sec
calculate amounts by interval or in real-time (for example refresh rate once every 5 seconds)
Support at least 2 FIAT currencies and at least 3 Cryptocurrencies (i.e. EUR/USD and BTC/LTC/ETH)
UI/UX can be designed/developed according to own interpretation and desire
Basic Style/CSS to be applied, app should lk nice, according to own interpretation and desire

Default settings:
language is English,
page title is "BTC to USD"
fiat currency is "USD"
cryptocurrency is "BTC"
default cryptocurrency amount is 1 BTC
default rate (i.e. USD/BTC) refresh rate 5 sec

Data Source:
https://docs.kraken.com/rest/#operation/getTickerInformation
Use Kraken API to get realtime rates for various Fiat/Crypto pairs

UC1:
User opens application
App shows calculator screen with default settings
User selects fiat currency EUR and enters value 100 in fiat amount input field
App calculates crypto amount for cryptocurrency BTC using current market rates
App changes crypto amount input field value to current market rate (i.e. 0.00250278 BTC)
App changes crypto amount input field value after 5 second based on new rate (i.e. 0.00240588 BTC)

UC2:
User opens application
App shows calculator screen
User selects cryptocurrency LTC and enters value 100 in crypto amount input field
App calculates fiat amount for currency USD using Kraken market rates
App changes fiat amount input field value to current market rate (i.e. 17535 USD)
App changes fiat amount input field value after 5 seconds based on new rate (i.e. 17529 USD)

Bonus:
add SSR support
use WebSocket API
2 covering developed f-lity
