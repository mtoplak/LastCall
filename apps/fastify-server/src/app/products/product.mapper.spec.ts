import { Mock } from 'ts-mockery';
import { Product } from './product.model';
import { ProductCategory } from './product-category.enum';
import { ProductMapper } from './product.mapper';

const sampleProduct = Mock.of<Product>({
    title: 'Sample Product',
    drinkCategory: ProductCategory.BEER,
    packaging: 'Bottle',
    size: '500ml',
    price: 2.99,
    stock: 100,
    seller: {
      name: 'Sample Seller',
      rating: 4.5,
      // itd.
    },
    actualPrice: 2.99,
    discount: 0,
    picture: 'sample-product.jpg',
  });

  const responseProduct = Mock.of<Product>({
    title: 'Sample Product',
    drinkCategory: ProductCategory.BEER,
    packaging: 'Bottle',
    size: '500ml',
    price: 2.99,
    stock: 100,
    seller: {
      name: 'Sample Seller',
      rating: 4.5,
      // itd.
    },
    actualPrice: 2.99,
    discount: 0,
    picture: 'sample-product.jpg',
  });

  describe('ProductMapper', () => {
    let productMapper: ProductMapper;
  
    beforeEach(() => {
      jest.clearAllMocks();
      productMapper = new ProductMapper();
    });
  
    it('should map a Buyer to a BuyerResponse', () => {
      const response = productMapper.mapToResponse(sampleProduct);
      expect(response).toStrictEqual(responseProduct);
    });
  });