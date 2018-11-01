import { Customer } from "./Customer";
import { Cart } from "./Cart";

export class Order {
    _id: string;
    customer: Customer;
    cart: Cart;
    totalPrice: number;
    city:string;
    street:string;
    shippingDate:Date;
    dateOrdered:Date;
    paymentDigits:number;
}