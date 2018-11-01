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
var CartItem_1 = require("../models/CartItem");
var store_service_1 = require("../services/store.service");
var SingleCartItemComponent = /** @class */ (function () {
    function SingleCartItemComponent(myService) {
        this.myService = myService;
        this.showOrNot = true;
    }
    SingleCartItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myService.showDeleteIcon.subscribe(function (data) {
            if (data == false) {
                _this.showOrNot = false;
            }
            else {
                _this.showOrNot = true;
            }
        });
    };
    SingleCartItemComponent.prototype.removeProduct = function () {
        this.myService.deleteItem.next(this.singleItem);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", CartItem_1.CartItem)
    ], SingleCartItemComponent.prototype, "singleItem", void 0);
    SingleCartItemComponent = __decorate([
        core_1.Component({
            selector: 'app-single-cart-item',
            templateUrl: './single-cart-item.component.html',
            styleUrls: ['./single-cart-item.component.css']
        }),
        __metadata("design:paramtypes", [store_service_1.StoreService])
    ], SingleCartItemComponent);
    return SingleCartItemComponent;
}());
exports.SingleCartItemComponent = SingleCartItemComponent;
//# sourceMappingURL=single-cart-item.component.js.map