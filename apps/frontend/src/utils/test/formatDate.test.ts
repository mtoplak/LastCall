import { formatDate } from '../formatDate';

describe('formatDate function', () => {
	it("should format a date as a string with the format 'day/month/year'", () => {
		const date = new Date('2022-01-01T00:00:00.000Z');
		const formattedDate = formatDate(date);
		expect(formattedDate).toBe('1. 1. 2022');
	});
});
