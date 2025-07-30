export type ProductRequestDto = {
  name: string;
  product_category_id: number;
  disclaimer: string;
  price: number;
  discount: number;
  description: string;
  image_url: string;
  realm_id: number;
  language: string;
  tax: string;
  return_tax: string;
  credit_points_value: number;
  credit_points_enabled: boolean;
  packages: string[];
};
