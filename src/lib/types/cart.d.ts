declare type CartItem = {
  _id: string;
  product: Product[];
  price: number;
  quantity: number;
};

declare type Cart = {
  user: string;
  cartItems: CartItem[];
  discount: number;
  totalPrice: number;
  totalPriceAfterDiscount: number;
  __v: number;
} & DatabaseFields;

declare type CartResponse = {
  message: string;
  numOfCartItems: number;
  cart: Cart;
};

declare type CartFields = {
  product: string;
  quantity: number;
};
