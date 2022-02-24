import { Description } from "./description";

export type Products = {
  id?: string;
  name: string;
  image: string;
  code: number;
  quantity: number;
  price: number;
  createdAt?: string;
  description?: Description;
  qty?: number | undefined;
};

export type ProductInfo = {
  id: string;
  title: string;
  createdAt: string;
  description: Description;
};
