import { faker } from "@faker-js/faker";
import type { Product } from "./types";

export const getProduct = (): Product => {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
  };
};

type ProductsData = {
  products: Product[];
};

export const getProducts = (): ProductsData => {
  return {
    products: new Array(20).fill(null).map(() => getProduct()),
  };
};
