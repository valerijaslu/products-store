export interface Product {
  id: string;
  name: string;
  count: number;
  price: string;
  category: string;
  description: string;
  url?: UrlType;
}

export type UrlType = string | null | ArrayBuffer | undefined;
