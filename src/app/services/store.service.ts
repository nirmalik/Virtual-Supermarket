import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';
import { Customer } from '../models/Customer';
import { Cart } from '../models/Cart';
import { CartItem } from '../models/CartItem';
import { Order } from '../models/Order';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  currentUserCart: BehaviorSubject<Cart> = new BehaviorSubject(null);
  currentCustomerInStore: BehaviorSubject<Customer> = new BehaviorSubject(null);
  myEventEmitter: EventEmitter<Object> = new EventEmitter();
  myUpdateEventEmitter: EventEmitter<Product> = new EventEmitter();
  myFilteredProducts: EventEmitter<Product[]> = new EventEmitter();
  addToCartEmitter: EventEmitter<Product> = new EventEmitter();
  deleteItem: BehaviorSubject<CartItem> = new BehaviorSubject(null);
  isAdminStore: boolean = false;
  showDeleteIcon: EventEmitter<Boolean> = new EventEmitter();
  quantityEmitter: BehaviorSubject<number> = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

  addProduct(product): Observable<Product> {
    return <Observable<Product>>this.http.post("http://localhost:3000/products/addProduct", product, this.httpOptions);
  }

  getAllProducts(): Observable<Product[]> {
    return <Observable<Product[]>>this.http.get("http://localhost:3000/products/getAllProducts");
  }

  updateProduct(product): Observable<Product> {
    return <Observable<Product>>this.http.put("http://localhost:3000/products/updateProduct", product, this.httpOptions);
  }

  searchProduct(product): Observable<Product[]> {
    return <Observable<Product[]>>this.http.get("http://localhost:3000/products/getRequestedProducts/" + product);
  }

  getCartItems(_id): Observable<CartItem[]> {
    return <Observable<CartItem[]>>this.http.get("http://localhost:3000/carts/getAllCartItems/" + _id);
  }

  createCartForCurrentUser(obj): Observable<Cart> {
    return <Observable<Cart>>this.http.post("http://localhost:3000/carts/createCart", obj, this.httpOptions);
  }

  addItemsToCart(obj): Observable<CartItem> {
    return <Observable<CartItem>>this.http.post("http://localhost:3000/carts/addItem", obj, this.httpOptions);
  }

  getOneProduct(_id): Observable<Product> {
    return <Observable<Product>>this.http.get("http://localhost:3000/products/getOneProduct/" + _id);
  }

  deleteCartItem(_id): Observable<any> {
    return this.http.delete("http://localhost:3000/carts/deleteCartItem/" + _id);
  }

  deleteAllCartItems(_id): Observable<any> {
    return this.http.delete("http://localhost:3000/carts/deleteAllItems/" + _id);
  }

  makeOrder(obj): Observable<any> {
    return this.http.post("http://localhost:3000/orders/createOrder", obj, this.httpOptions);
  }

  getAllOrders(): Observable<Order[]> {
    return <Observable<Order[]>>this.http.get("http://localhost:3000/orders/getAllOrders");
  }

  getSession(): Observable<any> {
    return this.http.get("users/session");
  }

  getUserDetails(user): Observable<any> {
    return this.http.post("users/getUserDetails", { data: user }, this.httpOptions);
  }






}
