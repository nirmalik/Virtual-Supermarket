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
var usercontrol_service_1 = require("../services/usercontrol.service");
var router_1 = require("@angular/router");
var store_service_1 = require("../services/store.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(myService, router, storeService) {
        this.myService = myService;
        this.router = router;
        this.storeService = storeService;
        this.noOpenCart = true;
        this.cartTotalPrice = 0;
        this.resumeOrStart = "Please login to start shopping !";
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.storeService.getAllProducts().subscribe(function (data) {
            _this.allProducts = data.length;
        });
        this.storeService.getAllOrders().subscribe(function (data) {
            _this.allOrders = data.length;
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.myService.login(this.username, this.password).subscribe(function (data) {
            if (data.message === "Sorry but no such user exists") {
                document.getElementById("loginError").innerText = "Sorry but U have Wrong Username Or Password!";
            }
            else {
                debugger;
                _this.myService.isLoggedIn = true;
                _this.currentUser = data.customer;
                _this.storeService.currentCustomerInStore.next(_this.currentUser);
                if (data.customer.role == "admin") {
                    _this.router.navigate(["storeAdmin"]);
                }
                else {
                    if (!data.order) {
                        if (data.cart.dateCreated !== "Welcome To Your First Purchase") {
                            _this.currentCart = data.cart;
                            _this.noOpenCart = false;
                            _this.cartDateCreated = data.cart.dateCreated;
                            _this.currentCartMsg = "Welcome  " + data.customer.name + ",  You have an open cart from:  ";
                            _this.resumeOrStart = "Resume Shopping";
                            _this.storeService.getCartItems(_this.currentCart._id).subscribe(function (data) {
                                for (var i = 0; i < data.length; i++) {
                                    _this.cartTotalPrice += data[i].totalPrice;
                                }
                            });
                        }
                        else {
                            _this.currentCartMsg = data.cart.dateCreated;
                            _this.resumeOrStart = "Hello, Pls Start Shopping";
                        }
                    }
                    else {
                        _this.currentCartMsg = "Welcome   " + data.customer.name + ", Your last purchase was at  " + data.order.dateOrdered;
                        _this.resumeOrStart = "Pls Start shopping";
                    }
                }
                document.getElementsByClassName("formDiv")[0].innerHTML =
                    "<h1> successfully logged in, Now you can start shopping !";
            }
        });
    };
    LoginComponent.prototype.goToStore = function () {
        this.router.navigate(["storeCustomer"]);
        //  this.storeService.currentCustomerInStore.next(this.currentUser);
        this.storeService.currentUserCart.next(this.currentCart);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [usercontrol_service_1.UsercontrolService, router_1.Router, store_service_1.StoreService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map