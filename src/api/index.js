export const fetchTickerPair = async(cryptoCode, fiatCode) => {
    try {
        const response = await fetch(`https://api.kraken.com/0/public/Ticker?pair=${cryptoCode}${fiatCode}`);
        const result = (await response.json()).result;

        return Object.values(result)[0];
    } catch (e) {
        console.warn(e);
    }
};
