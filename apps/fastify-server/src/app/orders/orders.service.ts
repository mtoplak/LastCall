import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order } from './order.model';
import { OrdersRepository } from './orders.repository';
import { CreateUpdateOrderDto } from './create-update-order.dto';
import { SuccessResponse } from 'src/data.response';
import { Cart } from '../buyers/buyers.model';
import { ProductsService } from '../products/products.service';
import { CartService } from '../cart/cart.service';
import { MailService } from '../mailer/mail.service';
import { SellersService } from '../sellers/sellers.service';
import { OrderStatus } from './order-status.enum';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
    private readonly mailService: MailService,
    private readonly sellersService: SellersService
  ) { }

  async checkPrice(
    productData: Cart[],
    sellerId: string
    ): Promise<boolean> {
    const seller = await this.sellersService.getSingleSeller(sellerId);
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }
    const meetsMinPriceRequirements =
      await this.productsService.minPriceRequirements(seller.email, productData);
    if (!meetsMinPriceRequirements) {
      return false;
    }
    return true;
  }

  async addOrder(
    orderData: CreateUpdateOrderDto,
    productData: Cart[],
    sellerEmail: string,
    buyerEmail: string,
  ): Promise<Order> {
    
    const seller = await this.sellersService.getSingleSellerByEmail(sellerEmail);
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    const removeFromStockResult = await this.productsService.removeFromStock(
      productData,
    );
    if (removeFromStockResult === false) {
      throw new BadRequestException(
        'Not enough stock for one or more products',
      );
    }

    const order = await this.ordersRepository.create(
      orderData,
      productData,
      sellerEmail,
      buyerEmail,
    );

    this.mailService.sendOrderConfirmationEmail(buyerEmail, order, productData, sellerEmail); // brez await, da se ne čaka

    const productIds = productData.map((item) => item.productId);
    await this.cartService.deleteProductsFromCart(buyerEmail, productIds);
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    try {
    return await this.ordersRepository.find({});
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    throw error;
  }
  }

  async getSingleOrder(orderId: string): Promise<Order> {
    try {
      return await this.ordersRepository.findOne({ _id: orderId });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async updateOrder(
    orderId: string,
    updatedOrderData: Partial<Order>,
  ): Promise<Order> {
    try {
      if (updatedOrderData.status === OrderStatus.DELIVERED) {
        updatedOrderData.actualDateOfDelivery = new Date();
      }
      const order = await this.getSingleOrder(orderId);
      this.mailService.sendOrderStatusUpdateEmail(updatedOrderData.status, order);
      return await this.ordersRepository.findOneAndUpdate(
        { _id: orderId },
        updatedOrderData,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async removeOrder(orderId: string): Promise<SuccessResponse> {
    return await this.ordersRepository.deleteOne({
      _id: orderId,
    });
  }
  
}
