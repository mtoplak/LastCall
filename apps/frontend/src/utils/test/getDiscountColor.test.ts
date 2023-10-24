import { getDiscountColor } from '../getDiscountColor';

describe('getDiscountColor function', () => {
	it("should return 'black' for a discount of 0", () => {
		const discount = 0;
		const color = getDiscountColor(discount);
		expect(color).toBe('black');
	});

	it("should return 'error' for a discount other than 0", () => {
		const discount = 10;
		const color = getDiscountColor(discount);
		expect(color).toBe('error');
	});
});
