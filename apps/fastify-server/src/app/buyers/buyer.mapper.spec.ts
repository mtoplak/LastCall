import { BuyerMapper } from './buyer.mapper';
import { sampleBuyer, responseBuyer } from './buyer.mock';

describe('BuyerMapper', () => {
  let buyerMapper: BuyerMapper;

  beforeEach(() => {
    jest.clearAllMocks();
    buyerMapper = new BuyerMapper();
  });

  it('should map a Buyer to a BuyerResponse', () => {
    const response = buyerMapper.mapToResponse(sampleBuyer);
    expect(response).toStrictEqual(responseBuyer);
  });
});