import { IBuyer } from "models/buyer";

export const sampleBuyer1: IBuyer = {
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    legalPerson: false,
    address: '123 Main St',
    city: 'New York',
    country: 'USA',
    phone: '123-456-7890',
    targetedMarket: 'Global',
    title: 'Mr.',
    registerNumber: 98765,
    orders: [],
    basket: [],
};

export const sampleBuyer2: IBuyer = {
    name: 'Janw',
    surname: 'Doe',
    email: 'jane.doe@example.com',
    legalPerson: true,
    address: '123 Main St',
    city: 'New York',
    country: 'USA',
    phone: '123-456-7890',
    targetedMarket: 'Global',
    title: 'Mrs.',
    registerNumber: 98765,
    orders: [],
    basket: [],
};


