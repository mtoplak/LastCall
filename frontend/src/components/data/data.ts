export interface Drinks {
  id: number;
  name: string;
  img: string;
  price: number;
  type: string;
  seller: string;
}

export const drinks: Drinks[] = [
  {
    id: 1,
    name: "Coca-Cola",
    img: "../../assets/images/homepage.jpg",
    price: 100,
    type: "Coca-Cola",
    seller: "Juan Perez",
  },

  {
    id: 2,
    name: "Pepsi",
    img: "../../assets/images/homepage.jpg",
    price: 100,
    type: "Pepsi",
    seller: "Juan Perez",
  },
  {
    id: 3,
    name: "Fanta",
    img: "../../assets/images/homepage.jpg",
    price: 100,
    type: "Fanta",
    seller: "Juan Perez",
  },
];
