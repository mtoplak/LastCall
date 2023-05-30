import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order } from './order.model';
import { OrdersRepository } from './orders.repository';
import { CreateUpdateOrderDto } from './createUpdateOrder.dto';
import { SuccessResponse } from 'src/data.response';
import { Cart } from '../buyers/buyers.model';
import { ProductsService } from '../products/products.service';
import { CartService } from '../cart/cart.service';
import { MailService } from '../mailer/mail.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
    private readonly mailService: MailService,
  ) { }

  async addOrder(
    orderData: CreateUpdateOrderDto,
    productData: Cart[],
    sellerEmail: string,
    buyerEmail: string,
  ): Promise<Order> {
    const meetsMinPriceRequirements = await this.productsService.minPriceRequirements(sellerEmail, productData);
    if (!meetsMinPriceRequirements) {
      throw new BadRequestException(
        'Order does not meet the minimum price requirement',
      );
    }

    const removeFromStockResult = await this.productsService.removeFromStock(productData);
    if (removeFromStockResult === false) {
      throw new BadRequestException('Not enough stock for one or more products');
    }

    const order = await this.ordersRepository.create(
      orderData,
      productData,
      sellerEmail,
      buyerEmail,
    );

    // Send the order confirmation email
    this.mailService.sendOrderConfirmationEmail(buyerEmail, order, productData, sellerEmail); // brez await, da se ne čaka

    const productIds = productData.map((item) => item.productId);
    await this.cartService.deleteProductsFromCart(buyerEmail, productIds);
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.ordersRepository.find({});
  }

  async getSingleOrder(orderId: string): Promise<Order> {
    try {
      return await this.ordersRepository.findOne({ _id: orderId });
    } catch (err) {
      throw new NotFoundException('Could not get the order with id ' + orderId);
    }
  }

  async updateOrder(
    orderId: string,
    updatedOrderData: Partial<Order>,
  ): Promise<Order> {
    try {
      return await this.ordersRepository.findOneAndUpdate(
        { _id: orderId },
        updatedOrderData,
      );
    } catch (err) {
      throw new NotFoundException(
        'Failed to update the order with id: ' + orderId,
      );
    }
  }

  async removeOrder(orderId: string): Promise<SuccessResponse> {
    await this.ordersRepository.deleteOne({
      _id: orderId,
    });
    return { success: true };
  }
}
