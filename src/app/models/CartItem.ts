import { Product } from "./Product";
import { Cart } from "./Cart";

export class CartItem {
    _id: string;
    product: Product;
    quantity: number;
    totalPrice: number;
    cart: Cart;
}