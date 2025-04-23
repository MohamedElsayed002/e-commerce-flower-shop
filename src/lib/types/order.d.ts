declare type Product = {
  _id: string;
  title: string;
  price: number;
  imgCover: string;
};

declare type OrderItem = {
  quantity: number;
  price: number;
  _id: string;
} & { product: Product };

declare type Order = {
  _id: string;
  totalPrice: number;
  paymentType: string;
  createdAt: string;
} & { orderItems: OrderItem[] };
