import { BuyerResponse } from "src/data.response";
import { Mock } from "ts-mockery";
import { Buyer } from "./buyers.model";

export const sampleBuyer = Mock.of<Buyer>({
    id: '1',
    name: 'John',
    surname: 'Doe',
    legalPerson: true,
    title: 'Mr.',
    registerNumber: 12345,
    targetedMarkets: ['Market1', 'Market2'],
    address: '123 Main St',
    city: 'City',
    country: 'Country',
    phone: '123-456-7890',
    email: 'john@example.com',
    orders: [],
    cart: [],
  });
  
  export const responseBuyer = Mock.of<BuyerResponse>({
      id: '1',
      name: 'John',
      surname: 'Doe',
      legalPerson: true,
      title: 'Mr.',
      registerNumber: 12345,
      targetedMarkets: ['Market1', 'Market2'],
      address: '123 Main St',
      city: 'City',
      country: 'Country',
      phone: '123-456-7890',
      email: 'john@example.com',
      orders: [],
      cart: [],
  });