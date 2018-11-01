"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var login_component_1 = require("./login/login.component");
var animations_1 = require("@angular/platform-browser/animations");
var button_1 = require("@angular/material/button");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var router_1 = require("@angular/router");
var MyRoutes_1 = require("./models/MyRoutes");
var http_1 = require("@angular/common/http");
var register_component_1 = require("./register/register.component");
var select_1 = require("@angular/material/select");
var forms_1 = require("@angular/forms");
var store_admin_component_1 = require("./store-admin/store-admin.component");
var store_customer_component_1 = require("./store-customer/store-customer.component");
var single_product_component_1 = require("./single-product/single-product.component");
var stepper_1 = require("@angular/material/stepper");
var date_pipe_1 = require("./date.pipe");
var single_cart_item_component_1 = require("./single-cart-item/single-cart-item.component");
var errpage_component_1 = require("./errpage/errpage.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                store_admin_component_1.StoreAdminComponent,
                store_customer_component_1.StoreCustomerComponent,
                single_product_component_1.SingleProductComponent,
                date_pipe_1.DatePipe,
                single_cart_item_component_1.SingleCartItemComponent,
                errpage_component_1.ErrpageComponent
            ],
            imports: [
                platform_browser_1.BrowserModule, animations_1.BrowserAnimationsModule, button_1.MatButtonModule, form_field_1.MatFormFieldModule, input_1.MatInputModule,
                select_1.MatSelectModule, router_1.RouterModule.forRoot(MyRoutes_1.MyRoutes.Routes), http_1.HttpClientModule,
                forms_1.ReactiveFormsModule, forms_1.FormsModule, stepper_1.MatStepperModule
            ],
            providers: [date_pipe_1.DatePipe],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map