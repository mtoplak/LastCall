import { Mock } from 'ts-mockery';
import { Product } from './product.model';
import { ProductCategory } from './product-category.enum';
import { ProductMapper } from './product.mapper';
import { sampleSeller } from '../sellers/seller.mock';
import { ProductResponse } from 'src/data.response';

const sampleProduct = Mock.of<Product>({
    id: "1",
    title: 'Sample Product',
    drinkCategory: ProductCategory.BEER,
    packaging: 'Bottle',
    size: '500ml',
    price: 2.99,
    stock: 100,
    seller: sampleSeller,
    actualPrice: 2.99,
    discount: 0,
    picture: 'sample-product.jpg',
  });

  const responseProduct = Mock.of<ProductResponse>({
    id: "1",
    title: 'Sample Product',
    drinkCategory: ProductCategory.BEER,
    packaging: 'Bottle',
    size: '500ml',
    price: 2.99,
    stock: 100,
    seller: sampleSeller,
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
  
    it('should map a Product to a ProductResponse', () => {
      const response = productMapper.mapToResponse(sampleProduct);
      expect(response).toStrictEqual(responseProduct);
    });
  });