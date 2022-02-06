import { Description } from "./description";

export type ReviewInfo = {
  id: string;
  title: string;
  name: string;
  description: Description[];
  createdAt: string;
};

export type ReviewData = {
  id?: string;
  name: string;
  avatar: string;
  description?: Description[];
};
