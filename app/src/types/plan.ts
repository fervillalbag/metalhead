export type PlanInfo = {
  id?: string;
  title: string;
  createdAt: string;
};

export type Item = {
  id: string;
  text: string;
  status: boolean;
};

export type PlanItem = {
  id?: string;
  slug: string;
  status: boolean;
  name: string;
  price: number;
  url: string;
  items?: Item[];
  createdAt?: string;
};
