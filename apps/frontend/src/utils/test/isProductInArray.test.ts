import { isProductInArray } from '../isProductInArray';

describe('isProductInArray function', () => {
	it('should return true if the product ID is found in the array', () => {
		const products = [
			{ product: { _id: '1' }, quantity: 1 },
			{ product: { _id: '2' }, quantity: 2 },
			{ product: { _id: '3' }, quantity: 3 },
		];
		const productId = '2';
		const result = isProductInArray(products, productId);
		expect(result).toBe(true);
	});

	it('should return false if the product ID is not found in the array', () => {
		const products = [
			{ product: { _id: '1' }, quantity: 1 },
			{ product: { _id: '2' }, quantity: 2 },
			{ product: { _id: '3' }, quantity: 3 },
		];
		const productId = '4';
		const result = isProductInArray(products, productId);
		expect(result).toBe(false);
	});

	it('should return false if the array is empty', () => {
		const products: any = [];
		const productId = '1';
		const result = isProductInArray(products, productId);
		expect(result).toBe(false);
	});

	it('should return false if the product ID is undefined', () => {
		const products = [
			{ product: { _id: '1' }, quantity: 1 },
			{ product: { _id: '2' }, quantity: 2 },
			{ product: { _id: '3' }, quantity: 3 },
		];
		const productId = undefined;
		const result = isProductInArray(products, productId);
		expect(result).toBe(false);
	});
});
