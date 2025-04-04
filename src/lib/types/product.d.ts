declare type Product = {
  title: string;
  description: string;
  imgCover: string;
  slug: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  discount: number;
  sold: number;
  rateAvg?: number;
  id: string;
} & DatabaseFields;


declare type  ProductSuccess = {
  message : 'success',
  metadata: Metadata,
  products: Product[]
}

declare type ProductError = {
  message: 'success',
  metadata: Metadata,
  products: []
}

declare type  ProductResponse = ProductSuccess | ProductError