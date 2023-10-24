import { SellerResponse } from "src/data.response";
import { Mock } from "ts-mockery";
import { SellerType } from "./seller-type.enum";
import { Seller } from "./sellers.model";

export const sampleSeller = Mock.of<Seller>({
    id: '1',
    name: 'Seller Name',
    surname: 'Seller Surname',
    title: 'Seller Title',
    address: '123 Main St',
    city: 'Example City',
    country: 'Example Country',
    registerNumber: 12345,
    companyType: SellerType.WINERY,
    targetedMarkets: ['Market1', 'Market2'],
    phone: '555-123-4567',
    website: 'www.example.com',
    email: 'seller@example.com',
    orders: ['order1', 'order2'],
    products: ['product1', 'product2'],
    coordinates: [12.345, 67.890],
    maxDistance: 10,
    minPrice: 5.0,
    deliveryCost: 2.0,
    scores: ['4', '5'],
    averageScore: 4.5
});

export const responseSeller = Mock.of<SellerResponse>({
    id: '1',
    name: 'Seller Name',
    surname: 'Seller Surname',
    title: 'Seller Title',
    address: '123 Main St',
    city: 'Example City',
    country: 'Example Country',
    registerNumber: 12345,
    companyType: SellerType.WINERY,
    targetedMarkets: ['Market1', 'Market2'],
    phone: '555-123-4567',
    website: 'www.example.com',
    email: 'seller@example.com',
    orders: ['order1', 'order2'],
    products: ['product1', 'product2'],
    coordinates: [12.345, 67.890]
});