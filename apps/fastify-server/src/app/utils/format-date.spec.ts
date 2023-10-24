import { formatDate } from "./format-date.utils";


describe('formatDate', () => {
  it('should format the date correctly', () => {
    const sampleDate = new Date('2023-10-15');

    const formattedDate = formatDate(sampleDate);

    expect(formattedDate).toBe('15/10/2023');
  });

  it('should handle invalid input', () => {
    const formattedDate = formatDate(new Date('invalid date'));

    expect(formattedDate).toBe('Invalid Date');
  });

});