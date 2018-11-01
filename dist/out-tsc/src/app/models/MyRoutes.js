"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_component_1 = require("../login/login.component");
var register_component_1 = require("../register/register.component");
var canactivate_guard_1 = require("../guards/canactivate.guard");
var store_admin_component_1 = require("../store-admin/store-admin.component");
var store_customer_component_1 = require("../store-customer/store-customer.component");
var errpage_component_1 = require("../errpage/errpage.component");
var admin_store_guard_1 = require("../guards/admin-store.guard");
// when im done put router guards!!! //
var MyRoutes = /** @class */ (function () {
    function MyRoutes() {
    }
    MyRoutes.Routes = [
        { path: "", redirectTo: "login", pathMatch: "full" },
        { path: "login", component: login_component_1.LoginComponent },
        { path: "register", component: register_component_1.RegisterComponent },
        { path: "storeAdmin", component: store_admin_component_1.StoreAdminComponent, canActivate: [admin_store_guard_1.AdminStoreGuard] },
        { path: "storeCustomer", component: store_customer_component_1.StoreCustomerComponent, canActivate: [canactivate_guard_1.CanactivateGuard] },
        { path: "**", redirectTo: "err" },
        { path: "err", component: errpage_component_1.ErrpageComponent }
    ];
    return MyRoutes;
}());
exports.MyRoutes = MyRoutes;
//# sourceMappingURL=MyRoutes.js.map