import { currencyFormatter } from '@/helpers'

describe('number currency formatting', () => {
    it('should return empty string if not a number is provided', () => {
        expect(currencyFormatter(NaN)).toEqual('');
    });

    it('should return formatted number as string if a number is provided', () => {
        expect(currencyFormatter(24850.90)).toEqual('24,850.90');
    });

    it('should return formatted number as string if a string is provided', () => {
        expect(currencyFormatter('24850.90')).toEqual('24,850.90');
    });
});
