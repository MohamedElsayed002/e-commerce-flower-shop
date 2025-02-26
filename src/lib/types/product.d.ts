declare type Product = {
  title: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  discount: number;
  sold: number;
  rating?: number;
  id: string;
} & DatabaseFields;
