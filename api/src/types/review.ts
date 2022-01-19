import { Description } from "./description";

export type ReviewInfo = {
  id: string;
  title: string;
  description: Description[];
  createdAt: string;
};

export type ReviewHome = {
  id: string;
  name: string;
  avatar: string;
  description: Description[];
};
