import { SellerMapper } from './seller.mapper';
import { responseSeller, sampleSeller } from './seller.mock';

describe('SellerMapper', () => {
    let sellerMapper: SellerMapper;

    beforeEach(() => {
        jest.clearAllMocks();
        sellerMapper = new SellerMapper();
    });

    it('should map a Seller to a SellerResponse', () => {
        const response = sellerMapper.mapToResponse(sampleSeller);
        expect(response).toStrictEqual(responseSeller);
    });
});