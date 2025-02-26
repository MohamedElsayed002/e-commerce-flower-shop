declare type Category = {
  name: string;
  slug: string;
  image: string;
  productsCount: number;
} & DatabaseFields;
