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
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var StoreService = /** @class */ (function () {
    function StoreService(http) {
        this.http = http;
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        this.currentUserCart = new rxjs_1.BehaviorSubject(null);
        this.currentCustomerInStore = new rxjs_1.BehaviorSubject(null);
        this.myEventEmitter = new core_1.EventEmitter();
        this.myUpdateEventEmitter = new core_1.EventEmitter();
        this.myFilteredProducts = new core_1.EventEmitter();
        this.addToCartEmitter = new core_1.EventEmitter();
        this.deleteItem = new rxjs_1.BehaviorSubject(null);
        this.isAdminStore = false;
        this.showDeleteIcon = new core_1.EventEmitter();
    }
    StoreService.prototype.addProduct = function (product) {
        return this.http.post("http://localhost:3000/products/addProduct", product, this.httpOptions);
    };
    StoreService.prototype.getAllProducts = function () {
        return this.http.get("http://localhost:3000/products/getAllProducts");
    };
    StoreService.prototype.updateProduct = function (product) {
        return this.http.put("http://localhost:3000/products/updateProduct", product, this.httpOptions);
    };
    StoreService.prototype.searchProduct = function (product) {
        return this.http.get("http://localhost:3000/products/getRequestedProducts/" + product);
    };
    StoreService.prototype.getCartItems = function (_id) {
        return this.http.get("http://localhost:3000/carts/getAllCartItems/" + _id);
    };
    StoreService.prototype.createCartForCurrentUser = function (obj) {
        return this.http.post("http://localhost:3000/carts/createCart", obj, this.httpOptions);
    };
    StoreService.prototype.addItemsToCart = function (obj) {
        return this.http.post("http://localhost:3000/carts/addItem", obj, this.httpOptions);
    };
    StoreService.prototype.getOneProduct = function (_id) {
        return this.http.get("http://localhost:3000/products/getOneProduct/" + _id);
    };
    StoreService.prototype.deleteCartItem = function (_id) {
        return this.http.delete("http://localhost:3000/carts/deleteCartItem/" + _id);
    };
    StoreService.prototype.deleteAllCartItems = function (_id) {
        return this.http.delete("http://localhost:3000/carts/deleteAllItems/" + _id);
    };
    StoreService.prototype.makeOrder = function (obj) {
        return this.http.post("http://localhost:3000/orders/createOrder", obj, this.httpOptions);
    };
    StoreService.prototype.getAllOrders = function () {
        return this.http.get("http://localhost:3000/orders/getAllOrders");
    };
    StoreService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], StoreService);
    return StoreService;
}());
exports.StoreService = StoreService;
//# sourceMappingURL=store.service.js.map