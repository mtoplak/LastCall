import { IDrink } from 'models/drink';
import { calculateTotalPrice } from 'utils/sumOfPrices';
import { sampleDrink1, sampleDrink2, sampleDrink3, products } from './mocks/drink.mock';

const expectedTotalPrice = sampleDrink1.actualPrice + sampleDrink2.actualPrice + sampleDrink3.actualPrice;

describe('calculateTotalPrice', () => {
  it('calculates the total price of an array of products', () => {
    const totalPrice = calculateTotalPrice(products);

    expect(totalPrice).toBe(expectedTotalPrice);
  });

  it('returns 0 for an empty array', () => {
    const products: IDrink[] = [];
    const totalPrice = calculateTotalPrice(products);
    expect(totalPrice).toBe(0);
  });

  it('returns 0 for an array with products having a price of 0', () => {
    const products: IDrink[] = [
      {
        ...sampleDrink1,
        actualPrice: 0,
      },
      {
        ...sampleDrink2,
        actualPrice: 0,
      },
      {
        ...sampleDrink3,
        actualPrice: 0,
      },
    ];

    const totalPrice = calculateTotalPrice(products);
    expect(totalPrice).toBe(0);
  });
});
