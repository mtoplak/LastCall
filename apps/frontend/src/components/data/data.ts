import drink1 from "../../assets/images/cocacola.jpg";
import drink2 from "../../assets/images/pepsi.jpg";
import drink3 from "../../assets/images/fanta.jpg";

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
    img: drink1,
    price: 1,
    type: "Coca-Cola",
    seller: "Juan Perez",
  },

  {
    id: 2,
    name: "Pepsi",
    img: drink2,
    price: 1,
    type: "Pepsi",
    seller: "Juan Perez",
  },
  {
    id: 3,
    name: "Fanta",
    img: drink3,
    price: 0.5,
    type: "Fanta",
    seller: "Juan Perez",
  },
  {
    id: 4,
    name: "Coca-Cola",
    img: drink1,
    price: 1,
    type: "Coca-Cola",
    seller: "Juan Perez",
  },

  {
    id: 5,
    name: "Pepsi",
    img: drink2,
    price: 1,
    type: "Pepsi",
    seller: "Juan Perez",
  },
  {
    id: 6,
    name: "Fanta",
    img: drink3,
    price: 0.5,
    type: "Fanta",
    seller: "Juan Perez",
  },
];
