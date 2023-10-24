import { getOrderStatusColor } from '../getOrderStatusColor';

describe('getOrderStatusColor function', () => {
	it("should return 'primary' for status 'Accepted'", () => {
		const status = 'Accepted';
		const color = getOrderStatusColor(status);
		expect(color).toBe('primary');
	});

	it("should return 'orange' for status 'In-Transit'", () => {
		const status = 'In-Transit';
		const color = getOrderStatusColor(status);
		expect(color).toBe('orange');
	});

	it("should return 'green' for status 'Delivered'", () => {
		const status = 'Delivered';
		const color = getOrderStatusColor(status);
		expect(color).toBe('green');
	});

	it("should return 'error' for status 'Rejected'", () => {
		const status = 'Rejected';
		const color = getOrderStatusColor(status);
		expect(color).toBe('error');
	});

	it("should return 'inherit' for an unknown status", () => {
		const status = 'Unknown';
		const color = getOrderStatusColor(status);
		expect(color).toBe('inherit');
	});
});
