export const currencyFormatter = (number) => {
    if (Number.isNaN(number)) {
        return '';
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return formatter.format(number).substring(1);
};
