import { getCurrentDate } from '../getCurrentDate';

describe('getCurrentDate function', () => {
	it("should return the current date in the format 'YYYY-MM-DD'", () => {
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth() + 1;
		const day = currentDate.getDate();

		const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${
			day < 10 ? '0' + day : day
		}`;

		expect(getCurrentDate()).toBe(formattedDate);
	});
});
