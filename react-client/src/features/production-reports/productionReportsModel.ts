export type RawMaterial = {
  id: string;
  name: string;
  price: number;
  measure: string;
};

export type UsedMaterial = {
  id: string;
  rawMaterial: RawMaterial;
  quantity: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  measure: string;
};

export type Responsible = {
  id: string;
  name: string;
  jobTitle: string;
  phone: string;
};

export type ProductionReport = {
  id: string;
  date: string;
  quantity: number;
  product: Product;
  responsible: Responsible;
  materials: UsedMaterial[];
};
