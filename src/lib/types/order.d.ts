declare type CartItem = {
  _id: string;
  product: {
    _id: string;
    title: string;
    price: number;
    priceAfterDiscount: number;
    discount?: number;
    imgCover: string;
  };
  quantity: number;
};

declare type Cart = {
  _id: string;
  user: string;
  cartItems: CartItem[];
  totalPrice: number;
  totalPriceAfterDiscount: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

declare type ShippingAddress = {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
};

declare type FormValues = {
  name: string;
  number: string;
  expiry: string;
  ccv: string;
};

declare type Order = {
  user: string;
  orderItems: [{ product: Product; price: string; quantity: string; _id: string }];
  totalPrice: string;
  paymentType: string;
  isPaid: boolean;
  isDelivered: boolean;
  totalPriceAfterDiscount: string;
  state: string;
  createdAt: string;
  orderNumber: string;
} & DatabaseFields;
