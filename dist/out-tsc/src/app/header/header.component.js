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
var router_1 = require("@angular/router");
var store_service_1 = require("../services/store.service");
var HeaderComponent = /** @class */ (function () {
    // currentCustomer: Customer;
    function HeaderComponent(router, myService) {
        this.router = router;
        this.myService = myService;
        this.currentUserName = "Guest";
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myService.currentCustomerInStore.subscribe(function (data) {
            if (data) {
                _this.currentUserName = data.name;
            }
            // this.currentCustomer = data;
        });
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, store_service_1.StoreService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map