import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Product } from '../models/Product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from '../models/Customer';
import { CartItem } from '../models/CartItem';
import { Cart } from '../models/Cart';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';
declare var $: any;
import * as jsPDF from 'jspdf';
import { DialogCartEmptyComponent } from '../dialog-cart-empty/dialog-cart-empty.component';
import { DialogOrderComponent } from '../dialog-order/dialog-order.component';
import { filter } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-store-customer',
  templateUrl: './store-customer.component.html',
  styleUrls: ['./store-customer.component.css']
})
export class StoreCustomerComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.toDispose.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
  categories: any[] = [{ name: "Meat & Fish" },
  { name: "Vegetables & Fruits" }, { name: "Wine & Drinks" }, { name: "Milk & Eggs" }];

  cities: any[] = [{ name: "Tel Aviv" }, { name: "Haifa" }, { name: "Kiryat Gat" },
  { name: "Petah Tiqva" }, { name: "Rehovot" }, { name: "Lod" }, { name: "Ramat Gan" },
  { name: "Pardes Hannah" }, { name: "Hadera" }];

  categoriesElement: boolean = true;
  searchTerm: string;
  productsArray: Product[] = [];
  cartItemsArray: CartItem[] = [];
  showStoreOrOrder: boolean = true;
  orderObj: FormGroup;
  currentCustomer: Customer;
  userOpenCart: Cart;
  cartItemToAdd: CartItem;
  cartOrderTotalPrice: number = 0;
  creditCardValid: boolean = true;
  dialog: MatDialogRef<DialogCartEmptyComponent>;
  dialogOrder: MatDialogRef<DialogOrderComponent>;
  datesToDisableArray: String[] = [];
  showSpinner: boolean = true;
  toDispose: Subscription[] = [];

  constructor(private myService: StoreService, private router: Router,
    private myDialog: MatDialog, private resolverRouter: ActivatedRoute) {
  }

  ngOnInit() {
    debugger;
    this.myService.isAdminStore = false;
    var data = this.resolverRouter.snapshot.data.resolver;
    if (data.cart) {
      this.myService.currentUserCart.next(data.cart[0]);
    }
    this.myService.currentCustomerInStore.next(data.customer);
    this.getAllProducts();
    this.myService.getAllOrders().subscribe((data) => {
      debugger;
      var array = [];
      for (let i = 0; i < data.length; i++) {
        var x = data[i].shippingDate;
        var y = x.toString().split("T", 9);
        array.push(y[0]);
      }
      var skip;
      for (let i = 0; i < array.length; i++) {
        if (skip == array[i]) {
          i;
        } else {
          var z = this.countInArray(array, array[i]);
          if (z == "no") {
            i;
          } else {
            this.datesToDisableArray.push(z);
            skip = z;
          }
        }
      }
    });
    this.toDispose.push(this.myService.currentUserCart.subscribe((data) => {
      debugger;
      if (data !== undefined && data !== null) {
        if ((data.dateCreated as any) !== "welcome to your first purchase") {
          this.userOpenCart = data;
          this.toDispose.push(this.myService.currentCustomerInStore.subscribe((data) => {
            debugger;
            this.currentCustomer = data;
            this.myService.getCartItems(this.userOpenCart._id).subscribe((data) => {
              debugger;
              if (data.length > 0) {
                this.cartItemsArray = data;
                for (let i = 0; i < this.cartItemsArray.length; i++) {
                  let price = this.cartItemsArray[i].totalPrice;
                  this.cartOrderTotalPrice += price;
                }
                this.orderObj = new FormGroup({
                  customer: new FormControl(this.userOpenCart.customer),
                  cart: new FormControl(this.userOpenCart._id),
                  city: new FormControl('', Validators.required),
                  street: new FormControl('', Validators.required),
                  shippingDate: new FormControl('', Validators.required),
                  paymentDigits: new FormControl('', Validators.required)
                });

              }
            });
          }));
        }
      } else {
        this.myService.currentCustomerInStore.subscribe((data) => {
          debugger;
          this.currentCustomer = data;
          this.myService.createCartForCurrentUser(this.currentCustomer).subscribe((data) => {
            debugger;
            this.userOpenCart = data;
            this.orderObj = new FormGroup({
              customer: new FormControl(this.userOpenCart.customer),
              cart: new FormControl(this.userOpenCart._id),
              city: new FormControl('', Validators.required),
              street: new FormControl('', Validators.required),
              shippingDate: new FormControl('', Validators.required),
              paymentDigits: new FormControl('', Validators.required)
            });
          });
        });
      }
    }));
    this.toDispose.push(this.myService.deleteItem.subscribe((response) => {
      debugger;
      if (response) {
        var removePrice = response.totalPrice;
        this.myService.deleteCartItem(response._id).subscribe((data) => {
          if (data.message == "item deleted") {
            this.myService.getCartItems(this.userOpenCart._id).subscribe((data) => {
              debugger;
              this.cartOrderTotalPrice -= removePrice;
              this.cartItemsArray = data;
            });
          }
        });
        this.myService.deleteItem.next(null);
      }
    }));
    this.toDispose.push(this.myService.addToCartEmitter.subscribe((response) => {
      debugger;
      var obj = { cart: this.userOpenCart._id, item: response };
      this.myService.addItemsToCart(obj).subscribe((data) => {
        debugger;
        this.cartItemToAdd = data;
        this.cartOrderTotalPrice += this.cartItemToAdd.totalPrice;
        this.cartItemsArray.push(this.cartItemToAdd);
      });
    }));
    this.myService.myFilteredProducts.subscribe((data) => {
      this.productsArray = data;
    });
  }

  navigate(event: MatTabChangeEvent) {
    if (event.index == 0) {
      this.getAllProducts();
    }
    if (event.index == 1) {
      this.getAllVeg();
    }
    if (event.index == 2) {
      this.getAllMeat();
    }
    if (event.index == 3) {
      this.getAllDrinks();
    }
  }

  getAllProducts() {
    this.showSpinner = true;
    this.myService.getAllProducts().subscribe((data) => {
      this.showSpinner = false;
      this.categoriesElement = true;
      var milkArray = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].category.categoryName == "Milk & Eggs") {
          milkArray.push(data[i]);
          this.productsArray = milkArray;
        }
      }
    });
  }

  getAllVeg() {
    this.showSpinner = true;
    this.myService.getAllProducts().subscribe((data) => {
      this.showSpinner = false;
      var vegArray = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].category.categoryName == "Vegetables & Fruits") {
          vegArray.push(data[i]);
          this.productsArray = vegArray;
        }
      }
    });
  }

  getAllDrinks() {
    this.showSpinner = true;
    this.myService.getAllProducts().subscribe((data) => {
      this.showSpinner = false;
      var drinksArray = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].category.categoryName == "Wine & Drinks") {
          drinksArray.push(data[i]);
          this.productsArray = drinksArray;
        }
      }
    });
  }

  getAllMeat() {
    this.showSpinner = true;
    this.myService.getAllProducts().subscribe((data) => {
      this.showSpinner = false;
      var meatArray = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].category.categoryName == "Meat & Fish") {
          meatArray.push(data[i]);
          this.productsArray = meatArray;
        }
      }
    });
  }

  searchProduct() {
    if (this.showStoreOrOrder) {
      this.myService.searchProduct(this.searchTerm).subscribe((data) => {
        this.categoriesElement = false;
        this.searchTerm = "";
        this.myService.myFilteredProducts.emit(data);
      });
    }
  }

  openOrderForm() {
    if (this.cartItemsArray.length > 0) {
      this.showStoreOrOrder = false;
      this.myService.showDeleteIcon.emit(false);
    } else {
      this.dialog = this.myDialog.open(DialogCartEmptyComponent);
    }
  }

  backToShop() {
    this.showStoreOrOrder = true;
    this.myService.showDeleteIcon.emit(true);
  }

  minimizeCart() {
    var cartPanel = document.getElementById("cartPanel");
    var productsPanel = document.getElementById("productsPanel");
    cartPanel.removeAttribute("col-sm-4");
    cartPanel.setAttribute("class", "col-sm-2");
    productsPanel.removeAttribute("col-sm-8");
    productsPanel.setAttribute("class", "col-sm-10");
    $(".arrowLeft").css("display", "none");
    $(".arrowRight").css("display", "block");
  }

  normalCart() {
    var cartPanel = document.getElementById("cartPanel");
    var productsPanel = document.getElementById("productsPanel");
    cartPanel.removeAttribute("col-sm-2");
    cartPanel.setAttribute("class", "col-sm-4");
    productsPanel.removeAttribute("col-sm-10");
    productsPanel.setAttribute("class", "col-sm-8");
    $(".arrowLeft").css("display", "block");
    $(".arrowRight").css("display", "none");
  }

  deleteAllItems() {
    this.myService.deleteAllCartItems(this.userOpenCart._id).subscribe((data) => {
      this.cartItemsArray = [];
      this.cartOrderTotalPrice = 0;
    });
  }

  placeOrder() {
    var number = $("#creditCard").val();
    var newNumber = this.splitCreditCard(number);
    this.orderObj.addControl('totalPrice', new FormControl(this.cartOrderTotalPrice));
    this.orderObj.addControl('dateOrdered', new FormControl(new Date()));
    this.orderObj.setControl('paymentDigits', new FormControl(newNumber));
    this.myService.makeOrder(this.orderObj.value).subscribe((data) => {
      if (data.message == "order is successful") {
        this.dialogOrder = this.myDialog.open(DialogOrderComponent);
        this.dialogOrder.afterClosed()
          .pipe(filter(data => data))
          .subscribe(data => {
            if (data == "download") {
              var doc = new jsPDF()
              var text = "";
              text += "Reciept for -  " + this.currentCustomer.name + " " + this.currentCustomer.familyName + "\r\n" + "\r\n";
              for (let i = 0; i < this.cartItemsArray.length; i++) {
                let product = this.cartItemsArray[i].product[0].productName;
                let quantity = this.cartItemsArray[i].quantity;
                let total = this.cartItemsArray[i].totalPrice;
                text += quantity + "  " + product + "  price: " + total + "\r\n" + "\r\n";
              }
              text += "Total price: " + this.cartOrderTotalPrice + "\r\n" + "\r\n";
              text += "Thank you for ordering with us!";
              doc.text(text, 10, 10);
              doc.save(this.currentCustomer.name + " " + this.currentCustomer.familyName + ".pdf");
              this.cartItemsArray = [];
              this.cartOrderTotalPrice = 0;
              this.showStoreOrOrder = true;
              this.myService.createCartForCurrentUser(this.currentCustomer).subscribe((data) => {
                debugger;
                this.userOpenCart = data;
                this.orderObj = new FormGroup({
                  customer: new FormControl(this.userOpenCart.customer),
                  cart: new FormControl(this.userOpenCart._id),
                  city: new FormControl('', Validators.required),
                  street: new FormControl('', Validators.required),
                  shippingDate: new FormControl('', Validators.required),
                  paymentDigits: new FormControl('', Validators.required)
                });
              });
              this.getAllProducts();
            }
            else if (data == "accept") {
              debugger;
              this.cartItemsArray = [];
              this.cartOrderTotalPrice = 0;
              this.showStoreOrOrder = true;
              this.myService.createCartForCurrentUser(this.currentCustomer).subscribe((data) => {
                debugger;
                this.userOpenCart = data;
                this.orderObj = new FormGroup({
                  customer: new FormControl(this.userOpenCart.customer),
                  cart: new FormControl(this.userOpenCart._id),
                  city: new FormControl('', Validators.required),
                  street: new FormControl('', Validators.required),
                  shippingDate: new FormControl('', Validators.required),
                  paymentDigits: new FormControl('', Validators.required)
                });
              });
              this.getAllProducts();
            }
          });
      }
    });
  }

  checkCreditCard() {
    var text = $("#creditCard").val();
    var re1 = '((?:(?:\\d{4}[- ]){3}\\d{4}|\\d{16}))(?![\\d])';
    var p = new RegExp(re1, 'i');
    var m = p.exec(text);
    if (m == null || text.length > 19) {
      document.getElementById("cardError").innerHTML = "credit card invalid";
      this.creditCardValid = false;
    } else {
      document.getElementById("cardError").innerHTML = "";
      this.creditCardValid = true;
    }
  }

  splitCreditCard(number): number {
    var split = number.split("-", 4);
    var newNumber = split[3];
    var result = parseInt(newNumber);
    return result;

  }

  countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i] === what) {
        count++;
      }
    }
    if (count == 3) {
      return what;
    } else {
      return "no";
    }
  }

  openDates() {
    var datesToDisable = this.datesToDisableArray;
    var dateToday = new Date();
    var dateSelected;
    var myOrderObj = this.orderObj;
    $("#datepicker").datepicker({
      dateFormat: "yy-mm-dd",
      minDate: dateToday,
      beforeShowDay: function (date) {
        var string = $.datepicker.formatDate('yy-mm-dd', date);
        return [datesToDisable.indexOf(string) == -1]
      },
      onSelect: function (date, inst) {
        dateSelected = date;
        myOrderObj.setControl('shippingDate', new FormControl(dateSelected));
      }
    });
  }

  onKeyUp() {
    if (this.showStoreOrOrder == false) {
      debugger;
      for (let i = 0; i < this.cartItemsArray.length; i++) {
        if (this.searchTerm.length > 0) {
          if (this.cartItemsArray[i].product[0].productName.includes(this.searchTerm)) {
            $("h5").eq(i).css("color", "yellow");
          } else {
            $("h5").eq(i).css("color", "black");
          }
        } else {
          $("h5").eq(i).css("color", "black");
        }
      }
    }
  }
}
