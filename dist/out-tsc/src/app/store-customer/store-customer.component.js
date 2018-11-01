"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_service_1 = require("../services/store.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var $ = require("node_modules/jquery/dist/jquery.min");
var jsPDF = require("jspdf");
var StoreCustomerComponent = /** @class */ (function () {
    function StoreCustomerComponent(myService, router) {
        this.myService = myService;
        this.router = router;
        this.categories = [{ name: "Meat & Fish" },
            { name: "Vegetables & Fruits" }, { name: "Drinks & Wine" }, { name: "Milk & Eggs" }];
            this.cities = [{ name: "Tel Aviv" }, { name: "Beer Shave" }, { name: "Kiryat Gat" },
            { name: "Petah Tiqva" }, { name: "Nativot" }, { name: "Lod" }, { name: "Ramat Gan" },
            { name: "Ramla" }, { name: "Herzliya" }];
        this.categoriesElement = true;
        this.productsArray = [];
        this.cartItemsArray = [];
        this.showStoreOrOrder = true;
        this.cartOrderTotalPrice = 0;
        this.orderIsOk = false;
        this.creditCardValid = true;
    }
    StoreCustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getAllProducts();
        this.myService.currentUserCart.subscribe(function (data) {
            debugger;
            if (data !== undefined) {
                if (data.dateCreated !== "Hello and Welcome to your first purchase") {
                    _this.userOpenCart = data;
                    _this.myService.getCartItems(_this.userOpenCart._id).subscribe(function (data) {
                        debugger;
                        if (data.length > 0) {
                            _this.cartItemsArray = data;
                            for (var i = 0; i < _this.cartItemsArray.length; i++) {
                                var price = _this.cartItemsArray[i].totalPrice;
                                _this.cartOrderTotalPrice += price;
                            }
                            _this.orderObj = new forms_1.FormGroup({
                                customer: new forms_1.FormControl(_this.userOpenCart.customer),
                                cart: new forms_1.FormControl(_this.userOpenCart._id),
                                city: new forms_1.FormControl('', forms_1.Validators.required),
                                street: new forms_1.FormControl('', forms_1.Validators.required),
                                shippingDate: new forms_1.FormControl('', forms_1.Validators.required),
                                paymentDigits: new forms_1.FormControl('', forms_1.Validators.required)
                            });
                        }
                    });
                }
            }
            else {
                _this.myService.currentCustomerInStore.subscribe(function (data) {
                    debugger;
                    _this.currentCustomer = data;
                    _this.myService.createCartForCurrentUser(_this.currentCustomer).subscribe(function (data) {
                        debugger;
                        _this.userOpenCart = data;
                        _this.orderObj = new forms_1.FormGroup({
                            customer: new forms_1.FormControl(_this.userOpenCart.customer),
                            cart: new forms_1.FormControl(_this.userOpenCart._id),
                            city: new forms_1.FormControl('', forms_1.Validators.required),
                            street: new forms_1.FormControl('', forms_1.Validators.required),
                            shippingDate: new forms_1.FormControl('', forms_1.Validators.required),
                            paymentDigits: new forms_1.FormControl('', forms_1.Validators.required)
                        });
                    });
                });
            }
        });
        this.myService.deleteItem.subscribe(function (data) {
            if (data) {
                _this.myService.deleteCartItem(data._id).subscribe(function (data) {
                    if (data.message == "Item Deleted") {
                        _this.myService.getCartItems(_this.userOpenCart._id).subscribe(function (data) {
                            _this.cartItemsArray = data;
                        });
                    }
                });
            }
        });
        this.myService.addToCartEmitter.subscribe(function (data) {
            debugger;
            var obj = { cart: _this.userOpenCart._id, item: data };
            _this.myService.addItemsToCart(obj).subscribe(function (data) {
                debugger;
                _this.cartItemToAdd = data;
                _this.cartOrderTotalPrice += _this.cartItemToAdd.totalPrice;
                _this.cartItemsArray.push(_this.cartItemToAdd);
            });
        });
        this.myService.myFilteredProducts.subscribe(function (data) {
            _this.productsArray = data;
        });
    };
    StoreCustomerComponent.prototype.getAllProducts = function () {
        var _this = this;
        this.myService.getAllProducts().subscribe(function (data) {
            _this.categoriesElement = true;
            var milkArray = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].category.categoryName == "Milk & Eggs") {
                    milkArray.push(data[i]);
                    _this.productsArray = milkArray;
                }
            }
        });
    };
    StoreCustomerComponent.prototype.getAllVeg = function () {
        var _this = this;
        this.myService.getAllProducts().subscribe(function (data) {
            var vegArray = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].category.categoryName == "Vegetables & Fruits") {
                    vegArray.push(data[i]);
                    _this.productsArray = vegArray;
                }
            }
        });
    };
    StoreCustomerComponent.prototype.getAllDrinks = function () {
        var _this = this;
        this.myService.getAllProducts().subscribe(function (data) {
            var drinksArray = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].category.categoryName == "Drinks & Wine") {
                    drinksArray.push(data[i]);
                    _this.productsArray = drinksArray;
                }
            }
        });
    };
    StoreCustomerComponent.prototype.getAllMeat = function () {
        var _this = this;
        this.myService.getAllProducts().subscribe(function (data) {
            var meatArray = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].category.categoryName == "Meat & Fish") {
                    meatArray.push(data[i]);
                    _this.productsArray = meatArray;
                }
            }
        });
    };
    StoreCustomerComponent.prototype.searchProduct = function () {
        var _this = this;
        if (this.showStoreOrOrder) {
            this.myService.searchProduct(this.searchTerm).subscribe(function (data) {
                _this.categoriesElement = false;
                _this.searchTerm = "";
                _this.myService.myFilteredProducts.emit(data);
            });
        }
    };
    StoreCustomerComponent.prototype.openOrderForm = function () {
        if (this.cartItemsArray.length > 0) {
            this.showStoreOrOrder = false;
            this.myService.showDeleteIcon.emit(false);
        }
        else {
            alert("you have an empty cart!");
        }
    };
    StoreCustomerComponent.prototype.backToShop = function () {
        this.showStoreOrOrder = true;
        this.myService.showDeleteIcon.emit(true);
    };
    StoreCustomerComponent.prototype.minimizeCart = function () {
        var cartPanel = document.getElementById("cartPanel");
        var productsPanel = document.getElementById("productsPanel");
        cartPanel.removeAttribute("col-sm-4");
        cartPanel.setAttribute("class", "col-sm-2");
        productsPanel.removeAttribute("col-sm-8");
        productsPanel.setAttribute("class", "col-sm-10");
    };
    StoreCustomerComponent.prototype.normalCart = function () {
        var cartPanel = document.getElementById("cartPanel");
        var productsPanel = document.getElementById("productsPanel");
        cartPanel.removeAttribute("col-sm-2");
        cartPanel.setAttribute("class", "col-sm-4");
        productsPanel.removeAttribute("col-sm-10");
        productsPanel.setAttribute("class", "col-sm-8");
    };
    StoreCustomerComponent.prototype.deleteAllItems = function () {
        var _this = this;
        this.myService.deleteAllCartItems(this.userOpenCart._id).subscribe(function (data) {
            _this.cartItemsArray = [];
            _this.cartOrderTotalPrice = 0;
        });
    };
    StoreCustomerComponent.prototype.placeOrder = function () {
        var _this = this;
        debugger;
        this.orderObj.addControl('totalPrice', new forms_1.FormControl(this.cartOrderTotalPrice));
        this.orderObj.addControl('dateOrdered', new forms_1.FormControl(new Date()));
        this.myService.makeOrder(this.orderObj.value).subscribe(function (data) {
            if (data.message == "order is successful") {
                _this.orderIsOk = true;
            }
            else {
                alert(" Sorrt But Something Was wrong with your order");
            }
        });
    };
    StoreCustomerComponent.prototype.downloadReciept = function () {
        var doc = new jsPDF();
        var text = "";
        for (var i = 0; i < this.cartItemsArray.length; i++) {
            var product = this.cartItemsArray[i].product[0].productName;
            var quantity = this.cartItemsArray[i].quantity;
            text += quantity + "  " + product + "\r\n";
        }
        text += "The Total price Is: " + this.cartOrderTotalPrice;
        doc.text(text, 10, 10);
        doc.save('a4.pdf');
    };
    StoreCustomerComponent.prototype.goToStore = function () {
        location.reload();
    };
    StoreCustomerComponent.prototype.checkCreditCard = function () {
        debugger;
        var text = $("#creditCard").val();
        var re1 = '((?:(?:\\d{4}[- ]){3}\\d{4}|\\d{16}))(?![\\d])'; // Credit Card Number 1
        var p = new RegExp(re1, 'i');
        var m = p.exec(text);
        if (m == null || text.length > 19) {
            document.getElementById("cardError").innerHTML = "Credit Card invalid";
            this.creditCardValid = false;
        }
        else {
            document.getElementById("cardError").innerHTML = "";
            this.creditCardValid = true;
        }
    };
    StoreCustomerComponent = __decorate([
        core_1.Component({
            selector: 'app-store-customer',
            templateUrl: './store-customer.component.html',
            styleUrls: ['./store-customer.component.css']
        }),
        __metadata("design:paramtypes", [store_service_1.StoreService, router_1.Router])
    ], StoreCustomerComponent);
    return StoreCustomerComponent;
}());
exports.StoreCustomerComponent = StoreCustomerComponent;
//# sourceMappingURL=store-customer.component.js.map