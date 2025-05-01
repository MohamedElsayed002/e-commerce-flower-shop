declare type Order = {
  user: string;
  orderItems: [{ product: Product; price: string; quantity: string; _id: string }];
  totalPrice: string;
  paymentType: string;
  isPaid: boolean;
  isDelivered: boolean;
  state: string;
  createdAt: string;
  orderNumber: string;
} & DatabaseFields;
