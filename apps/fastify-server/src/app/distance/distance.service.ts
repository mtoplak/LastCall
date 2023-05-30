import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import fetch from 'node-fetch';
import { SellersRepository } from '../sellers/sellers.repository';
import { OrdersRepository } from '../orders/orders.repository';

@Injectable()
export class DistanceService {
  constructor(
    private readonly sellersRepository: SellersRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async calculateDistance(
    sellerEmail: string,
    orderId: string,
  ): Promise<number> {
    const earthRadiusKm = 6371;

    const seller = await this.sellersRepository.findOne({ email: sellerEmail });
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }
    const order = await this.ordersRepository.findOne({ _id: orderId });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const sellerCoordinates = seller.coordinates; //coordinates is an array [lat, lon]
    const orderCoordinates = order.coordinates;

    const [lat1, lon1] = sellerCoordinates;
    const [lat2, lon2] = orderCoordinates;

    const firstLat = await this.degreesToRadians(lat1);
    const secondLat = await this.degreesToRadians(lat2);
    const dLat = await this.degreesToRadians(lat2 - lat1);
    const dLon = await this.degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(firstLat) *
        Math.cos(secondLat) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c;

    if (!distance) {
      throw new BadRequestException('Could not calculate distance');
    }
    return distance;
  }

  async calculateAirDistance(
    sellerEmail: string,
    orderCoordinates: number[],
  ): Promise<number> {
    const earthRadiusKm = 6371;

    const seller = await this.sellersRepository.findOne({ email: sellerEmail });
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    const sellerCoordinates = seller.coordinates;

    const [lat1, lon1] = sellerCoordinates;
    const [lat2, lon2] = orderCoordinates;

    const firstLat = await this.degreesToRadians(lat1);
    const secondLat = await this.degreesToRadians(lat2);
    const dLat = await this.degreesToRadians(lat2 - lat1);
    const dLon = await this.degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(firstLat) *
        Math.cos(secondLat) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c;

    if (!distance) {
      throw new BadRequestException('Could not calculate distance');
    }
    return distance;
  }

  async degreesToRadians(degrees: number): Promise<number> {
    return degrees * (Math.PI / 180);
  }
}
