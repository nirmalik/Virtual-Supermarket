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
var usercontrol_service_1 = require("../services/usercontrol.service");
var AdminStoreGuard = /** @class */ (function () {
    function AdminStoreGuard(myService, userService, router) {
        this.myService = myService;
        this.userService = userService;
        this.router = router;
        this.isUserAdmin = false;
    }
    AdminStoreGuard.prototype.canActivate = function () {
        var _this = this;
        debugger;
        var isUserLoggedIn = this.userService.isLoggedIn;
        this.myService.currentCustomerInStore.subscribe(function (data) {
            debugger;
            if (isUserLoggedIn) {
                if (data.name == "admin") {
                    return true;
                }
                else {
                    _this.router.navigate(["storeCustomer"]);
                }
            }
            else {
                _this.router.navigate(["login"]);
            }
        });
    };
    AdminStoreGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [store_service_1.StoreService, usercontrol_service_1.UsercontrolService, router_1.Router])
    ], AdminStoreGuard);
    return AdminStoreGuard;
}());
exports.AdminStoreGuard = AdminStoreGuard;
//# sourceMappingURL=admin-store.guard.js.map