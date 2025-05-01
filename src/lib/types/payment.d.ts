declare type Cart = {
  user: string;
  cartItems: {
    product: {
      _id: string;
      title: string;
      price: number;
      priceAfterDiscount: number;
      discount?: number;
      imgCover: string;
    };
    quantity: number;
    _id: string;
  }[];
  quantity: number;
  totalPrice: number;
  totalPriceAfterDiscount: number;
  discount: number;
  __v: number;
} & DatabaseFields;

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

// payment form
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
