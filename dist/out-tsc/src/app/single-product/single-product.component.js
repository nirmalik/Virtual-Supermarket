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
var Product_1 = require("../models/Product");
var store_service_1 = require("../services/store.service");
var SingleProductComponent = /** @class */ (function () {
    function SingleProductComponent(myService) {
        this.myService = myService;
        this.store = false;
    }
    SingleProductComponent.prototype.ngOnInit = function () {
        if (this.myService.isAdminStore == true) {
            this.store = true;
        }
    };
    SingleProductComponent.prototype.addToCartOrUpdate = function () {
        if (this.store == true) {
            this.myService.myUpdateEventEmitter.emit(this.oneProduct);
        }
        else {
            debugger;
            var value = prompt("How many would you like to purchase?");
            if (value !== null) {
                var num = parseInt(value);
                var obj = {
                    _id: this.oneProduct._id, productName: this.oneProduct.productName,
                    productPrice: this.oneProduct.productPrice, productImage: this.oneProduct.productImage,
                    category: this.oneProduct.category, quantity: num
                };
                this.myService.addToCartEmitter.emit(obj);
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Product_1.Product)
    ], SingleProductComponent.prototype, "oneProduct", void 0);
    SingleProductComponent = __decorate([
        core_1.Component({
            selector: 'app-single-product',
            templateUrl: './single-product.component.html',
            styleUrls: ['./single-product.component.css']
        }),
        __metadata("design:paramtypes", [store_service_1.StoreService])
    ], SingleProductComponent);
    return SingleProductComponent;
}());
exports.SingleProductComponent = SingleProductComponent;
//# sourceMappingURL=single-product.component.js.map