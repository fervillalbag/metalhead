import { Description } from "./description";

export type Plan = {
  id: string;
  name: string;
  price: number;
  url: string;
  items: [];
  createdAt: string;
};
