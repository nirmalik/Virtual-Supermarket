import { Component, OnInit } from '@angular/core';
import { UsercontrolService } from '../services/usercontrol.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../models/Customer';
import { StoreService } from '../services/store.service';
import { Cart } from '../models/Cart';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  currentUser: Customer;
  allProducts: number;
  allOrders: number;
  currentCartMsg: any;
  currentCart: Cart;
  cartDateCreated: string;
  noOpenCart: boolean = true;
  blabla: boolean;
  cartTotalPrice: number = 0
  resumeOrStart: string = "Please login to start shopping";

  constructor(
    private myService: UsercontrolService,
    private router: Router,
    private storeService: StoreService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let data = this.route.snapshot.data.resolver;
    if (!this.route.snapshot.data.resolver.error) {
      this.myService.isLoggedIn = true;
      this.currentUser = data.customer;
      this.storeService.currentCustomerInStore.next(this.currentUser);
      if (data.customer.role == "admin") {
        this.router.navigate(["storeAdmin"]);
      } else {
        if (!data.order) {
          if (data.cart.dateCreated !== "welcome to your first purchase") {
            this.currentCart = data.cart[0];
            this.noOpenCart = false;
            this.cartDateCreated = data.cart[0].dateCreated;
            this.currentCartMsg = "Welcome  " + data.customer.name + ",  you have an open cart from  ";
            this.resumeOrStart = "Resume shopping";
            this.storeService.getCartItems(this.currentCart._id).subscribe((data) => {
              debugger;
              for (let i = 0; i < data.length; i++) {
                this.cartTotalPrice += data[i].totalPrice;
              }
            });
          } else {
            debugger;
            this.blabla = false;
            this.cartDateCreated = data.cart.dateCreated;
            this.resumeOrStart = "Start shopping";
          }
        } else {
          this.blabla = true;
          this.currentCartMsg = data.order.dateOrdered;
          this.resumeOrStart = "Start shopping";
        }
      }
      document.getElementsByClassName("formDiv")[0].innerHTML =
        "<h1>You are successfully logged in, you can start shopping now!";
    } else {
      this.blabla = false;
    }
    this.storeService.getAllProducts().subscribe((data) => {
      this.allProducts = data.length;
    });
    this.storeService.getAllOrders().subscribe((data) => {
      this.allOrders = data.length;
    });
  }

  login() {
    debugger;
    this.myService.login(this.username, this.password).subscribe((data) => {
      debugger;
      if (data.message === "no user found") {
        document.getElementById("loginError").innerText = "wrong username/password!";
      } else {
        this.myService.isLoggedIn = true;
        this.currentUser = data.customer;
        this.storeService.currentCustomerInStore.next(this.currentUser);
        if (data.customer.role == "admin") {
          this.router.navigate(["storeAdmin"]);

        } else {
          if (!data.order) {
            if (data.cart.dateCreated !== "welcome to your first purchase") {
              this.currentCart = data.cart[0];
              this.noOpenCart = false;
              this.cartDateCreated = data.cart[0].dateCreated;
              this.currentCartMsg = "Welcome  " + data.customer.name + ",  you have an open cart from  ";
              this.resumeOrStart = "Resume shopping";
              debugger;
              this.storeService.getCartItems(this.currentCart._id).subscribe((data) => {
                for (let i = 0; i < data.length; i++) {
                  this.cartTotalPrice += data[i].totalPrice;
                }
              });
            } else {
              this.cartDateCreated = data.cart.dateCreated;
              this.resumeOrStart = "Start shopping";
            }
          } else {
            this.blabla = true;
            this.currentCartMsg = "Welcome   " + data.customer.name + ", your last purchase was at  " + data.order.dateOrdered;
            this.resumeOrStart = "Start shopping";
          }
        }
        document.getElementsByClassName("formDiv")[0].innerHTML =
          "<h1>You are successfully logged in, you can start shopping now!";
      }
    });
  }
  goToStore() {
    this.router.navigate(["storeCustomer"]);
    //  this.storeService.currentUserCart.next(this.currentCart);
  }

}
